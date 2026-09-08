// Smoke test for @isc-hei/design.
//
// It does two things that a `npm publish` never did: it checks that every
// name the package advertises actually resolves, and it makes a bundler
// compile every component — which is where a broken <template>, a missing
// import or a bad `exports` map shows up. A tag that fails this would reach
// five sites at once, since they all install straight from the git ref.
//
// Run it locally the same way CI does:  cd test/smoke && bun install && bun run build

import { createApp, h } from 'vue'
import {
  ISCLogo,
  ISCHeader,
  Footer,
  ColorStrip,
  AmbientBackground,
  LangSwitcher,
  useTheme,
  useConfetti,
} from '@isc-hei/design'
import '@isc-hei/design/style.css'

const components = { ISCLogo, ISCHeader, Footer, ColorStrip, AmbientBackground, LangSwitcher }
const composables = { useTheme, useConfetti }

for (const [name, c] of Object.entries(components)) {
  if (!c || typeof c !== 'object') throw new Error(`export ${name} is not a component`)
}
for (const [name, fn] of Object.entries(composables)) {
  if (typeof fn !== 'function') throw new Error(`export ${name} is not a function`)
}

// Mount every component once, with the props the fleet actually passes.
createApp({
  render: () => h('div', [
    h(ISCLogo, { width: 120, title: 'ISC' }),
    h(ISCHeader, {
      accentLight: '#A890C0',
      accentDark: '#8D78A9',
      surtitle: 'Smoke test',
      title: '@isc-hei/design',
      hubHref: 'https://isc.hevs.ch/',
    }),
    h(ColorStrip, { colors: ['#F7F19F', '#8CC6E6', '#A890C0', '#E2ABBA', '#98C7BF'], blend: 0.5, cycle: true }),
    h(AmbientBackground, { bgStyle: 'blobs', intensity: 0.2 }),
    h(LangSwitcher),
    h(Footer, { showContact: true }),
  ]),
}).mount('#app')
