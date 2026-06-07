import { ref } from 'vue'

const STORAGE_KEY = 'isc.confetti'

function initial() {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(STORAGE_KEY) !== 'false'
  }
  return true
}

const enabled = ref(initial())
const inFlight = ref(false)

// Default geometry — three gentle fountains evenly distributed along the
// bottom edge (x ∈ {1/6, 1/2, 5/6}), all firing straight up. Low velocity
// and wide spread so the particles linger; reads as ambient rather than
// directed. Consumers wanting corner bursts pass their own sources/opts.
const DEFAULT_SOURCES = [
  { origin: { x: 1 / 6, y: 1 } },
  { origin: { x: 1 / 2, y: 1 } },
  { origin: { x: 5 / 6, y: 1 } },
]

const DEFAULT_OPTS = {
  angle: 90, // straight up
  particleCount: 99,
  spread: 110,
  startVelocity: 48,
  gravity: 0.65,
  decay: 0.94,
  ticks: 280,
}

/**
 * Celebratory confetti burst, shared across the ISC fleet.
 *
 * `canvas-confetti` is an OPTIONAL peer dependency — lazy-imported on the
 * first fire() so consumers that never trigger it pay nothing, and consumers
 * that do must `bun add canvas-confetti` themselves (the curl-tarball CI
 * install never resolves this package's own deps).
 *
 *   const { enabled, setEnabled, inFlight, fire } = useConfetti()
 *   <img class="logo" @click="fire()" />
 *
 * fire(opts?) — opts.sources overrides the burst origins (array of
 * canvas-confetti option fragments, each merged over opts/defaults);
 * every other key is passed through to canvas-confetti.
 *
 * The in-flight lock blocks re-trigger until every burst's promise has
 * resolved, so spam-clicking can't stack overlapping bursts.
 */
export function useConfetti() {
  function setEnabled(v) {
    enabled.value = !!v
    try { localStorage.setItem(STORAGE_KEY, String(!!v)) } catch {}
  }

  async function fire(opts = {}) {
    if (!enabled.value || inFlight.value) return
    inFlight.value = true
    try {
      const { default: confetti } = await import('canvas-confetti')
      const { sources = DEFAULT_SOURCES, ...rest } = opts
      const merged = { ...DEFAULT_OPTS, ...rest }
      await Promise.all(sources.map(s => confetti({ ...merged, ...s })))
    } finally {
      inFlight.value = false
    }
  }

  return { enabled, setEnabled, inFlight, fire }
}
