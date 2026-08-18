<script setup lang="ts">
useSeoMeta({
  title: 'Твори. Снимай. Монтируй. — концепт марафона по видеомонтажу',
  description: 'Концепт лендинга онлайн-марафона: четыре недели практики в Premiere Pro и After Effects — от первого кадра до готового ролика.',
  ogTitle: 'Твори. Снимай. Монтируй.',
  ogDescription: 'Концепт лендинга онлайн-марафона по видеомонтажу.',
  ogType: 'website',
})

useHead({
  htmlAttrs: {
    class: 'editing-html',
  },
  bodyAttrs: {
    class: 'editing-body',
  },
  meta: [
    { name: 'theme-color', content: '#121315' },
    { name: 'color-scheme', content: 'dark' },
  ],
  link: [
    { key: 'canonical', rel: 'canonical', href: 'https://xemay.dev/showcases/editing' },
  ],
})
</script>

<template>
  <div class="editing-page">
    <main>
      <EditingHero />
      <EditingTimeline />
      <EditingFormat />
      <EditingOutcomes />
      <EditingTestimonials />
      <EditingFinalCta />
    </main>
  </div>
</template>

<style scoped>
:global(html.editing-html) {
  scroll-padding-top: 0;
  scrollbar-width: none;
  background: #121315;
}

:global(html.editing-html::-webkit-scrollbar) {
  display: none;
}

:global(body.editing-body) {
  background: #121315;
}

.editing-page {
  --editing-bg: #121315;
  --editing-panel: #1b1c1f;
  --editing-panel-raised: #242529;
  --editing-surface: var(--editing-panel);
  --editing-surface-raised: var(--editing-panel-raised);
  --editing-blue: #2d8cff;
  --editing-blue-bright: #62a8ff;
  --editing-blue-deep: #173e6d;
  --editing-violet: #9a75dc;
  --editing-teal: #22b98b;
  --editing-magenta: #d44eaa;
  --editing-amber: #d79a36;
  --editing-render: #d2cc28;
  --editing-ink: #ededf0;
  --editing-muted: #979aa1;
  --editing-line: #37393e;
  --editing-display: "IBM Plex Sans", "Segoe UI", sans-serif;
  min-width: 320px;
  overflow: clip;
  background:
    repeating-linear-gradient(90deg, transparent 0 119px, rgb(255 255 255 / 0.014) 120px),
    var(--editing-bg);
  color: var(--editing-ink);
  font-family: "Inter Variable", "Segoe UI", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color-scheme: dark;
}

.editing-page :deep(*) {
  box-sizing: border-box;
}

.editing-page :deep(.editing-shell) {
  width: min(1400px, calc(100% - 72px));
  margin-inline: auto;
}

.editing-page :deep(.editing-section) {
  padding-block: 124px;
}

.editing-page :deep(.editing-kicker) {
  color: var(--editing-blue);
  font-size: 12px;
  font-weight: 720;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.editing-page :deep(h2) {
  max-width: 1040px;
  color: var(--editing-ink);
  font-family: var(--editing-display);
  font-size: clamp(48px, 5vw, 78px);
  font-weight: 600;
  letter-spacing: -0.045em;
  line-height: 1.04;
  text-transform: uppercase;
}

.editing-page :deep(.editing-button) {
  display: inline-flex;
  min-height: 62px;
  align-items: center;
  justify-content: center;
  border: 1px solid #5aa7ff;
  border-radius: 8px;
  padding: 16px 30px;
  background: #147ce5;
  box-shadow: inset 0 1px rgb(255 255 255 / 0.24), 0 10px 30px rgb(0 0 0 / 0.28);
  color: #fff;
  font-family: "Inter Variable", "Segoe UI", sans-serif;
  font-size: 17px;
  font-weight: 740;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: background-color 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.editing-page :deep(.editing-button:hover) {
  border-color: #8bc1ff;
  background: #238cf5;
  transform: translateY(-1px);
}

.editing-page :deep(a:focus-visible),
.editing-page :deep(button:focus-visible) {
  outline: 2px solid var(--editing-blue-bright);
  outline-offset: 4px;
}

@media (max-width: 720px) {
  .editing-page :deep(.editing-shell) {
    width: calc(100% - 40px);
  }

  .editing-page :deep(.editing-section) {
    padding-block: 88px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .editing-page :deep(*) {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
