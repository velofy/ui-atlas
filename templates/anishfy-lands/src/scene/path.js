import * as THREE from 'three';
import { CLUSTERS } from '../content.js';
import { clusterCenter, SPACING } from './constellation.js';

// The ordered list of stops on the journey. The HUD and the camera path
// are both built from this.
export function buildSections() {
  const sections = [{ id: 'hero', label: 'anishfyi' }];
  for (const c of CLUSTERS) sections.push({ id: c.id, label: c.label });
  sections.push({ id: 'manifesto', label: 'MANIFESTO' });
  sections.push({ id: 'colophon', label: 'COLOPHON' });
  return sections;
}

// Scroll progress (0..1) is mapped onto a Catmull-Rom spline whose knots
// sit at each section. t = i / (n - 1) lands exactly on section i.
export function createCameraPath() {
  const positions = [new THREE.Vector3(0, 0.9, 15.5)];
  const targets = [new THREE.Vector3(0, 0.1, 0)];

  CLUSTERS.forEach((c, i) => {
    const center = clusterCenter(i);
    const side = i % 2 === 0 ? 1 : -1;
    positions.push(center.clone().add(new THREE.Vector3(side * 2.5, 3.2, 17)));
    targets.push(center.clone().add(new THREE.Vector3(0, 0.4, 0)));
  });

  const quiet = -(CLUSTERS.length + 1) * SPACING;
  positions.push(new THREE.Vector3(0, 1.2, quiet + 16));
  targets.push(new THREE.Vector3(0, 0.5, quiet));
  positions.push(new THREE.Vector3(0, 0.8, quiet - SPACING + 15));
  targets.push(new THREE.Vector3(0, 0.4, quiet - SPACING));

  const posCurve = new THREE.CatmullRomCurve3(positions, false, 'centripetal');
  const tgtCurve = new THREE.CatmullRomCurve3(targets, false, 'centripetal');
  const position = new THREE.Vector3();
  const lookAt = new THREE.Vector3();

  return {
    count: positions.length,
    sample(progress, t, reducedMotion) {
      const p = THREE.MathUtils.clamp(progress, 0, 1);
      posCurve.getPoint(p, position);
      tgtCurve.getPoint(p, lookAt);
      if (!reducedMotion) {
        position.x += Math.sin(t * 0.35) * 0.18;
        position.y += Math.cos(t * 0.27) * 0.12;
      }
      return { position, lookAt };
    },
  };
}
