<script setup>
/**
 * showContact — the "Nous contacter" button is OPT-IN: it only emits
 * `contact-click`, so a consumer that doesn't listen would get a dead
 * button (this happened to isc-tbs on 0.2.1). Pass :show-contact="true"
 * together with an @contact-click handler.
 */
defineProps({
  showContact: { type: Boolean, default: false },
})

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
      v-if="showContact"
      type="button"
      class="isc-footer__contact"
      @click="emit('contact-click')"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.36 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      Nous contacter
    </button>

    <span class="isc-footer__credit">
      Made with <span class="isc-footer__heart" aria-hidden="true" @click="onHeartClick"><svg class="isc-footer__heart-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-6.7-4.35-9.33-8.07C.9 10.27 1.4 6.6 4.2 5.07c2.06-1.12 4.5-.45 5.92 1.2L12 8.05l1.88-1.78c1.42-1.65 3.86-2.32 5.92-1.2 2.8 1.53 3.3 5.2 1.53 7.86C18.7 16.65 12 21 12 21z"/></svg></span> — mui {{ year }}
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
  font-size: 0.5rem;
  color: var(--isc-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.isc-footer__heart {
  display: inline-flex;
  align-items: center;
  color: var(--isc-hei);
  vertical-align: -0.15em;
  margin: 0 4px;
  cursor: pointer;
}

/* Inline SVG instead of the ❤️ emoji: a colour emoji is a bitmap on mobile,
   so the pulse either re-rasterizes the glyph each frame (janky) or, once
   promoted to a compositor layer, GPU-upscales a low-res snapshot (jagged).
   A vector heart sidesteps both. The icon box is sized to the pulse's PEAK
   and the keyframes only ever scale DOWN from it, so the composited texture
   is never upscaled — it stays crisp while remaining GPU-smooth. */
.isc-footer__heart-icon {
  width: 0.78rem;
  height: 0.78rem;
  transform-origin: center;
  will-change: transform;
  backface-visibility: hidden;
  animation: isc-heart-pulse 1.2s ease-in-out infinite;
}

@keyframes isc-heart-pulse {
  0%, 100% { transform: scale(0.77); }
  50%       { transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .isc-footer__heart-icon { animation: none; transform: scale(0.85); }
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

/* Dark theme: the neutral border token is invisible on dark surfaces */
:root[data-theme="dark"] .isc-footer__contact {
  border-color: rgba(255, 255, 255, 0.18);
}
:root[data-theme="dark"] .isc-footer__contact:hover {
  border-color: rgba(255, 255, 255, 0.38);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .isc-footer__contact {
    border-color: rgba(255, 255, 255, 0.18);
  }
  :root:not([data-theme="light"]) .isc-footer__contact:hover {
    border-color: rgba(255, 255, 255, 0.38);
  }
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
