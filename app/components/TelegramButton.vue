<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    compact?: boolean
  }>(),
  {
    label: 'Обсудить задачу',
    compact: false,
  },
)
</script>

<template>
  <a
    class="button button--primary"
    :class="{ 'button--compact': compact }"
    href="https://t.me/xemay4ik"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span>{{ label }}</span>
    <img
      class="button__telegram-icon"
      src="/Telegram_logo_icon.svg"
      alt=""
      width="18"
      height="18"
      aria-hidden="true"
    >
  </a>
</template>
