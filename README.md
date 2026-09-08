<picture>
  <source media="(prefers-color-scheme: dark)"
          srcset="https://raw.githubusercontent.com/ISC-HEI/isc-logos/main/white/ISC%20Logo%20inline%20white%20v3%20-%20large.webp">
  <img align="right" height="50" alt="ISC Logo"
       src="https://raw.githubusercontent.com/ISC-HEI/isc-logos/main/black/ISC%20Logo%20inline%20black%20v3%20-%20large.webp"/>
</picture>

[![Vue 3](https://img.shields.io/badge/Vue%203-0d1117?logo=vuedotjs&logoColor=white)](https://vuejs.org/)

# isc-design — ISC web fleet

The shared front-end primitives behind every ISC site: the official logo, the
header, the footer, the five-petal colour strip, the ambient background, the
language switcher, and the theme and confetti composables. Published as
`@isc-hei/design` and consumed straight from this repository as a git
dependency — no registry, no token, no `.npmrc`.

Written in Vue 3 (`<script setup>`) and plain CSS with custom properties. The
components ship as source, so the consuming site's Vite build compiles them
with the rest of its code.

## Features

- **`ISCLogo`** — the official five-petal symbol as inline SVG, with gradient ids scoped per instance so several logos on one page don't collide
- **`ISCHeader`** — the fleet header, taking a petal's hex values directly so it needs no token import
- **`Footer`** — HEI logo slot, opt-in contact button, and the pulsing heart
- **`ColorStrip`** — the five petal colours, blendable and optionally cycling
- **`AmbientBackground`** — five drifting colour blobs, with `blobs`, `gradient`, `pulse`, `sweep` and `aurora` variants
- **`LangSwitcher`** — the FR / DE / EN control used in the meta strips
- **`useTheme` / `useConfetti`** — light/dark persistence, and confetti (`canvas-confetti` is an optional peer dependency)

## Quick Start

```bash
# Add it to a site — pin the tag, never track main
bun add github:ISC-HEI/isc-design#v0.3.1
```

```vue
<script setup>
import { ISCHeader } from '@isc-hei/design'
import '@isc-hei/design/style.css'
</script>

<template>
  <ISCHeader
    accent-light="#A890C0"
    accent-dark="#8D78A9"
    surtitle="Outil enseignant"
    title="Grade Mailer"
    hub-href="https://isc.hevs.ch/"
  />
</template>
```

`hubHref` is a plain `<a href>`, not a router link, so the header is drop-in
even in apps without vue-router. Keep that URL identical across every ISC tool
so users can always navigate home.

## The petal palette

Every ISC tool wears the colour of its primary audience. The five values come
from the logo's own gradients and are the only accents the fleet uses.

| Petal | Audience | `light` (logo) | `dark` (high-contrast) |
| --- | --- | --- | --- |
| yellow | Futur·es étudiant·es | `#F7F19F` | `#CFB359` |
| blue | Étudiant·es | `#8CC6E6` | `#82AEC9` |
| lavender | Enseignant·es | `#A890C0` | `#8D78A9` |
| pink | Alumni | `#E2ABBA` | `#C392A8` |
| mint | Entreprises & partenaires | `#98C7BF` | `#7AAEA3` |

Use `light` for logo-matching fills and thick accents, `dark` for thin lines
and small text.

## Releasing a version

1. Change what you need, commit.
2. `git tag v<version> && git push --tags`.
3. In each consuming site, move the ref: `bun add github:ISC-HEI/isc-design#v<version>`, then commit the refreshed lockfile.

Consumers pin a tag, so nothing moves under them until that ref is bumped.

---

## License

Copyright © 2026 P.-A. Mudry / ISC — HES-SO Valais.

The ISC symbol drawn by `components/ISCLogo.vue` and the petal colour values
derived from it are **CC BY-NC-SA 4.0**, as published in
[`ISC-HEI/isc-logos`](https://github.com/ISC-HEI/isc-logos) — don't redraw,
recolour or simplify them. The remaining code is provided for use within the
ISC web fleet; ask before reusing it elsewhere.

---

*Made with ♥ by mui, 2026*
