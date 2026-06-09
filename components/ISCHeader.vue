<script setup>
const base = import.meta.env.BASE_URL

/**
 * The header pattern shared by every tool of the ISC ecosystem.
 *
 *   ┌─────────────────────────────────────────────────────────┐
 *   │██│  [logo] ISC | 02   Grade Mailer        (meta slot)   │
 *   └──┴──────────────────────────────────────────────────────┘
 *
 * The thick coloured bar on the left is the audience signature.
 * accentLight: hex colour for the left bar (matches logo petal light)
 * accentDark:  hex colour for the surtitle text (high-contrast dark variant)
 *
 * hubHref is a plain <a href> (not a router-link) so this component is
 * drop-in in apps without vue-router.
 */
defineProps({
  accentLight:      { type: String, required: true },
  accentDark:       { type: String, required: true },
  surtitle:         { type: String, required: true },
  title:            { type: String, required: true },
  hubHref:          { type: String, default: '/' },
  tooltipBackToHub: { type: String, default: 'ISC Hub' },
})
</script>

<template>
  <header class="isc-header">
    <div class="isc-header__main">
      <div class="isc-header__bar" :style="{ background: accentLight }" />
      <div class="isc-header__inner">
        <a :href="hubHref" class="isc-header__brand" :data-tooltip="tooltipBackToHub">
          <img :src="`${base}isc-logo-black.svg`" class="isc-header__full-logo isc-header__full-logo--light" alt="ISC" />
          <img :src="`${base}isc-logo-white.svg`" class="isc-header__full-logo isc-header__full-logo--dark"  alt="ISC" />
        </a>
        <div class="isc-header__divider" />
        <div class="isc-header__titles">
          <div class="isc-header__surtitle isc-mono-label" :style="{ color: accentDark }">
            <slot name="surtitle">{{ surtitle }}</slot>
          </div>
          <h1 class="isc-header__title">{{ title }}</h1>
        </div>
        <div v-if="$slots.meta" class="isc-header__meta">
          <slot name="meta" />
        </div>
      </div>
    </div>
  </header>
</template>

<style>
.isc-header {
  background: var(--isc-bg-white);
  border-bottom: 1px solid var(--isc-border-default);
}

.isc-header__main {
  display: flex;
}

.isc-header__bar {
  width: 8px;
  flex-shrink: 0;
}

.isc-header__inner {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 14px var(--isc-page-padding-x);
  gap: 22px;
}

.isc-header__brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.isc-header__full-logo {
  height: 60px;
  width: auto;
  margin-left: -6px;
}

.isc-header__full-logo--dark { display: none; }

:root[data-theme="dark"] .isc-header__full-logo--light { display: none; }
:root[data-theme="dark"] .isc-header__full-logo--dark  { display: block; }

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .isc-header__full-logo--light { display: none; }
  :root:not([data-theme="light"]) .isc-header__full-logo--dark  { display: block; }
}

.isc-header__divider {
  width: 1px;
  height: 56px;
  background: var(--isc-border-strong);
}

.isc-header__titles {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.isc-header__surtitle {
  font-size: 0.7rem;
  letter-spacing: 1.1px;
  font-weight: 550;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.isc-header__surtitle a {
  color: inherit;
  text-decoration: none;
}
.isc-header__surtitle a:hover { text-decoration: underline; text-underline-offset: 2px; }
.isc-header__surtitle-sep { opacity: 0.45; margin: 0 3px; }

.isc-header__title {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--isc-text-primary);
  letter-spacing: -0.4px;
  line-height: 1.15;
  margin: 0;
}

.isc-header__meta {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.694rem;
  color: var(--isc-text-muted);
  font-family: var(--isc-font-mono);
}

@media (max-width: 640px) {
  .isc-header__bar {
    width: 6px;
  }
  .isc-header__inner {
    flex-wrap: wrap;
    padding: 12px 16px;
    gap: 14px;
  }
  .isc-header__divider {
    display: none;
  }
  .isc-header__brand {
    flex: 0 0 100%;
    justify-content: center;
  }
  .isc-header__title {
    font-size: 1.056rem;
  }
}
</style>
