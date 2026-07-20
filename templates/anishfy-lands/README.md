# anishfy Lands

> A scroll-driven WebGL portfolio field with dot-to-dot section ticks.

Full-site template forked from [anishfy-lands](https://github.com/anishfyi/anishfy-lands). Seven stops on a camera spline: hero wordmark, four project constellations, manifesto, and a velofy colophon CTA.

## What is different from the live site

- The **anishfyi** wordmark glows by default (HUD text-shadow and canvas bloom on the 3D hero), not only on hover.
- The final screen reads **applied AI and harness**, **by anishfyi · @velofy**, with a **help me build this** link to [velofy.co](https://velofy.co).

## Structure

| Path | Role |
| --- | --- |
| `index.html` | Shell, inline CSS, import map for Three.js + GSAP |
| `src/main.js` | Boot, scroll driver, raycasting |
| `src/content.js` | Copy, clusters, colophon |
| `src/scene/` | WebGL world, hero, constellations, camera path |
| `src/ui/` | HUD ticks, overlays, fallback |
| `assets/fonts/` | Self-hosted Syne + IBM Plex Mono |

## Run locally

```bash
./serve.sh
# or: python3 -m http.server 8080
```

Requires WebGL2. Section ticks on the right jump dot to dot through the journey.

## Copy wholesale

Duplicate the whole `templates/anishfy-lands/` folder into your project. Edit `src/content.js` for your clusters and colophon.
