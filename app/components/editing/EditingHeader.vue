<script setup lang="ts">
const links = [
  { label: 'Программа', href: '#program' },
  { label: 'Формат', href: '#format' },
  { label: 'Результат', href: '#outcomes' },
  { label: 'Отзывы', href: '#testimonials' },
]
</script>

<template>
  <header class="editing-header">
    <NuxtLink class="editing-header__brand" to="/">
      <span>Дизайн-концепт</span>
      <i aria-hidden="true">|</i>
      <strong>xemay.dev</strong>
    </NuxtLink>

    <nav class="editing-header__nav" aria-label="Навигация по странице">
      <a v-for="link in links" :key="link.href" :href="link.href">
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>

<style scoped>
.editing-header {
  position: absolute;
  z-index: 5;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  width: min(1400px, calc(100% - 72px));
  min-height: 78px;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  margin-inline: auto;
  border-bottom: 1px solid rgb(255 255 255 / 0.12);
}

.editing-header__brand {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 9px;
  color: #a8abb2;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}

.editing-header__brand i {
  color: #50535a;
  font-style: normal;
}

.editing-header__brand strong {
  color: #f0f1f3;
  font-weight: 650;
}

.editing-header__nav {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: clamp(28px, 4vw, 58px);
}

.editing-header__nav a {
  position: relative;
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  color: #f4f7fb;
  font-size: 12px;
  font-weight: 650;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.editing-header__nav a::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--editing-blue);
  content: '';
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1);
}

.editing-header__nav a:first-child {
  color: var(--editing-blue-bright);
}

.editing-header__nav a:first-child::after,
.editing-header__nav a:hover::after,
.editing-header__nav a:focus-visible::after {
  transform: scaleX(1);
  transform-origin: left center;
}

@media (max-width: 720px) {
  .editing-header {
    width: calc(100% - 40px);
    min-height: 70px;
  }

  .editing-header__nav {
    justify-content: flex-end;
    gap: 18px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .editing-header__nav::-webkit-scrollbar {
    display: none;
  }

  .editing-header__nav a {
    min-height: 44px;
    font-size: 11px;
    letter-spacing: 0.06em;
  }

  .editing-header__brand {
    gap: 6px;
    font-size: 9px;
    letter-spacing: 0.04em;
  }
}

@media (max-width: 460px) {
  .editing-header__nav {
    gap: 14px;
  }

  .editing-header__brand span,
  .editing-header__brand i,
  .editing-header__nav a:nth-child(2),
  .editing-header__nav a:nth-child(3) {
    display: none;
  }
}
</style>
