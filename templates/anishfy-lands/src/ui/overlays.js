import { MANIFESTO, COLOPHON } from '../content.js';

// The quiet beats: manifesto and colophon are DOM overlays that fade in
// when the camera reaches their stop, keeping links crisp and clickable.
export function createOverlays(sections) {
  const step = 1 / (sections.length - 1);
  const manifestoEl = document.getElementById('overlay-manifesto');
  const colophonEl = document.getElementById('overlay-colophon');
  const manifestoIdx = sections.findIndex((s) => s.id === 'manifesto');
  const colophonIdx = sections.findIndex((s) => s.id === 'colophon');

  const linesEl = manifestoEl.querySelector('.manifesto-lines');
  for (const line of MANIFESTO.lines) {
    const p = document.createElement('p');
    p.textContent = line;
    linesEl.appendChild(p);
  }
  manifestoEl.querySelector('.manifesto-foot').textContent = MANIFESTO.footnote;

  const colophonLinesEl = colophonEl.querySelector('.colophon-lines');
  for (const line of COLOPHON.lines) {
    const p = document.createElement('p');
    p.textContent = line;
    colophonLinesEl.appendChild(p);
  }

  const linksEl = colophonEl.querySelector('.colophon-links');
  if (COLOPHON.cta) {
    const a = document.createElement('a');
    a.href = COLOPHON.cta.url;
    a.textContent = COLOPHON.cta.label;
    a.target = '_blank';
    a.rel = 'noopener';
    linksEl.appendChild(a);
  }

  function opacityFor(idx, progress) {
    const center = idx * step;
    const raw = 1 - Math.abs(progress - center) / (step * 0.62);
    const o = Math.min(1, Math.max(0, raw));
    return o * o * (3 - 2 * o);
  }

  function apply(el, opacity, interactive) {
    el.style.opacity = opacity.toFixed(3);
    const visible = opacity > 0.02;
    el.style.visibility = visible ? 'visible' : 'hidden';
    el.setAttribute('aria-hidden', visible ? 'false' : 'true');
    if (interactive) {
      el.classList.toggle('is-live', opacity > 0.5);
    }
  }

  return {
    update(progress) {
      apply(manifestoEl, opacityFor(manifestoIdx, progress), false);
      apply(colophonEl, opacityFor(colophonIdx, progress), true);
    },
  };
}
