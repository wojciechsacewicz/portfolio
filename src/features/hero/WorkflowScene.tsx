import { Float, Line, OrbitControls, Text } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { useMemo, useRef, useState } from 'react';
import { Color, type Group, type Mesh } from 'three';

interface WorkflowNodeDefinition {
  readonly label: string;
  readonly position: readonly [number, number, number];
  readonly color: string;
}

const workflowNodes = [
  { label: 'TICKET', position: [-3.4, 1.45, 0], color: '#d9e2ec' },
  { label: 'SCOPE', position: [-2.1, 0.35, 0.15], color: '#7a95b1' },
  { label: 'CODE', position: [-0.65, 1.05, -0.1], color: '#d9e2ec' },
  { label: 'REVIEW', position: [0.8, 0.05, 0.15], color: '#5d7fa3' },
  { label: 'TESTS', position: [2.2, 1, -0.1], color: '#d9e2ec' },
  { label: 'SHIP', position: [3.45, 0, 0.1], color: '#afc0d4' },
] as const satisfies readonly WorkflowNodeDefinition[];

interface WorkflowNodeProps extends WorkflowNodeDefinition {
  readonly index: number;
}

function WorkflowNode({ label, position, color, index }: WorkflowNodeProps) {
  const meshRef = useRef<Mesh>(null);
  const emissiveColor = useMemo(() => new Color(color), [color]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const pulseScale = 1 + Math.sin(clock.elapsedTime * 1.4 + index * 0.8) * 0.055;
    meshRef.current.scale.setScalar(pulseScale);
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.22, 1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.22}
          metalness={0.15}
          emissive={emissiveColor}
          emissiveIntensity={0.2}
        />
      </mesh>
      <Text
        position={[0, -0.48, 0]}
        fontSize={0.18}
        letterSpacing={0.08}
        color="#f4f6ee"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function WorkflowGraph() {
  const graphRef = useRef<Group>(null);
  const linePoints = useMemo(() => workflowNodes.map((node) => node.position), []);

  useFrame(({ pointer }) => {
    if (!graphRef.current) return;

    graphRef.current.rotation.y += (pointer.x * 0.12 - graphRef.current.rotation.y) * 0.035;
    graphRef.current.rotation.x += (-pointer.y * 0.05 - graphRef.current.rotation.x) * 0.035;
  });

  return (
    <group ref={graphRef} position={[0, -0.4, 0]}>
      <Line points={linePoints} color="#7a95b1" lineWidth={1.6} transparent opacity={0.6} />
      {workflowNodes.map((node, index) => (
        <Float
          key={node.label}
          speed={1.5 + index * 0.08}
          rotationIntensity={0.1}
          floatIntensity={0.12}
        >
          <WorkflowNode {...node} index={index} />
        </Float>
      ))}
      <mesh position={[0, 0.5, -0.7]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8.5, 4.7, 18, 10]} />
        <meshBasicMaterial color="#17212c" wireframe transparent opacity={0.28} />
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
      {workflowNodes.map((node, index) => (
        <div className="workflow-fallback-node" key={node.label}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{node.label}</strong>
        </div>
      ))}
    </div>
  );
}

export function WorkflowScene({ reducedMotion }: WorkflowSceneProps) {
  const [hasWebGlContext, setHasWebGlContext] = useState(true);

  return (
    <div
      className="workflow-canvas"
      aria-label="Interactive model of Wojtek's ticket-to-delivery engineering workflow"
    >
      {hasWebGlContext ? (
        <Canvas
          camera={{ position: [0, 1.25, 7.4], fov: 43 }}
          dpr={[1, 1.6]}
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
          <ambientLight intensity={1.3} />
          <directionalLight position={[2, 4, 5]} intensity={3.2} color="#e5edf5" />
          <pointLight position={[-3, 0, 2]} intensity={5} color="#5d7fa3" distance={7} />
          <pointLight position={[3, 1, 1]} intensity={3.5} color="#7a95b1" distance={6} />
          <WorkflowGraph />
          {!reducedMotion ? (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={1.15}
              maxPolarAngle={1.85}
            />
          ) : null}
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={0.6}
              luminanceSmoothing={0.75}
              intensity={0.42}
              mipmapBlur
            />
            <Noise opacity={0.018} />
            <Vignette eskil={false} offset={0.22} darkness={0.58} />
          </EffectComposer>
        </Canvas>
      ) : (
        <WorkflowFallback />
      )}
      <div className="canvas-caption">
        <span>Drag to inspect</span>
        <span>Ticket → verified change</span>
      </div>
    </div>
  );
}
