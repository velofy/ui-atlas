import * as THREE from 'three';
import { SITE } from '../content.js';
import { textPlane, textSprite } from './text.js';

// The hero: the ANISHFYI wordmark floating in fog, a tagline, an accent rule.
export function createHero(scene, { reducedMotion = false } = {}) {
  const group = new THREE.Group();

  const { mesh: mark, width: markWidth } = textPlane(SITE.wordmark, 3.1, {
    family: 'Syne',
    weight: 800,
    size: 128,
    letterSpacing: 6,
    color: '#F3EEE6',
    pad: 40,
    glow: true,
  });
  group.add(mark);

  const rule = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 0.05),
    new THREE.MeshBasicMaterial({ color: SITE.accent, transparent: true })
  );
  rule.position.y = -1.85;
  group.add(rule);

  const { sprite: tag } = textSprite(SITE.tagline, 0.44, {
    weight: 400,
    size: 40,
    letterSpacing: 10,
    color: '#B7B0A3',
  });
  tag.position.y = -2.85;
  group.add(tag);

  scene.add(group);

  return {
    group,
    // Keep the wordmark inside the frame on narrow screens.
    fit(camera) {
      const dist = Math.max(6, Math.abs(camera.position.z - group.position.z));
      const visH = 2 * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const visW = visH * camera.aspect;
      group.scale.setScalar(Math.min(1, (visW * 0.84) / markWidth));
    },
    update(t) {
      if (reducedMotion) return;
      group.position.y = Math.sin(t * 0.4) * 0.22;
      group.rotation.y = Math.sin(t * 0.16) * 0.035;
    },
  };
}
