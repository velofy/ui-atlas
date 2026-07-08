# Dehaux

> A dark editorial operations template. Espresso ground, typeset serif voice, three accents that never fight.

Dehaux is a multi-page HTML/CSS template for internal tools, admin hubs, and operations dashboards that want to feel typeset rather than engineered. It is the dark sibling of a cream-and-terracotta editorial admin style: display serif headlines with italic accent words, monospace micro-labels, hairline borders, and calm status pills, all flipped onto a warm espresso ground.

No build step, no dependencies, no webfonts. Two assets power every page.

## Pages

| Page | What it shows |
| --- | --- |
| [`index.html`](index.html) | The hub dashboard: sidebar navigation, quick-access cards, a shipped list with LIVE pills, editorial callout. |
| [`projects.html`](projects.html) | A board list page: search toolbar, filter chips, and a full table with status pill variants. |
| [`login.html`](login.html) | Split sign-in: hero pane with the display headline, form pane with mono labels and a signed-out notice. |
| [`sign-out.html`](sign-out.html) | The leaving ceremony: spinner, "See you soon." and an automatic return to the login screen. |
| [`styleguide.html`](styleguide.html) | The design system reference: palettes, type scale, and every component in one place. |
| [`404.html`](404.html) | Lost, gracefully. |

## The palette system

One espresso ground family, three switchable accent palettes. Set `data-palette` on the root element, or use the floating dock on any page (persists via localStorage).

```html
<html lang="en" data-palette="copper">   <!-- copper | brass | verdigris -->
```

### Copper (default)

The truest dark flip of the original terracotta-and-cream style. Warm, hospitable, confident.

| Token | Value | Role |
| --- | --- | --- |
| `--ground` | `#171210` | Page ground |
| `--panel` | `#1F1915` | Cards, inputs |
| `--line` | `#3A2F24` | Hairline borders |
| `--ink` | `#EFE6D5` | Headlines, titles |
| `--muted` | `#A69687` | Secondary text |
| `--accent` | `#CE8354` | Italic serif words, links, primary buttons |
| `--ok` | `#93A583` | LIVE pills, status dots |

### Brass

Gilded and quiet. For hubs that want to feel like a private library.

| Token | Value |
| --- | --- |
| `--ground` | `#14100A` |
| `--accent` | `#C9A45C` |
| `--ok` | `#9B9A6B` |

### Verdigris

The coolest of the three: botanical, restful, archive-like.

| Token | Value |
| --- | --- |
| `--ground` | `#131511` |
| `--accent` | `#83B098` |
| `--ok` | `#A8B080` |

### Combination rules

- The italic serif accent word is always the accent color, never a second hue.
- Status greens (`--ok`) carry meaning; never use them decoratively.
- Semantic warn and danger colors stay constant across palettes.
- Never mix two accent palettes on one screen; switch the whole root instead.
- Full reference with live specimens: [`styleguide.html`](styleguide.html).

## Typography

- Display: Didot, Bodoni 72, Georgia lineage. Italic carries the accent.
- UI: Avenir Next and the system stack.
- Micro-labels: SF Mono stack, uppercase, generous letter-spacing.

All system fonts. Nothing is fetched.

## Using it

1. Copy `assets/dehaux.css` and `assets/dehaux.js` into your project.
2. Start from any page here and swap the demo content for your own.
3. Keep the grammar: serif for titles, mono for labels, pills for state, one accent per screen.

From [velofy](https://github.com/velofy): AI Native builders out of Gurgaon, India. Open Source. by Nature.

## License

[MIT](LICENSE)
