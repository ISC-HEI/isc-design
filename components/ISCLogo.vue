<script setup>
import { computed } from 'vue'

/**
 * The official ISC symbol — five gradient petals around a white centre.
 * Source: github.com/ISC-HEI/isc-logos (CC BY-NC-SA 4.0).
 *
 * We inline the SVG so it can be coloured, animated and tinted without
 * the limitations of an <img>. Gradient ids are scoped per instance so
 * multiple ISCLogo renders on the same page don't collide.
 *
 * Native viewBox is 172.11 × 113.06 (aspect ratio ≈ 1.52).
 */
const props = defineProps({
  width: { type: Number, default: 120 },
  title: { type: String, default: '' },
})

let __isc_logo_uid = 0
const uid = `isc-logo-${++__isc_logo_uid}`

const height = computed(() => props.width * (113.06 / 172.11))
</script>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 172.11 113.06"
    :role="title ? 'img' : undefined"
    :aria-hidden="title ? undefined : 'true'"
  >
    <title v-if="title">{{ title }}</title>
    <defs>
      <linearGradient :id="`${uid}-g1`" x1="113.05" y1="86.06" x2="0" y2="86.06" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#fff" />
        <stop offset=".28" stop-color="#fcfae1" />
        <stop offset=".76" stop-color="#f8f3b1" />
        <stop offset="1" stop-color="#f7f19f" />
      </linearGradient>
      <linearGradient :id="`${uid}-g2`" x1="105.15" y1="105.15" x2="25.2" y2="25.21" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#fff" />
        <stop offset=".38" stop-color="#cee6f4" />
        <stop offset=".79" stop-color="#9ecfea" />
        <stop offset="1" stop-color="#8cc6e6" />
      </linearGradient>
      <linearGradient :id="`${uid}-g3`" x1="86.06" y1="113.06" x2="86.06" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#fff" />
        <stop offset=".36" stop-color="#dbd2e5" />
        <stop offset=".79" stop-color="#b6a2ca" />
        <stop offset="1" stop-color="#a890c0" />
      </linearGradient>
      <linearGradient :id="`${uid}-g4`" x1="66.96" y1="105.15" x2="146.91" y2="25.21" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#fff" />
        <stop offset=".19" stop-color="#f8edf0" />
        <stop offset=".73" stop-color="#e8bdc9" />
        <stop offset="1" stop-color="#e2abba" />
      </linearGradient>
      <linearGradient :id="`${uid}-g5`" x1="59.06" y1="86.06" x2="172.11" y2="86.06" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#fff" />
        <stop offset=".32" stop-color="#daeae8" />
        <stop offset=".77" stop-color="#aad1ca" />
        <stop offset="1" stop-color="#98c7bf" />
      </linearGradient>
    </defs>

    <!-- Yellow petal — bottom-left horizontal capsule -->
    <path
      :fill="`url(#${uid}-g1)`"
      d="M86.06,113.06H27c-14.91,0-27-12.09-27-27s12.09-27,27-27h59.06c14.91,0,27,12.09,27,27s-12.09,27-27,27Z"
    />
    <!-- Blue petal — diagonal NW→SE -->
    <path
      :fill="`url(#${uid}-g2)`"
      d="M86.06,113.06c-6.91,0-13.82-2.64-19.09-7.91L25.2,63.39c-10.54-10.54-10.54-27.64,0-38.18,10.54-10.54,27.64-10.54,38.18,0l41.76,41.76c10.54,10.54,10.54,27.64,0,38.18-5.27,5.27-12.18,7.91-19.09,7.91Z"
    />
    <!-- Lavender petal — central vertical -->
    <path
      :fill="`url(#${uid}-g3)`"
      d="M86.06,113.06c-14.91,0-27-12.09-27-27V27c0-14.91,12.09-27,27-27s27,12.09,27,27v59.06c0,14.91-12.09,27-27,27Z"
    />
    <!-- Pink petal — diagonal NE→SW -->
    <path
      :fill="`url(#${uid}-g4)`"
      d="M86.06,113.06c-6.91,0-13.82-2.64-19.09-7.91-10.54-10.54-10.54-27.64,0-38.18L108.72,25.21c10.54-10.54,27.64-10.54,38.18,0,10.54,10.54,10.54,27.64,0,38.18l-41.76,41.76c-5.27,5.27-12.18,7.91-19.09,7.91Z"
    />
    <!-- Mint petal — bottom-right horizontal capsule -->
    <path
      :fill="`url(#${uid}-g5)`"
      d="M145.11,113.06h-59.06c-14.91,0-27-12.09-27-27s12.09-27,27-27h59.06c14.91,0,27,12.09,27,27s-12.09,27-27,27Z"
    />
    <!-- White centre cap -->
    <circle fill="#fff" cx="86.06" cy="86.06" r="27" />
  </svg>
</template>
