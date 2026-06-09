<script setup>
const emit = defineEmits(['secret-click', 'contact-click'])

const year = new Date().getFullYear()

let clickCount = 0
let clickTimer = null
function onHeartClick() {
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
    <button
      type="button"
      class="isc-footer__contact"
      @click="emit('contact-click')"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.36 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      Nous parler
    </button>

    <span class="isc-footer__credit">
      Made with <span class="isc-footer__heart" aria-hidden="true" @click="onHeartClick">❤️</span> — mui {{ year }}
    </span>

    <slot name="logo" />
  </footer>
</template>

<style>
.isc-footer {
  border-top: 1px solid var(--isc-border-default);
  background: var(--isc-bg-secondary);
  padding: 12px var(--isc-page-padding-x);
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: "contact credit logo";
  align-items: center;
  font-family: var(--isc-font-mono);
  font-size: 0.61rem;
  color: var(--isc-text-muted);
  gap: 0 16px;
  user-select: none;
  letter-spacing: 0.02em;
}

.isc-footer a {
  color: var(--isc-text-muted);
  text-decoration: none;
  transition: color 0.15s ease;
}
.isc-footer a:hover { color: var(--isc-text-primary); }

.isc-footer__hei-logo {
  grid-area: logo;
  justify-self: end;
  height: 64px;
  width: auto;
  opacity: 0.8;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  transition: opacity 0.15s ease;
}
.isc-footer__hei-logo:hover { opacity: 1; }
.isc-footer__hei-logo img { height: 100%; width: auto; }

.isc-footer__hei-logo img.isc-footer__hei-logo--dark { display: none; }
:root[data-theme="dark"] .isc-footer__hei-logo img.isc-footer__hei-logo--light { display: none; }
:root[data-theme="dark"] .isc-footer__hei-logo img.isc-footer__hei-logo--dark  { display: block; }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .isc-footer__hei-logo img.isc-footer__hei-logo--light { display: none; }
  :root:not([data-theme="light"]) .isc-footer__hei-logo img.isc-footer__hei-logo--dark  { display: block; }
}

.isc-footer__credit {
  grid-area: credit;
  color: var(--isc-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.isc-footer__heart {
  display: inline-block;
  color: var(--isc-hei);
  font-size: 0.556rem;
  vertical-align: 0.15em;
  margin: 0 4px;
  cursor: pointer;
  animation: isc-heart-pulse 1.2s ease-in-out infinite;
}

@keyframes isc-heart-pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.3); }
}

.isc-footer__contact {
  grid-area: contact;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--isc-bg-white);
  border: 1px solid var(--isc-border-default);
  border-radius: 999px;
  height: 32px;
  padding: 0 14px;
  font-family: var(--isc-font-sans);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0;
  color: var(--isc-text-secondary);
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease;
}
.isc-footer__contact:hover {
  color: var(--isc-text-primary);
  border-color: var(--isc-text-muted);
}

@media (max-width: 600px) {
  .isc-footer {
    padding: 12px 16px;
    font-size: 0.611rem;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "contact logo"
      "credit  credit";
    gap: 8px 16px;
    align-items: center;
  }
  .isc-footer__credit {
    justify-self: center;
  }
  .isc-footer__hei-logo {
    height: 48px;
  }
}
</style>
