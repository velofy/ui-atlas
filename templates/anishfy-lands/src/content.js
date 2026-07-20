// anishfy-lands: all copy, clusters, and projects live here.
// Edit this file to change what the site says and shows.

export const SITE = {
  wordmark: 'anishfyi',
  tagline: 'applied ai * harness engineering',
  scrollHint: 'Scroll to descend',
  accent: '#FF6B35',
  repoBase: 'https://github.com/anishfyi/',
};

export const CLUSTERS = [
  {
    id: 'cli',
    label: 'CLI / TERMINAL',
    projects: [
      { name: 'glep', repo: 'glep', desc: 'indexed grep + glob, instant code search' },
      { name: 'curl_reap', repo: 'curl_reap', desc: 'a web scraping library that reaps pages' },
      { name: 'kestrel', repo: 'kestrel', desc: 'multi-agent fan-out for parallel work' },
      { name: 'terbium', repo: 'terbium', desc: 'a document parser with sharp edges' },
      { name: 'querion', repo: 'querion', desc: 'a natural language data analyst' },
      { name: 'trove', repo: 'trove', desc: 'a Claude Code skill worth keeping' },
      { name: 'numera', repo: 'numera', desc: 'a numeric toolkit for the terminal' },
    ],
  },
  {
    id: 'android',
    label: 'ANDROID',
    projects: [
      { name: 'BLOKD', repo: 'BLOKD', desc: 'an ad blocker for Android' },
      { name: 'Aperture VPN', repo: 'aperture-vpn', desc: 'a private tunnel for Android' },
    ],
  },
  {
    id: 'macos',
    label: 'MACOS',
    projects: [
      { name: 'vaulty', repo: 'vaulty', desc: 'a screen lock for macOS' },
      { name: 'pawse', repo: 'pawse', desc: 'gentle break reminders' },
      { name: 'warden', repo: 'warden', desc: 'a token monitor for the menu bar' },
    ],
  },
  {
    id: 'web',
    label: 'WEB',
    projects: [
      { name: 'classy-fonts', repo: 'classy-fonts', desc: 'a 324-typeface specimen' },
      { name: 'backend-almanac', repo: 'backend-almanac', desc: 'field notes on backend engineering' },
      { name: 'dehaux', repo: 'dehaux', desc: 'an experiment for the web' },
    ],
  },
];

export const MANIFESTO = {
  lines: ['Small tools.', 'Sharp edges.', 'Shipped.'],
  footnote: 'Everything above is real and on GitHub.',
};

export const COLOPHON = {
  lines: ['applied AI and harness', 'by anishfyi · @velofy'],
  cta: { label: 'help me build this', url: 'https://velofy.co' },
};
