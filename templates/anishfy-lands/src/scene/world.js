import * as THREE from 'three';

// Fog, lighting, and the slow particle field that gives the journey depth.
export function createWorld(scene, { mobile = false, reducedMotion = false } = {}) {
  scene.background = new THREE.Color('#0E0D0C');
  scene.fog = new THREE.FogExp2('#0E0D0C', 0.024);

  scene.add(new THREE.AmbientLight('#F3EEE6', 0.28));
  const key = new THREE.DirectionalLight('#F3EEE6', 0.55);
  key.position.set(6, 10, 4);
  scene.add(key);
  const fill = new THREE.DirectionalLight('#FF6B35', 0.12);
  fill.position.set(-8, -4, -10);
  scene.add(fill);

  const dust = makeParticles(mobile ? 1100 : 3200, '#8F887A', 0.13, 0.5);
  const embers = makeParticles(mobile ? 60 : 160, '#FF6B35', 0.2, 0.75);
  scene.add(dust, embers);

  return {
    update(t) {
      if (reducedMotion) return;
      dust.rotation.y = t * 0.005;
      dust.position.y = Math.sin(t * 0.05) * 0.6;
      embers.rotation.y = -t * 0.003;
    },
  };
}

function makeParticles(count, color, size, opacity) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 90;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 55;
    positions[i * 3 + 2] = 20 - Math.random() * 260;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color,
    size,
    sizeAttenuation: true,
    transparent: true,
    opacity,
    depthWrite: false,
  });
  return new THREE.Points(geometry, material);
}
