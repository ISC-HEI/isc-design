<script setup>
import { computed } from 'vue'

const props = defineProps({
  repoUrl: { type: String, default: 'github.com/ISC-HEI' },
})

const emit = defineEmits(['secret-click'])

const href = computed(() =>
  props.repoUrl.startsWith('http') ? props.repoUrl : `https://${props.repoUrl}`
)

const hash = typeof __GIT_HASH__ !== 'undefined' ? __GIT_HASH__ : 'dev'
const year = new Date().getFullYear()

let clickCount = 0
let clickTimer = null
function onHashClick() {
  clickCount++
  clearTimeout(clickTimer)
  if (clickCount >= 3) {
    emit('secret-click')
    clickCount = 0
  } else {
    clickTimer = setTimeout(() => { clickCount = 0 }, 600)
  }
}
</script>

<template>
  <footer class="isc-footer">
    <a :href="href" target="_blank" rel="noopener noreferrer" class="isc-footer__repo">{{ repoUrl }}</a>

    <span class="isc-footer__credit">
      Made with <span class="isc-footer__heart" aria-hidden="true">❤️</span> — mui {{ year }}
    </span>

    <button
      class="isc-footer__hash"
      @click="onHashClick"
      aria-label="Version"
    >#{{ hash }}</button>
  </footer>
</template>

<style>
.isc-footer {
  border-top: 1px solid var(--isc-border-default);
  background: var(--isc-bg-secondary);
  padding: 12px var(--isc-page-padding-x);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.61rem;
  font-family: var(--isc-font-mono);
  color: var(--isc-text-muted);
  gap: 16px;
  flex-wrap: wrap;
  user-select: none;
  letter-spacing: 0.02em;
}

.isc-footer a {
  color: var(--isc-text-muted);
  text-decoration: none;
  transition: color 0.15s ease;
}
.isc-footer a:hover { color: var(--isc-text-primary); }

.isc-footer__credit {
  color: var(--isc-text-muted);
}

.isc-footer__heart {
  display: inline-block;
  color: var(--isc-hei);
  font-size: 0.556rem;
  vertical-align: 0.15em;
  margin: 0 1px;
  animation: isc-heart-pulse 1.2s ease-in-out infinite;
}

@keyframes isc-heart-pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.3); }
}

.isc-footer__hash {
  background: none;
  border: none;
  padding: 0;
  font-family: var(--isc-font-mono);
  font-size: 0.583rem;
  letter-spacing: 0.02em;
  color: var(--isc-text-disabled);
  cursor: pointer;
  transition: color 0.15s ease;
}
.isc-footer__hash:hover { color: var(--isc-text-muted); }
.isc-footer__hash:focus-visible { outline-offset: 3px; }

@media (max-width: 600px) {
  .isc-footer {
    padding: 14px 16px;
    flex-direction: column;
    text-align: center;
    gap: 6px;
    font-size: 0.611rem;
  }
}
</style>
