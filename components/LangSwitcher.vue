<script setup>
/**
 * Language switcher pill, shared across the ISC fleet.
 *
 * Deliberately i18n-agnostic: it only renders the codes and reports the
 * pick — persistence and translation stay in the consumer's own composable.
 *
 *   <LangSwitcher :langs="['fr','de','en']" :model-value="lang"
 *                 @update:model-value="setLang" aria-label="Langue" />
 *
 * aria-label (or any other attribute) falls through to the root group.
 * The active code wears the HEI magenta disc; inactive codes are muted.
 */
defineProps({
  langs: { type: Array, default: () => ['fr', 'de', 'en'] },
  modelValue: { type: String, required: true },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="isc-lang-switcher" role="group">
    <button
      v-for="code in langs"
      :key="code"
      type="button"
      class="isc-lang-switcher__btn"
      :class="{ 'is-active': code === modelValue }"
      :aria-pressed="code === modelValue"
      @click="emit('update:modelValue', code)"
    >{{ code.toUpperCase() }}</button>
  </div>
</template>

<style>
.isc-lang-switcher {
  display: inline-flex;
  align-items: center;
  background: var(--isc-bg-white);
  border: 1px solid var(--isc-border-default);
  border-radius: 999px;
  padding: 3px 5px;
  gap: 4px;
}

.isc-lang-switcher__btn {
  border: 0;
  background: transparent;
  font-family: var(--isc-font-sans);
  font-size: 0.611rem;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: uppercase;
  color: var(--isc-text-disabled);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s;
  padding: 0 4px;
  min-height: 26px;
  line-height: 1;
}

.isc-lang-switcher__btn:hover:not(.is-active) {
  color: var(--isc-text-primary);
}

.isc-lang-switcher__btn.is-active {
  background: var(--isc-hei);
  color: #fff;
  font-weight: 600;
  cursor: default;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  padding: 0;
}

/* Dark theme: the neutral border token is invisible on dark surfaces */
:root[data-theme="dark"] .isc-lang-switcher {
  border-color: rgba(255, 255, 255, 0.18);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .isc-lang-switcher {
    border-color: rgba(255, 255, 255, 0.18);
  }
}
</style>
