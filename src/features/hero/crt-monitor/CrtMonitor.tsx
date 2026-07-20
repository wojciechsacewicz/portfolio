import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createCrtMonitorModel } from './createCrtMonitorModel';
import { CRT_PROJECTS } from './crtMonitorSpec';
import './crt-monitor.css';

const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;
const BASE_ROTATION = { x: -0.055, y: -0.34, z: -0.015 } as const;

function drawScreen(
  context: CanvasRenderingContext2D,
  elapsedSeconds: number,
  reducedMotion: boolean,
) {
  const width = context.canvas.width;
  const height = context.canvas.height;
  const frame = Math.floor(elapsedSeconds * 30);

  context.clearRect(0, 0, width, height);

  const background = context.createRadialGradient(
    width * 0.46,
    height * 0.42,
    40,
    width * 0.5,
    height * 0.5,
    width * 0.72,
  );
  background.addColorStop(0, '#102c3c');
  background.addColorStop(0.48, '#071923');
  background.addColorStop(1, '#02080d');
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  const rowHeight = 152;
  const cycleHeight = rowHeight * CRT_PROJECTS.length;
  const scrollOffset = reducedMotion ? 0 : (elapsedSeconds * 27) % cycleHeight;
  const baseY = 146;

  context.textAlign = 'center';
  context.textBaseline = 'middle';

  for (let repeat = -1; repeat <= 2; repeat += 1) {
    CRT_PROJECTS.forEach((project, projectIndex) => {
      const y = baseY + projectIndex * rowHeight + repeat * cycleHeight - scrollOffset;

      if (y < -rowHeight || y > height + rowHeight) {
        return;
      }

      const centerDistance = Math.abs(y - height * 0.5);
      const focus = Math.max(0, 1 - centerDistance / (height * 0.6));
      const textSize = 52 + focus * 9;
      const textAlpha = 0.48 + focus * 0.52;

      context.strokeStyle = `rgba(120, 214, 255, ${0.12 + focus * 0.14})`;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(112, y + rowHeight * 0.48);
      context.lineTo(width - 112, y + rowHeight * 0.48);
      context.stroke();

      context.save();
      context.globalAlpha = textAlpha;
      context.shadowColor = '#77d9ff';
      context.shadowBlur = 12 + focus * 18;
      context.fillStyle = '#d7f4ff';
      context.font = `500 ${textSize}px "JetBrains Mono", "Courier New", monospace`;
      context.fillText(project, width * 0.5, y);
      context.restore();
    });
  }

  context.fillStyle = 'rgba(155, 227, 255, 0.65)';
  context.beginPath();
  context.moveTo(width * 0.5, 44);
  context.lineTo(width * 0.5 - 13, 61);
  context.lineTo(width * 0.5 + 13, 61);
  context.closePath();
  context.fill();

  context.beginPath();
  context.moveTo(width * 0.5, height - 44);
  context.lineTo(width * 0.5 - 13, height - 61);
  context.lineTo(width * 0.5 + 13, height - 61);
  context.closePath();
  context.fill();

  const scanPosition = reducedMotion ? height * 0.35 : (elapsedSeconds * 105) % height;
  const scanGlow = context.createLinearGradient(0, scanPosition - 36, 0, scanPosition + 36);
  scanGlow.addColorStop(0, 'rgba(122, 218, 255, 0)');
  scanGlow.addColorStop(0.5, 'rgba(122, 218, 255, 0.075)');
  scanGlow.addColorStop(1, 'rgba(122, 218, 255, 0)');
  context.fillStyle = scanGlow;
  context.fillRect(0, scanPosition - 36, width, 72);

  context.fillStyle = 'rgba(0, 0, 0, 0.19)';
  for (let y = 0; y < height; y += 4) {
    context.fillRect(0, y, width, 1);
  }

  context.fillStyle = 'rgba(156, 226, 255, 0.07)';
  for (let index = 0; index < 90; index += 1) {
    const x = (index * 83 + frame * 19) % width;
    const y = (index * 47 + frame * 11) % height;
    context.fillRect(x, y, 1 + (index % 2), 1);
  }

  const vignette = context.createRadialGradient(
    width * 0.5,
    height * 0.5,
    height * 0.2,
    width * 0.5,
    height * 0.5,
    width * 0.66,
  );
  vignette.addColorStop(0.62, 'rgba(0, 0, 0, 0)');
  vignette.addColorStop(1, 'rgba(0, 0, 0, 0.68)');
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}

function disposeScene(root: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();

  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) {
      return;
    }

    geometries.add(object.geometry);
    const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];

    objectMaterials.forEach((material) => {
      materials.add(material);
      Object.values(material).forEach((value) => {
        if (value instanceof THREE.Texture) {
          textures.add(value);
        }
      });
    });
  });

  textures.forEach((texture) => texture.dispose());
  materials.forEach((material) => material.dispose());
  geometries.forEach((geometry) => geometry.dispose());
}

export function CrtMonitor() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = SCREEN_WIDTH;
    screenCanvas.height = SCREEN_HEIGHT;
    const screenContext = screenCanvas.getContext('2d');

    if (!screenContext) {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(7.9, 4.25, 10.8);
    camera.lookAt(0, -0.15, -0.65);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      screenTexture.dispose();
      return undefined;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.domElement.className = 'crt-monitor__canvas';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    mount.prepend(renderer.domElement);

    const model = createCrtMonitorModel(screenTexture);
    model.root.scale.setScalar(0.84);
    model.root.position.set(0.05, 0.2, 0);
    model.root.rotation.set(BASE_ROTATION.x, BASE_ROTATION.y, BASE_ROTATION.z);
    scene.add(model.root);

    const hemisphere = new THREE.HemisphereLight(0xbddfff, 0x05070a, 2.3);
    scene.add(hemisphere);

    const keyLight = new THREE.DirectionalLight(0xffe8d7, 4.1);
    keyLight.position.set(-5.5, 7.5, 8.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x709ed1, 3.1);
    rimLight.position.set(6, 2.5, -5);
    scene.add(rimLight);

    const pointer = new THREE.Vector2(0, 0);
    const smoothedPointer = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();
    let frameId = 0;
    let lastScreenUpdate = -1;
    let isIntersecting = true;
    let isDocumentVisible = !document.hidden;
    let hasRendered = false;

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotionQuery.matches) {
        return;
      }

      const bounds = mount.getBoundingClientRect();
      pointer.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
      );
    };

    const resetPointer = () => pointer.set(0, 0);
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      if (isDocumentVisible) {
        clock.getDelta();
      }
    };

    mount.addEventListener('pointermove', handlePointerMove, { passive: true });
    mount.addEventListener('pointerleave', resetPointer);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry?.isIntersecting ?? true;
      },
      { rootMargin: '160px' },
    );
    intersectionObserver.observe(mount);

    const render = () => {
      frameId = window.requestAnimationFrame(render);

      if (!isIntersecting || !isDocumentVisible) {
        return;
      }

      const elapsed = clock.getElapsedTime();
      const reducedMotion = reducedMotionQuery.matches;

      if (elapsed - lastScreenUpdate > 1 / 30) {
        drawScreen(screenContext, elapsed, reducedMotion);
        screenTexture.needsUpdate = true;
        model.screenLight.intensity = reducedMotion ? 13.5 : 13.5 + Math.sin(elapsed * 17) * 0.45;
        lastScreenUpdate = elapsed;
      }

      smoothedPointer.lerp(pointer, reducedMotion ? 1 : 0.055);
      const idleYaw = reducedMotion ? 0 : Math.sin(elapsed * 0.42) * 0.025;
      const idlePitch = reducedMotion ? 0 : Math.sin(elapsed * 0.31) * 0.012;
      const floatOffset = reducedMotion ? 0 : Math.sin(elapsed * 0.72) * 0.035;

      model.root.rotation.x = THREE.MathUtils.lerp(
        model.root.rotation.x,
        BASE_ROTATION.x - smoothedPointer.y * 0.11 + idlePitch,
        0.065,
      );
      model.root.rotation.y = THREE.MathUtils.lerp(
        model.root.rotation.y,
        BASE_ROTATION.y + smoothedPointer.x * 0.19 + idleYaw,
        0.065,
      );
      model.root.rotation.z = THREE.MathUtils.lerp(
        model.root.rotation.z,
        BASE_ROTATION.z - smoothedPointer.x * 0.012,
        0.065,
      );
      model.root.position.x = 0.05 + smoothedPointer.x * 0.11;
      model.root.position.y = 0.2 + floatOffset - smoothedPointer.y * 0.06;

      renderer.render(scene, camera);

      if (!hasRendered) {
        hasRendered = true;
        setIsReady(true);
      }
    };

    resize();
    drawScreen(screenContext, 0, reducedMotionQuery.matches);
    screenTexture.needsUpdate = true;
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      mount.removeEventListener('pointermove', handlePointerMove);
      mount.removeEventListener('pointerleave', resetPointer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      disposeScene(model.root);
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="crt-monitor"
      data-ready={isReady ? 'true' : 'false'}
      role="img"
      aria-label="Interactive three-dimensional CRT monitor showing Veldia, llmpolska, Mumink Tattoo and Dovista Automation"
    >
      <div className="crt-monitor__fallback" aria-hidden={isReady}>
        <span>Selected projects</span>
        <ul>
          {CRT_PROJECTS.map((project) => <li key={project}>{project}</li>)}
        </ul>
      </div>
      <span className="crt-monitor__hint" aria-hidden="true">Move cursor to inspect</span>
    </div>
  );
}
