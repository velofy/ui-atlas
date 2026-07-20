import * as THREE from 'three';
import { gsap } from 'gsap';
import { CLUSTERS, SITE } from '../content.js';
import { textSprite } from './text.js';

export const SPACING = 34;

// Clusters lie along the descent, alternating sides for a meandering path.
export function clusterCenter(i) {
  return new THREE.Vector3((i % 2 === 0 ? -1 : 1) * 5, 0, -(i + 1) * SPACING);
}

const SHAPES = ['icosa', 'cube', 'octa', 'tetra'];

function shapeGeometry(kind, s) {
  switch (kind) {
    case 'cube':
      return new THREE.BoxGeometry(s, s, s);
    case 'octa':
      return new THREE.OctahedronGeometry(s * 0.95);
    case 'tetra':
      return new THREE.TetrahedronGeometry(s * 1.05);
    default:
      return new THREE.IcosahedronGeometry(s * 0.9, 0);
  }
}

// The signature section: every project as a glowing low-poly node,
// grouped into clusters the camera visits one by one.
export function createConstellation(scene, { reducedMotion = false } = {}) {
  const root = new THREE.Group();
  const interactables = [];
  const nodes = [];
  const ivory = new THREE.Color('#F3EEE6');
  const accent = new THREE.Color(SITE.accent);

  CLUSTERS.forEach((cluster, ci) => {
    const cg = new THREE.Group();
    cg.position.copy(clusterCenter(ci));
    root.add(cg);

    const { sprite: label } = textSprite(cluster.label, 0.55, {
      weight: 500,
      size: 44,
      letterSpacing: 18,
      color: '#9A927F',
    });
    label.position.set(0, 6.6, 0);
    cg.add(label);

    const n = cluster.projects.length;
    const radius = 3.1 + n * 0.55;

    cluster.projects.forEach((project, pi) => {
      // Fibonacci sphere layout, flattened a little on Y, so nodes never overlap.
      const k = pi + 0.5;
      const phi = Math.acos(1 - (2 * k) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;
      const pos = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi) * 0.7,
        Math.sin(phi) * Math.sin(theta)
      ).multiplyScalar(radius);

      const g = new THREE.Group();
      g.position.copy(pos);
      cg.add(g);

      const isKey = pi === 0;
      const material = new THREE.MeshStandardMaterial({
        color: '#171512',
        emissive: isKey ? accent : ivory,
        emissiveIntensity: isKey ? 0.9 : 0.42,
        metalness: 0.3,
        roughness: 0.38,
        flatShading: true,
      });
      const mesh = new THREE.Mesh(shapeGeometry(SHAPES[pi % SHAPES.length], 0.66), material);
      g.add(mesh);

      const { sprite: nameSprite } = textSprite(project.name, 0.36, {
        weight: 500,
        size: 42,
        letterSpacing: 5,
        color: '#F3EEE6',
      });
      nameSprite.position.y = 1.1;
      g.add(nameSprite);

      mesh.userData = {
        name: project.name,
        desc: project.desc,
        url: SITE.repoBase + project.repo,
        baseIntensity: material.emissiveIntensity,
        setHover(on) {
          gsap.to(material, {
            emissiveIntensity: on ? 2.4 : mesh.userData.baseIntensity,
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          gsap.to(g.scale, {
            x: on ? 1.28 : 1,
            y: on ? 1.28 : 1,
            z: on ? 1.28 : 1,
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        },
      };

      interactables.push(mesh);
      nodes.push({ g, mesh, baseY: pos.y, seed: ci * 10 + pi });
    });
  });

  scene.add(root);

  return {
    interactables,
    update(t) {
      for (const { g, mesh, baseY, seed } of nodes) {
        if (reducedMotion) continue;
        mesh.rotation.x = t * 0.22 + seed;
        mesh.rotation.y = t * 0.16 + seed * 0.7;
        g.position.y = baseY + Math.sin(t * 0.55 + seed * 1.3) * 0.16;
      }
    },
  };
}
