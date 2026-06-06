<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme.js'

const props = defineProps({
  bgStyle:    { type: String,  default: 'blobs' },
  intensity:  { type: Number,  default: 0.20 },
  disabled:   { type: Boolean, default: false },
  colors: {
    type: Array,
    default: () => [
      'rgb(247, 241, 159)',
      'rgb(140, 198, 230)',
      'rgb(168, 144, 192)',
      'rgb(226, 171, 186)',
      'rgb(152, 199, 191)',
    ],
  },
  colorsDark: { type: Array, default: null },
})

const { mode } = useTheme()

const active = computed(() =>
  props.colorsDark && mode.value === 'dark' ? props.colorsDark : props.colors
)
</script>

<template>
  <div
    v-if="!disabled && bgStyle !== 'none'"
    class="isc-ambient"
    :data-bg="bgStyle"
    :style="{
      opacity: intensity,
      '--a1': active[0],
      '--a2': active[1],
      '--a3': active[2],
      '--a4': active[3],
      '--a5': active[4],
    }"
    aria-hidden="true"
  >
    <div v-for="n in 5" :key="n" class="isc-ambient__blob" />
  </div>
</template>

<style>
.isc-ambient {
  position: fixed; inset: 0; z-index: -1; pointer-events: none;
  overflow: hidden;
  transition: opacity .4s ease;
}

/* ── blobs ────────────────────────────────────────────────── */
.isc-ambient[data-bg="blobs"] { background: transparent; }
.isc-ambient[data-bg="blobs"] .isc-ambient__blob {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.65;
  will-change: transform;
}
.isc-ambient[data-bg="blobs"] .isc-ambient__blob:nth-child(1) { width: 40vmax; height: 40vmax; background: var(--a1); animation: isc-blob-1 27.5s ease-in-out infinite alternate; }
.isc-ambient[data-bg="blobs"] .isc-ambient__blob:nth-child(2) { width: 35vmax; height: 35vmax; background: var(--a2); animation: isc-blob-2 33s   ease-in-out infinite alternate; }
.isc-ambient[data-bg="blobs"] .isc-ambient__blob:nth-child(3) { width: 30vmax; height: 30vmax; background: var(--a3); animation: isc-blob-3 22s   ease-in-out infinite alternate; }
.isc-ambient[data-bg="blobs"] .isc-ambient__blob:nth-child(4) { width: 38vmax; height: 38vmax; background: var(--a4); animation: isc-blob-4 30.8s ease-in-out infinite alternate; }
.isc-ambient[data-bg="blobs"] .isc-ambient__blob:nth-child(5) { width: 32vmax; height: 32vmax; background: var(--a5); animation: isc-blob-5 24.2s ease-in-out infinite alternate; }
@keyframes isc-blob-1 { 0%{transform:translate(-10vw,-10vh)} 50%{transform:translate(60vw,40vh)} 100%{transform:translate(20vw,60vh)} }
@keyframes isc-blob-2 { 0%{transform:translate( 50vw,-15vh)} 50%{transform:translate(-5vw,50vh)} 100%{transform:translate(40vw,10vh)} }
@keyframes isc-blob-3 { 0%{transform:translate( 20vw, 50vh)} 50%{transform:translate(-10vw,-5vh)} 100%{transform:translate(55vw,30vh)} }
@keyframes isc-blob-4 { 0%{transform:translate( -5vw, 25vh)} 50%{transform:translate(45vw,-10vh)} 100%{transform:translate(65vw,55vh)} }
@keyframes isc-blob-5 { 0%{transform:translate( 35vw, 45vh)} 50%{transform:translate(-5vw,15vh)} 100%{transform:translate(25vw,-5vh)} }

/* ── gradient ─────────────────────────────────────────────── */
.isc-ambient[data-bg="gradient"] {
  background: linear-gradient(135deg, var(--a1), var(--a2), var(--a3), var(--a4), var(--a5), var(--a1));
  background-size: 400% 400%;
  animation: isc-bg-shift 49.5s ease-in-out infinite;
}
@keyframes isc-bg-shift {
  0%   { background-position: 0%   50%; }
  25%  { background-position: 100% 25%; }
  50%  { background-position: 100% 75%; }
  75%  { background-position: 0%  100%; }
  100% { background-position: 0%   50%; }
}

/* ── pulse ────────────────────────────────────────────────── */
.isc-ambient[data-bg="pulse"] {
  background:
    radial-gradient(ellipse at 20% 50%, var(--a1), transparent 60%),
    radial-gradient(ellipse at 80% 20%, var(--a2), transparent 60%),
    radial-gradient(ellipse at 50% 80%, var(--a3), transparent 60%),
    radial-gradient(ellipse at 90% 70%, var(--a4), transparent 60%),
    radial-gradient(ellipse at 10% 10%, var(--a5), transparent 60%);
  background-size: 200% 200%;
  animation: isc-bg-pulse 38.5s ease-in-out infinite;
}
@keyframes isc-bg-pulse {
  0%   { background-size: 200% 200%; background-position: 0%   0%; }
  25%  { background-size: 250% 250%; background-position: 50% 50%; }
  50%  { background-size: 200% 200%; background-position: 100% 100%; }
  75%  { background-size: 300% 300%; background-position: 25% 75%; }
  100% { background-size: 200% 200%; background-position: 0%   0%; }
}

/* ── sweep ────────────────────────────────────────────────── */
.isc-ambient[data-bg="sweep"] {
  background: repeating-linear-gradient(-45deg,
    var(--a1) 0%, var(--a2) 20%, var(--a3) 40%, var(--a4) 60%, var(--a5) 80%, var(--a1) 100%);
  background-size: 300% 300%;
  animation: isc-bg-sweep 33s linear infinite;
}
@keyframes isc-bg-sweep { 0%{background-position:0% 0%} 100%{background-position:300% 300%} }

/* ── aurora ───────────────────────────────────────────────── */
.isc-ambient[data-bg="aurora"] {
  background:
    linear-gradient(180deg, transparent, var(--a1), transparent),
    linear-gradient(180deg, transparent, var(--a2), transparent),
    linear-gradient(180deg, transparent, var(--a3), transparent);
  background-size: 300% 300%;
  animation: isc-bg-aurora 44s ease-in-out infinite;
}
@keyframes isc-bg-aurora {
  0%   { background-position: 0%   0%,  100% 0%,  50%  0%;  }
  33%  { background-position: 100% 50%, 0%   50%, 100% 50%; }
  66%  { background-position: 50%  100%, 50% 100%, 0%  100%;}
  100% { background-position: 0%   0%,  100% 0%,  50%  0%;  }
}
</style>
