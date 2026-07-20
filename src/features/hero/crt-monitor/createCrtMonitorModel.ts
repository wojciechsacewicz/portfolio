import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { CRT_MONITOR_SPEC } from './crtMonitorSpec';

export interface CrtMonitorModel {
  root: THREE.Group;
  screen: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  screenLight: THREE.PointLight;
}

interface RoundedBoxOptions {
  name: string;
  size: readonly [number, number, number];
  position: readonly [number, number, number];
  material: THREE.Material;
  radius?: number;
  segments?: number;
}

function createRoundedBox({
  name,
  size,
  position,
  material,
  radius = 0.16,
  segments = 5,
}: RoundedBoxOptions) {
  const geometry = new RoundedBoxGeometry(size[0], size[1], size[2], segments, radius);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.position.set(...position);
  return mesh;
}

function createCurvedScreenGeometry(width: number, height: number) {
  const geometry = new THREE.PlaneGeometry(width, height, 48, 32);
  const positions = geometry.attributes.position;

  for (let index = 0; index < positions.count; index += 1) {
    const x = positions.getX(index) / (width * 0.5);
    const y = positions.getY(index) / (height * 0.5);
    const radius = Math.min(1, x * x + y * y);
    positions.setZ(index, 0.12 * (1 - radius));
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

function createBadgeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 96;
  const context = canvas.getContext('2d');

  if (!context) {
    return null;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'rgba(10, 13, 16, 0.92)';
  context.font = '500 45px "JetBrains Mono", monospace';
  context.fillText('SACEWICZ', 12, 63);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

function addSideVents(root: THREE.Group, material: THREE.Material) {
  const geometry = new THREE.BoxGeometry(0.05, 0.075, 1.08);
  const vents = new THREE.InstancedMesh(geometry, material, 12);
  vents.name = 'right-side-vent-array';
  const matrix = new THREE.Matrix4();

  for (let index = 0; index < 12; index += 1) {
    matrix.makeTranslation(2.89, 1.46 - index * 0.17, -1.28);
    vents.setMatrixAt(index, matrix);
  }

  vents.instanceMatrix.needsUpdate = true;
  root.add(vents);
}

function addFrontGrille(root: THREE.Group, material: THREE.Material) {
  const geometry = new THREE.BoxGeometry(0.09, 0.08, 0.055);
  const grille = new THREE.InstancedMesh(geometry, material, 25);
  grille.name = 'lower-front-grille';
  const matrix = new THREE.Matrix4();
  const rotation = new THREE.Matrix4().makeRotationZ(-0.14);

  for (let index = 0; index < 25; index += 1) {
    const x = -2.18 + index * 0.158;
    matrix.makeTranslation(x, -1.42, 1.42);
    matrix.multiply(rotation);
    grille.setMatrixAt(index, matrix);
  }

  grille.instanceMatrix.needsUpdate = true;
  root.add(grille);
}

export function createCrtMonitorModel(screenTexture: THREE.CanvasTexture): CrtMonitorModel {
  const root = new THREE.Group();
  root.name = 'portfolio-crt-monitor';

  screenTexture.colorSpace = THREE.SRGBColorSpace;
  screenTexture.minFilter = THREE.LinearFilter;
  screenTexture.magFilter = THREE.LinearFilter;
  screenTexture.generateMipmaps = false;

  const shellMaterial = new THREE.MeshStandardMaterial({
    ...CRT_MONITOR_SPEC.materials.shell,
  });
  const trimMaterial = new THREE.MeshStandardMaterial({
    ...CRT_MONITOR_SPEC.materials.trim,
  });
  const bezelMaterial = new THREE.MeshStandardMaterial({
    ...CRT_MONITOR_SPEC.materials.bezel,
  });
  const darkPlasticMaterial = new THREE.MeshStandardMaterial({
    ...CRT_MONITOR_SPEC.materials.darkPlastic,
  });
  const recessMaterial = new THREE.MeshStandardMaterial({
    color: 0x090d11,
    roughness: 0.82,
    metalness: 0.02,
  });

  const frontBody = createRoundedBox({
    name: 'main-shell',
    size: [5.8, 4.55, 3.7],
    position: [0, 0.45, -0.7],
    material: shellMaterial,
    radius: 0.3,
    segments: 8,
  });
  root.add(frontBody);

  const rearBody = createRoundedBox({
    name: 'rear-shell',
    size: [4.72, 3.68, 1.18],
    position: [0, 0.56, -2.86],
    material: darkPlasticMaterial,
    radius: 0.24,
    segments: 7,
  });
  root.add(rearBody);

  const frontPanel = createRoundedBox({
    name: 'front-panel',
    size: [5.42, 4.04, 0.3],
    position: [0, 0.53, 1.18],
    material: trimMaterial,
    radius: 0.24,
    segments: 8,
  });
  root.add(frontPanel);

  const screenTrim = createRoundedBox({
    name: 'screen-trim',
    size: [4.94, 3.63, 0.2],
    position: [0, 0.76, 1.35],
    material: shellMaterial,
    radius: 0.28,
    segments: 8,
  });
  root.add(screenTrim);

  const bezel = createRoundedBox({
    name: 'screen-bezel',
    size: [4.6, 3.29, 0.18],
    position: [0, 0.78, 1.47],
    material: bezelMaterial,
    radius: 0.32,
    segments: 9,
  });
  root.add(bezel);

  const screenMaterial = new THREE.MeshBasicMaterial({
    map: screenTexture,
    color: 0xffffff,
    toneMapped: false,
  });
  const screen = new THREE.Mesh(createCurvedScreenGeometry(4.2, 2.88), screenMaterial);
  screen.name = 'phosphor-screen';
  screen.position.set(0, 0.81, 1.59);
  root.add(screen);

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xaed8e9,
    transparent: true,
    opacity: 0.08,
    roughness: 0.1,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.07,
    depthWrite: false,
  });
  const glass = new THREE.Mesh(createCurvedScreenGeometry(4.22, 2.9), glassMaterial);
  glass.name = 'screen-glass';
  glass.position.set(0, 0.81, 1.61);
  root.add(glass);

  const powerKnobMaterial = new THREE.MeshStandardMaterial({
    color: 0x353a3f,
    roughness: 0.42,
    metalness: 0.28,
  });
  const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.14, 40), powerKnobMaterial);
  knob.name = 'power-knob';
  knob.rotation.x = Math.PI / 2;
  knob.position.set(1.95, -1.35, 1.43);
  root.add(knob);

  const knobRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.225, 0.025, 12, 48),
    recessMaterial,
  );
  knobRing.name = 'power-knob-ring';
  knobRing.position.set(1.95, -1.35, 1.515);
  root.add(knobRing);

  const ledMaterial = new THREE.MeshBasicMaterial({ color: 0xa2f34d, toneMapped: false });
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.045, 20, 12), ledMaterial);
  led.name = 'status-led';
  led.position.set(1.43, -1.36, 1.5);
  root.add(led);

  addSideVents(root, recessMaterial);
  addFrontGrille(root, recessMaterial);

  const badgeTexture = createBadgeTexture();
  if (badgeTexture) {
    const badgeMaterial = new THREE.MeshBasicMaterial({
      map: badgeTexture,
      transparent: true,
      opacity: 0.78,
      toneMapped: false,
    });
    const badge = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.17), badgeMaterial);
    badge.name = 'front-badge';
    badge.position.set(-1.87, -1.35, 1.49);
    root.add(badge);
  }

  const neck = createRoundedBox({
    name: 'pedestal-neck',
    size: [1.9, 0.42, 1.5],
    position: [0, -1.9, -0.12],
    material: darkPlasticMaterial,
    radius: 0.16,
  });
  neck.rotation.x = -0.08;
  root.add(neck);

  const base = createRoundedBox({
    name: 'pedestal-base',
    size: [4.25, 0.34, 2.45],
    position: [0, -2.22, -0.18],
    material: darkPlasticMaterial,
    radius: 0.18,
    segments: 6,
  });
  root.add(base);

  const baseInset = createRoundedBox({
    name: 'pedestal-base-inset',
    size: [3.75, 0.18, 2.05],
    position: [0, -2.38, -0.17],
    material: recessMaterial,
    radius: 0.12,
  });
  root.add(baseInset);

  const screenLight = new THREE.PointLight(0x86d9ff, 12, 7, 2.2);
  screenLight.name = 'screen-spill-light';
  screenLight.position.set(0, 0.72, 2.15);
  root.add(screenLight);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(3.2, 64),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
    }),
  );
  shadow.name = 'contact-shadow';
  shadow.rotation.x = -Math.PI / 2;
  shadow.scale.y = 0.42;
  shadow.position.set(0.2, -2.56, -0.25);
  root.add(shadow);

  root.userData.sculptRuntime = {
    nodes: {
      root: root.name,
      body: frontBody.name,
      screen: screen.name,
      powerControl: knob.name,
      pedestal: base.name,
    },
    sockets: {
      screenCenter: [0, 0.81, 1.59],
      powerControl: [1.95, -1.35, 1.43],
      pedestalPivot: [0, -1.9, -0.12],
    },
    colliders: [
      { type: 'box', size: [5.8, 4.55, 4.2], center: [0, 0.45, -0.9] },
      { type: 'box', size: [4.25, 0.5, 2.45], center: [0, -2.2, -0.18] },
    ],
    detailInventory: CRT_MONITOR_SPEC.detailInventory,
  };

  return { root, screen, screenLight };
}
