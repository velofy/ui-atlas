# UI Atlas

> Production-grade frontend references, built to be read by AI agents and people alike.

An atlas from [velofy](https://github.com/velofy): AI Native builders out of Gurgaon, India. Every reference here is a complete, self-contained HTML file: inline CSS and JS, system fonts, zero dependencies, no build step. Open it in a browser, or hand it to a coding agent as a design reference it can parse directly from the DOM.

## Collection 01: velofy.co landing concepts

Eight art directions explored for the velofy.co landing page. Same brand, same content, eight very different answers. Each file lives in [`landing-pages/velofy-co/`](landing-pages/velofy-co/).

| File | Concept | The idea |
| --- | --- | --- |
| [`01-terminal.html`](landing-pages/velofy-co/01-terminal.html) | The Boot Sequence | An amber-phosphor CRT terminal boots the studio pitch, then takes real commands: `help`, `about`, `summit`, and one easter egg. |
| [`02-brutalist.html`](landing-pages/velofy-co/02-brutalist.html) | The Manifesto | Daylight brutalism: enormous condensed type, hard black borders, one cobalt accent, a marquee that will not apologize. |
| [`03-desktop-os.html`](landing-pages/velofy-co/03-desktop-os.html) | velofyOS | A retro System-7-style desktop. Draggable windows, menu bar with a live clock, boot splash, the org as an operating system. |
| [`04-altitude.html`](landing-pages/velofy-co/04-altitude.html) | The Expedition | Generative topographic contours and a rope-orange route line that draws itself from Base Camp Gurgaon (EL 217 m) to the summit CTA. |
| [`05-bazaar.html`](landing-pages/velofy-co/05-bazaar.html) | Made in Gurgaon | Indian futurism: truck-art SVG frames, marigold garland dividers, night-market color on a strict grid. |
| [`06-departures.html`](landing-pages/velofy-co/06-departures.html) | Departures | A split-flap Solari board flips to NOW BOARDING: THE AI NATIVE ERA. Summit.js listed as DEPARTED, gate GH-01. |
| [`07-swiss.html`](landing-pages/velofy-co/07-swiss.html) | The Poster | Swiss International Style: 12-column grid, one red, baseline rhythm. Press G to reveal the proofing grid. |
| [`08-literate.html`](landing-pages/velofy-co/08-literate.html) | View Source | The page is its own annotated source code. A render toggle flips the same DOM into a clean landing page and back. |
| [`09-showreel.html`](landing-pages/velofy-co/09-showreel.html) | The Showreel | Site-of-the-day vocabulary in pure vanilla JS: preloader counter, kinetic wordmark, pinned scenes, a horizontal gallery, and a magnetic footer CTA. |
| [`10-launch.html`](landing-pages/velofy-co/10-launch.html) | The Launch | A monochrome dark startup page in white grotesk type that genuinely runs on the Summit.js runtime inlined in the file: live toggle demo, bound progress bar, skeleton switch, and the full loader gallery. |
| [`11-oasis.html`](landing-pages/velofy-co/11-oasis.html) | The Oasis (featured) | A lush photographic oasis scene behind a single frosted-glass panel: shield favicon, serif wordmark with an italic swash, one byline. The image is inlined as base64, so the file still makes zero external requests. |

## Collection 03: Whole sites

Multi-file templates you can copy wholesale. Indexed from [`index.html`](index.html).

| Template | What it is |
| --- | --- |
| [`templates/dehaux/`](templates/dehaux/) | Dark editorial operations hub: six pages, shared CSS/JS, three accent palettes. |
| [`templates/anishfy-lands/`](templates/anishfy-lands/) | Scroll-driven WebGL portfolio with dot-to-dot section ticks, glowing wordmark, and a velofy colophon CTA. Forked from [anishfy-lands](https://anishfyi.github.io/anishfy-lands/). |

## Collection 02: Clean templates

Thirty self-contained reference designs, one per subject and aesthetic, each with a hand-authored inline-SVG illustration as its signature. Drawn from a survey of getdesign.md and designindex.xyz. They live in [`landing-pages/clean/`](landing-pages/clean/) and are indexed from [`index.html`](index.html).

Cadence (minimal calendar), Nimbus (AI infra), Velar (EV), The Margin (broadsheet), Vault9 (crypto wallet), Bloop (kids app), Forge (brutalist CLI), Portway (terminal), Aurent (watch atelier), Northwind (Carbon B2B), Pixel Post (Y2K), Dial-Up Depot (90s catalog), Frame (photo portfolio), Orbit (scheduling AI), Slow Press (coffee), Terra (carbon tracker), Stackly (bento), Halftone (studio), Pulse (health), Sterling (private bank), Arcade9 (gaming), Sprout (education), Wayfarer (travel), Resonate (music), Blueprint (architecture), Morsel (food), Counsel (legal), Isotherm (climate), Atelier (fashion), Apogee (space).

## Ground rules every reference follows

- One file per design. All CSS, JS, and graphics inline; icons and ornament are inline SVG or canvas.
- No external requests of any kind: no CDNs, no webfonts, no remote images.
- Responsive down to 360px with no horizontal scroll.
- Visible keyboard focus states, and `prefers-reduced-motion` respected everywhere.
- Real copy, no lorem ipsum. Structure encodes meaning, not decoration.

## Using this with a coding agent

Point your agent at a file and ask it to adapt the direction to your product:

1. Pick the concept closest to the feeling you want.
2. Have the agent read the HTML: the design tokens live in `:root` custom properties, the layout is semantic, and the copy shows the intended voice.
3. Ask for the adaptation in any stack. The reference is plain HTML, so nothing about it assumes a framework.

Built in the spirit of [Summit.js](https://github.com/velofy/summitjs), our open source, AI Agent Native JavaScript framework: HTML that both readers can understand.

## About velofy

We are AI Native builders out of Gurgaon, India. Open Source. by Nature.

- Org: [github.com/velofy](https://github.com/velofy)
- Summit.js: [repo](https://github.com/velofy/summitjs) and [docs](https://velofy.github.io/summitjs/)
- More collections and more repos are on the way.

## License

[MIT](LICENSE)
