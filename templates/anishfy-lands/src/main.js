import * as THREE from 'three';
import { gsap } from 'gsap';
import { loadFonts } from './scene/text.js';
import { Stage } from './scene/renderer.js';
import { createWorld } from './scene/world.js';
import { createHero } from './scene/hero.js';
import { createConstellation } from './scene/constellation.js';
import { buildSections, createCameraPath } from './scene/path.js';
import { createHud } from './ui/hud.js';
import { createOverlays } from './ui/overlays.js';
import { showFallback } from './ui/fallback.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

function webgl2Available() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch (err) {
    return false;
  }
}

async function boot() {
  if (!webgl2Available()) {
    showFallback();
    return;
  }

  await loadFonts();

  const canvas = document.getElementById('gl');
  const stage = new Stage(canvas, { mobile, reducedMotion });
  const world = createWorld(stage.scene, { mobile, reducedMotion });
  const hero = createHero(stage.scene, { reducedMotion });
  const constellation = createConstellation(stage.scene, { reducedMotion });
  const sections = buildSections();
  const path = createCameraPath();

  // The page is a tall, empty scroll track; scrolling flies the camera.
  const space = document.getElementById('scroll-space');
  space.style.height = `${sections.length * 160}vh`;

  let target = 0;
  let progress = 0;
  const readScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  };
  window.addEventListener('scroll', readScroll, { passive: true });
  readScroll();

  // Deep link: #N opens the page already scrolled to section N.
  const hashMatch = window.location.hash.match(/^#(\d+)$/);
  if (hashMatch) {
    const i = Math.min(sections.length - 1, Math.max(0, parseInt(hashMatch[1], 10)));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, max * (i / (sections.length - 1)));
    readScroll();
    progress = target;
  }

  const jumpToSection = (i) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: max * (i / (sections.length - 1)),
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const hud = createHud(sections, jumpToSection);
  const overlays = createOverlays(sections);
  hud.setActive(0);

  // Hover and tap picking for the constellation nodes.
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hovered = null;
  let pointerLive = false;

  const setHovered = (node) => {
    if (hovered === node) return;
    if (hovered) hovered.userData.setHover(false);
    hovered = node;
    if (hovered) {
      hovered.userData.setHover(true);
      hud.showTooltip(`${hovered.userData.name}  ·  ${hovered.userData.desc}`);
      document.body.style.cursor = 'pointer';
    } else {
      hud.hideTooltip();
      document.body.style.cursor = '';
    }
  };

  const pick = (clientX, clientY) => {
    pointer.set((clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(pointer, stage.camera);
    const hits = raycaster.intersectObjects(constellation.interactables, false);
    return hits.length ? hits[0].object : null;
  };

  let lastPointerX = window.innerWidth / 2;
  let lastPointerY = window.innerHeight / 2;
  window.addEventListener(
    'pointermove',
    (e) => {
      pointerLive = true;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      hud.moveTooltip(e.clientX, e.clientY);
    },
    { passive: true }
  );

  window.addEventListener('click', (e) => {
    if (e.target !== canvas) return;
    const node = pick(e.clientX, e.clientY);
    if (node) window.open(node.userData.url, '_blank', 'noopener');
  });

  // Intro: the HUD settles in once the first frame is near.
  if (!reducedMotion) {
    gsap.from('#hud-wordmark, #hud-note, #section-label, #ticks', {
      opacity: 0,
      y: 10,
      duration: 1.4,
      stagger: 0.12,
      ease: 'power2.out',
      delay: 0.3,
    });
  }

  const clock = new THREE.Clock();
  let activeSection = -1;

  function frame() {
    const dt = Math.min(clock.getDelta(), 0.1);
    const t = clock.elapsedTime;

    progress += (target - progress) * (reducedMotion ? 1 : Math.min(1, dt * 4.5));

    const { position, lookAt } = path.sample(progress, t, reducedMotion);
    stage.camera.position.copy(position);
    stage.camera.lookAt(lookAt);
    stage.setFocus(position.distanceTo(lookAt));

    world.update(t);
    hero.update(t);
    hero.fit(stage.camera);
    constellation.update(t);

    const sectionIdx = Math.round(progress * (sections.length - 1));
    if (sectionIdx !== activeSection) {
      activeSection = sectionIdx;
      hud.setActive(sectionIdx);
    }
    hud.setProgress(progress);
    overlays.update(progress);

    if (pointerLive) {
      setHovered(pick(lastPointerX, lastPointerY));
    }

    stage.render(dt, t);
    requestAnimationFrame(frame);
  }

  frame();
}

boot().catch((err) => {
  console.error(err);
  showFallback();
});
