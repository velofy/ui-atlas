// On-brand fallback when WebGL2 is unavailable, in the spirit of igloo.inc.
export function showFallback() {
  document.documentElement.classList.add('no-webgl2');
  const el = document.getElementById('fallback');
  if (el) el.style.display = 'flex';
}
