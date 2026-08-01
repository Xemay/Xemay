<script setup lang="ts">
import { withBase } from 'ufo'

const runtimeConfig = useRuntimeConfig()
const publicAsset = (path: string) => withBase(path, runtimeConfig.app.baseURL)

useHead({
  link: [
    { rel: 'icon', href: publicAsset('/favicon.svg'), type: 'image/svg+xml' },
    { rel: 'icon', href: publicAsset('/favicon-16x16.png'), type: 'image/png', sizes: '16x16' },
    { rel: 'icon', href: publicAsset('/favicon-32x32.png'), type: 'image/png', sizes: '32x32' },
    { rel: 'icon', href: publicAsset('/favicon-48x48.png'), type: 'image/png', sizes: '48x48' },
    { rel: 'apple-touch-icon', href: publicAsset('/apple-touch-icon.png'), sizes: '180x180' },
    { rel: 'manifest', href: publicAsset('/site.webmanifest') },
  ],
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>
