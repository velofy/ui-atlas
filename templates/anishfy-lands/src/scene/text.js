import * as THREE from 'three';

const FACES = [
  { file: 'IBMPlexMono-Regular.woff2', weight: '400', family: 'IBM Plex Mono' },
  { file: 'IBMPlexMono-Medium.woff2', weight: '500', family: 'IBM Plex Mono' },
  { file: 'IBMPlexMono-SemiBold.woff2', weight: '600', family: 'IBM Plex Mono' },
  // Display face for the hero wordmark, from the classy-fonts cabinet (OFL).
  { file: 'syne-v24-latin-700.woff2', weight: '700', family: 'Syne' },
  { file: 'syne-v24-latin-800.woff2', weight: '800', family: 'Syne' },
];

// Load the self-hosted woff2 files so canvas textures render in the real faces.
// Falls back to generic monospace if loading fails or takes too long.
export async function loadFonts() {
  const load = FACES.map(async ({ file, weight, family }) => {
    const face = new FontFace(
      family,
      `url('./assets/fonts/${file}') format('woff2')`,
      { weight }
    );
    const loaded = await face.load();
    document.fonts.add(loaded);
  });
  try {
    await Promise.race([
      Promise.all(load),
      new Promise((_, reject) => setTimeout(reject, 4000)),
    ]);
  } catch (err) {
    // Graceful degrade: canvas text will use the monospace fallback.
  }
}

// Render text to a canvas and return a THREE texture plus its aspect ratio.
export function textTexture(text, opts = {}) {
  const {
    weight = 600,
    size = 64,
    color = '#F3EEE6',
    letterSpacing = 0,
    pad = 24,
    scale = 2,
    family = 'IBM Plex Mono',
    glow = false,
  } = opts;
  const font = `${weight} ${size}px "${family}", ui-monospace, monospace`;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = font;

  const chars = [...text];
  const widths = chars.map((ch) => ctx.measureText(ch).width);
  const textW = widths.reduce((a, b) => a + b, 0) + letterSpacing * Math.max(0, chars.length - 1);
  const metrics = ctx.measureText(text);
  const textH =
    (metrics.actualBoundingBoxAscent || size * 0.78) +
    (metrics.actualBoundingBoxDescent || size * 0.24);

  canvas.width = Math.max(2, Math.ceil((textW + pad * 2) * scale));
  canvas.height = Math.max(2, Math.ceil((textH + pad * 2) * scale));

  ctx.scale(scale, scale);
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = 'top';
  if (glow) {
    ctx.shadowColor = 'rgba(255, 107, 53, 0.82)';
    ctx.shadowBlur = size * 0.24;
  }
  let x = pad;
  for (const ch of chars) {
    ctx.fillText(ch, x, pad);
    x += ctx.measureText(ch).width + letterSpacing;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return { texture, aspect: canvas.width / canvas.height };
}

// A camera-facing sprite with crisp text, worldHeight units tall.
export function textSprite(text, worldHeight, opts = {}) {
  const { texture, aspect } = textTexture(text, opts);
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(worldHeight * aspect, worldHeight, 1);
  return { sprite, width: worldHeight * aspect };
}

// A flat plane with crisp text, worldHeight units tall.
export function textPlane(text, worldHeight, opts = {}) {
  const { texture, aspect } = textTexture(text, opts);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(worldHeight * aspect, worldHeight),
    material
  );
  return { mesh, width: worldHeight * aspect };
}
