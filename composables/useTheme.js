import { ref, watchEffect } from 'vue'

const STORAGE_KEY = 'isc.theme'
const valid = ['light', 'dark']

function initial() {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (valid.includes(stored)) return stored
  }
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

const mode = ref(initial())

watchEffect(() => {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', mode.value)
  try { localStorage.setItem(STORAGE_KEY, mode.value) } catch {}
})

export function useTheme() {
  function cycle() { mode.value = mode.value === 'light' ? 'dark' : 'light' }
  function set(next) { if (valid.includes(next)) mode.value = next }
  return { mode, cycle, set }
}
