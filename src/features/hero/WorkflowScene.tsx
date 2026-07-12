import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  ShaderMaterial,
  type Group,
  type Mesh,
} from 'three';

const particleVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPulse;
  uniform vec2 uPointer;
  attribute float aScale;
  attribute float aPhase;
  varying float vEnergy;

  void main() {
    vec3 p = position;
    float wave = sin(uTime * 0.72 + aPhase + length(p) * 1.8);
    p += normalize(p + 0.001) * wave * (0.08 + uPulse * 0.18);

    vec2 cursor = uPointer * vec2(3.7, 2.5);
    vec2 delta = p.xy - cursor;
    float influence = exp(-dot(delta, delta) * 0.42);
    p.xy += normalize(delta + 0.001) * influence * (0.45 + uPulse * 0.75);
    p.z += influence * (0.6 + uPulse * 0.8);

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = (2.2 + aScale * 4.2 + influence * 5.0) * (7.0 / -mvPosition.z);
    vEnergy = clamp(0.18 + influence + aScale * 0.45 + uPulse * 0.3, 0.0, 1.0);
  }
`;

const particleFragmentShader = /* glsl */ `
  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;
  varying float vEnergy;

  void main() {
    vec2 centered = gl_PointCoord - 0.5;
    float distanceToCenter = length(centered);
    if (distanceToCenter > 0.5) discard;
    float alpha = smoothstep(0.5, 0.08, distanceToCenter);
    vec3 color = mix(uColorLow, uColorHigh, vEnergy);
    gl_FragColor = vec4(color, alpha * (0.42 + vEnergy * 0.58));
  }
`;

function createParticleGeometry(count: number) {
  const geometry = new BufferGeometry();
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const phases = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    const t = index / count;
    const angle = t * Math.PI * 26 + Math.sin(index * 0.31) * 0.8;
    const radius = 0.45 + Math.pow(t, 0.68) * 3.4 + Math.sin(index * 1.7) * 0.18;
    const vertical = Math.sin(angle * 0.58) * (0.5 + t * 1.25);

    positions[index * 3] = Math.cos(angle) * radius;
    positions[index * 3 + 1] = vertical + Math.sin(index * 0.13) * 0.22;
    positions[index * 3 + 2] = Math.sin(angle) * radius * 0.48 + Math.cos(index * 0.27) * 0.35;
    scales[index] = 0.2 + ((index * 37) % 100) / 100;
    phases[index] = angle + index * 0.07;
  }

  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('aScale', new BufferAttribute(scales, 1));
  geometry.setAttribute('aPhase', new BufferAttribute(phases, 1));
  return geometry;
}

function MagneticField({ reducedMotion }: { readonly reducedMotion: boolean }) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const pulseRef = useRef(0);
  const geometry = useMemo(() => createParticleGeometry(1200), []);
  const material = useMemo(() => new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPulse: { value: 0 },
      uPointer: { value: { x: 0, y: 0 } },
      uColorLow: { value: new Color('#3d5874') },
      uColorHigh: { value: new Color('#d7e8f8') },
    },
  }), []);

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  useFrame(({ clock, pointer }) => {
    if (reducedMotion) return;
    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uPointer.value.x += (pointer.x - material.uniforms.uPointer.value.x) * 0.08;
    material.uniforms.uPointer.value.y += (pointer.y - material.uniforms.uPointer.value.y) * 0.08;
    pulseRef.current *= 0.94;
    material.uniforms.uPulse.value = pulseRef.current;

    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.035 + pointer.x * 0.08;
      groupRef.current.rotation.x += (-pointer.y * 0.06 - groupRef.current.rotation.x) * 0.035;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = clock.elapsedTime * 0.22;
      coreRef.current.rotation.y = clock.elapsedTime * 0.3;
      coreRef.current.scale.setScalar(1 + pulseRef.current * 0.28);
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={(event) => {
        event.stopPropagation();
        pulseRef.current = 1;
      }}
    >
      <points geometry={geometry} material={material} />
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.62, 3]} />
        <meshStandardMaterial
          color="#89a9c8"
          emissive="#3d5874"
          emissiveIntensity={1.5}
          roughness={0.22}
          metalness={0.72}
          wireframe
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[1.08, 0.012, 8, 128]} />
        <meshBasicMaterial color="#afc0d4" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

interface WorkflowSceneProps {
  readonly reducedMotion: boolean;
}

function WorkflowFallback() {
  return (
    <div className="workflow-fallback" aria-hidden="true">
      <div className="fallback-orbit"><span /></div>
      <div className="fallback-core" />
    </div>
  );
}

export function WorkflowScene({ reducedMotion }: WorkflowSceneProps) {
  const [hasWebGlContext, setHasWebGlContext] = useState(true);

  return (
    <div
      className="workflow-canvas"
      aria-label="Interactive magnetic particle field. Move the pointer to disturb it and click to send a pulse."
    >
      {hasWebGlContext ? (
        <Canvas
          camera={{ position: [0, 0, 6.8], fov: 48 }}
          dpr={[1, 1.55]}
          frameloop={reducedMotion ? 'demand' : 'always'}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          fallback={<WorkflowFallback />}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', (event) => {
              event.preventDefault();
              setHasWebGlContext(false);
            }, { once: true });
          }}
        >
          <ambientLight intensity={0.8} />
          <pointLight position={[2.2, 2.8, 3]} intensity={9} color="#afc0d4" distance={8} />
          <pointLight position={[-3, -1, 2]} intensity={7} color="#3d5874" distance={8} />
          <MagneticField reducedMotion={reducedMotion} />
          <EffectComposer multisampling={0}>
            <Bloom luminanceThreshold={0.32} luminanceSmoothing={0.75} intensity={0.85} mipmapBlur />
            <Noise opacity={0.014} />
            <Vignette eskil={false} offset={0.18} darkness={0.66} />
          </EffectComposer>
        </Canvas>
      ) : <WorkflowFallback />}
      <div className="canvas-caption">
        <span>Move cursor · click to pulse</span>
        <span>Magnetic field / live</span>
      </div>
    </div>
  );
}
