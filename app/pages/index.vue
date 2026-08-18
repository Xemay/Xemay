<script setup lang="ts">
useSeoMeta({
  title: 'Сайты и Telegram-боты для бизнеса | Эльдар Сеттаров',
  description:
    'Разработка цифровых продуктов под ключ: от идеи до запуска.',
  ogTitle: 'Эльдар Сеттаров. Сайты и Telegram-продукты для бизнеса',
  ogDescription:
    'Разработка цифровых продуктов под ключ: от идеи до запуска.',
  ogImage: 'https://xemay.dev/images/og/og-development-eldar-settarov.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Разработка сайтов и Telegram-продуктов. Эльдар Сеттаров',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xemay.dev/images/og/og-development-eldar-settarov.png',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Эльдар Сеттаров',
        url: 'https://xemay.dev',
        email: 'mailto:work@xemay.dev',
        sameAs: ['https://t.me/xemay4ik'],
        jobTitle: 'Независимый веб-разработчик',
      }),
    },
  ],
})
</script>

<template>
  <div>
    <SiteHeader />
    <main>
      <HeroSection />
      <ServicesSection />
      <CasesCarousel />
      <PromiseSection />
      <ProcessSection />
      <FaqSection />
      <FinalCta />
    </main>
    <SiteFooter />
  </div>
</template>
