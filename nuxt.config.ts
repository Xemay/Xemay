import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-07-31',
  ssr: true,
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/icon', '@nuxt/content'],
  css: ['@fontsource-variable/inter/wght.css', '~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      link: [
        { key: 'canonical', rel: 'canonical', href: 'https://xemay.dev/' },
      ],
      meta: [
        { name: 'theme-color', content: '#f5f5f7' },
        { name: 'color-scheme', content: 'light' },
      ],
    },
  },
  icon: {
    provider: 'none',
    clientBundle: {
      scan: true,
      icons: [
        'ph:list',
        'ph:x',
        'ph:caret-left',
        'ph:caret-right',
        'ph:arrow-up-right',
        'ph:copy',
        'ph:check',
      ],
    },
  },
  image: {
    format: ['avif', 'webp'],
    quality: 82,
  },
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ['/', '/privacy'],
    },
  },
  typescript: {
    typeCheck: true,
  },
})
