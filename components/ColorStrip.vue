<script setup>
import { computed } from 'vue'

const props = defineProps({
  colors:   { type: Array,   required: true },
  blend:    { type: Number,  default: 0 },
  cycle:    { type: Boolean, default: false },
  height:   { type: Number,  default: null },
  animated: { type: Boolean, default: true },
})

/**
 * Build gradient stops for `n` colors with a blend factor.
 *   blend=0 → sharp hard-stop bands (original look)
 *   blend=1 → smooth continuous gradient
 * scale and offset are used when doubling the gradient for cycling.
 */
function buildStops(colors, blend, scale = 1, offset = 0) {
  const n = colors.length
  const stops = []
  for (let i = 0; i < n; i++) {
    const sharpStart = (i / n) * 100 * scale + offset
    const sharpEnd   = ((i + 1) / n) * 100 * scale + offset
    const smoothPos  = (i / (n - 1)) * 100 * scale + offset
    const start = sharpStart * (1 - blend) + smoothPos * blend
    const end   = sharpEnd   * (1 - blend) + smoothPos * blend
    stops.push(`${colors[i]} ${start.toFixed(2)}%`)
    if (end > start) stops.push(`${colors[i]} ${end.toFixed(2)}%`)
  }
  return stops
}

const stripStyle = computed(() => {
  const { colors, blend, cycle, animated } = props

  if (cycle && animated) {
    const stops = [
      ...buildStops(colors, blend, 0.5, 0),
      ...buildStops(colors, blend, 0.5, 50),
    ]
    return {
      background: `linear-gradient(to right, ${stops.join(', ')})`,
      backgroundSize: '200% 100%',
      animation: 'isc-strip-cycle 12s linear infinite',
    }
  }

  const stops = buildStops(colors, blend)
  return { background: `linear-gradient(to right, ${stops.join(', ')})` }
})
</script>

<template>
  <div
    class="isc-color-strip"
    :style="[height ? { height: `${height}px` } : undefined, stripStyle]"
    role="presentation"
  />
</template>

<style>
.isc-color-strip {
  height: 6px;
}

@keyframes isc-strip-cycle {
  from { background-position-x: 0%; }
  to   { background-position-x: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .isc-color-strip { animation: none !important; }
}

@media (max-width: 540px) {
  .isc-color-strip { height: 5px; }
}
</style>
