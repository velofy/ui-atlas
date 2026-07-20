# anishfy-lands

A cinematic WebGL landing page for anishfyi, in the spirit of abeto.co and igloo.inc: a scroll-driven realtime 3D experience, not a document site.

This file is the build spec. Implement the site described here, completely.

## Hard constraints (deployment)

- **No build step.** Plain static files: `index.html` + `src/*.js` ES modules + `assets/`. It will be served by GitHub Pages straight from the repo.
- **Subpath-safe.** The site lives at `https://anishfyi.github.io/anishfy-lands/`. Every asset/script reference MUST be relative (`./src/main.js`, `./assets/...`). Never absolute-from-root.
- **Libraries via CDN import map**, pinned versions, jsdelivr: `three` (0.16x), `three/addons/` (mapped to `https://cdn.jsdelivr.net/npm/three@<ver>/examples/jsm/`), `gsap`. No npm, no bundler, no node_modules.
- Works on WebGL2; show a styled, on-brand fallback message (like igloo.inc's) when WebGL2 is unavailable.
- No em-dashes (U+2014) anywhere. No telemetry, no external fonts (self-host woff2 under `assets/fonts/`, OFL only, e.g. IBM Plex Mono).

## Look and feel

Reference: igloo.inc and abeto.co. Dark, cinematic, precise.

- Palette: near-black background (`#0E0D0C` family), warm ivory text (`#F3EEE6`), one accent (pick a restrained signal color, e.g. ember orange or ice blue) used sparingly.
- Type: IBM Plex Mono for UI/labels; big display wordmarks may use a self-hosted display face (OFL) or carefully styled mono.
- Post: EffectComposer with subtle bloom + gentle depth of field; film grain or vignette optional. Restraint over noise: everything should feel expensive.
- Fog + a slow particle field for depth. Adaptive DPR (drop resolution under load, restore when idle). Respect `prefers-reduced-motion`.
- Sound: none. Keep it silent.

## Experience (scroll-driven journey)

Fixed full-viewport canvas; scroll drives the camera along a path through scenes. A minimal HUD: small wordmark top-left, scroll hint, progress tick marks, section label bottom-left in mono.

1. **Hero** — `ANISHFYI` as large 3D or SDF text floating in fog with drifting particles; tagline: "builder of small, sharp tools". Scroll hint: "Scroll to descend".
2. **The constellation** — the signature section: his projects as a navigable field of glowing 3D nodes (icosahedra, cubes, low-poly artifacts), grouped into clusters the camera visits in order:
   - **CLI / terminal**: glep (indexed grep+glob), curl_reap (web scraping library), kestrel (multi-agent fan-out), terbium (document parser), querion (NL data analyst), trove (Claude Code skill), numera
   - **Android**: BLOKD (ad blocker), Aperture VPN
   - **macOS**: vaulty (screen lock), pawse (break reminder), warden (token monitor)
   - **Web**: classy-fonts (324-typeface specimen), backend-almanac, dehaux
   Each node shows its name in crisp text (canvas/SDF texture or troika-three-text via CDN); on hover/approach it brightens and shows a one-line description; clicking opens the GitHub repo (`https://github.com/anishfyi/<name>`) in a new tab.
3. **Manifesto** — a quiet beat: a few short lines on a clean background plane: "Small tools. Sharp edges. Shipped." plus "Everything above is real and on GitHub."
4. **Colophon / contact** — links: github.com/anishfyi, anishfyi.github.io, x.com/anishfyi (verify handle from anishfyi.github.io if reachable, else omit). Colophon line: "Built with three.js. No frameworks were harmed."

Mobile: touch drag = scroll; clusters simplified (fewer nodes or lower DPR). Keep 60fps on a recent iPhone.

## Quality bar

- Runs by opening `index.html` over any static server (`python3 -m http.server`) with zero console errors.
- A `serve.sh` that starts a local server and prints the URL.
- README.md: what it is, how to run locally, how it deploys (GitHub Pages from `main`), credits to abeto.co / igloo.inc as inspiration.
- Structure the code (`src/main.js`, `src/scene/*.js`, `src/ui/*.js`) so clusters and copy are data-driven from one `src/content.js` file, easy to edit.
- Commit with message `feat: anishfy lands`.
