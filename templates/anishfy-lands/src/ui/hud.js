// The minimal HUD: section label bottom-left, progress ticks on the right,
// the scroll hint, and the node tooltip that follows the cursor.
export function createHud(sections, onJump) {
  const labelEl = document.getElementById('section-label');
  const ticksEl = document.getElementById('ticks');
  const hintEl = document.getElementById('scroll-hint');
  const tooltipEl = document.getElementById('tooltip');

  const ticks = sections.map((section, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tick';
    button.setAttribute('aria-label', section.label);
    button.addEventListener('click', () => onJump(i));
    ticksEl.appendChild(button);
    return button;
  });

  let hintHidden = false;

  return {
    setActive(i) {
      labelEl.textContent = `${String(i + 1).padStart(2, '0')} / ${sections[i].label}`;
      ticks.forEach((tick, j) => tick.classList.toggle('is-active', j === i));
    },
    setProgress(p) {
      if (!hintHidden && p > 0.004) {
        hintHidden = true;
        hintEl.classList.add('is-hidden');
      }
    },
    showTooltip(text) {
      tooltipEl.textContent = text;
      tooltipEl.classList.add('is-visible');
    },
    moveTooltip(x, y) {
      tooltipEl.style.transform = `translate(${x + 16}px, ${y + 14}px)`;
    },
    hideTooltip() {
      tooltipEl.classList.remove('is-visible');
    },
  };
}
