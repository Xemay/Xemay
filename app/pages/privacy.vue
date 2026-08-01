<script setup lang="ts">
useSeoMeta({
  title: 'Политика обработки данных | Xemay',
  description: 'Информация об обработке данных на сайте Xemay.',
  robots: 'noindex, follow',
})

useHead({
  link: [
    {
      key: 'canonical',
      rel: 'canonical',
      href: 'https://xemay.dev/privacy',
    },
  ],
})
</script>

<template>
  <div class="min-h-[100dvh] bg-[#f5f5f7]">
    <header class="flex min-h-16 items-center justify-between bg-black px-[max(20px,calc((100vw-1120px)/2))] text-white max-[640px]:gap-5 max-[640px]:text-sm">
      <NuxtLink to="/">Эльдар Сеттаров</NuxtLink>
      <NuxtLink to="/">Вернуться на главную</NuxtLink>
    </header>
    <main class="mx-auto w-[min(820px,calc(100%-40px))] py-[100px]">
      <h1 class="text-[clamp(42px,6vw,64px)] leading-[1.02]">Политика обработки данных</h1>
      <p class="mt-[22px] text-[#6e6e73]">
        Полная юридическая редакция документа должна быть подтверждена владельцем сайта перед публикацией.
      </p>
      <h2 class="mt-14 text-[28px]">Что происходит сейчас</h2>
      <p class="mt-[22px] text-[#6e6e73]">
        Форма мини-аудита не отправляет данные на сервер и не сохраняет их на сайте. Она формирует текст сообщения и открывает Telegram.
      </p>
      <h2 class="mt-14 text-[28px]">Контакт</h2>
      <p class="mt-[22px] text-[#6e6e73]">
        По вопросам обработки данных напишите на
        <a class="text-[#0066cc] underline underline-offset-4" href="mailto:work@xemay.dev">work@xemay.dev</a>.
      </p>
    </main>
  </div>
</template>
