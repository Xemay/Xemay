<script setup lang="ts">
const quotes = [
  'Just Do It.',
  'Think different.',
  'Long Way Up',
  'Everything is possible when you open your mind',
  'stay weird, be different',
  'Be limitless'
]

const footerQuote = ref(quotes[0])

onMounted(() => {
  footerQuote.value = quotes[Math.floor(Math.random() * quotes.length)]
})
</script>

<template>
  <footer class="bg-[#272729] pt-14 pb-[72px] text-[#cccccc]">
    <div class="page-shell grid grid-cols-3 gap-12 border-t border-white/15 pt-11 text-center max-[640px]:grid-cols-1 max-[640px]:gap-[30px]">
      <div class="flex flex-col items-center gap-1">
        <p class="text-white">Эльдар Сеттаров</p>
        <a href="https://xemay.dev">xemay.dev</a>
      </div>
      <div class="flex flex-col items-center gap-1">
        <a href="https://t.me/xemay4ik" target="_blank" rel="noopener noreferrer">
          Telegram: @xemay4ik
        </a>
        <a href="mailto:work@xemay.dev">Email: work@xemay.dev</a>
      </div>
      <div class="flex flex-col items-center gap-1">
        <blockquote class="max-w-[280px]  leading-relaxed text-[#a1a1a6]">
          «{{ footerQuote }}»
        </blockquote>
        <p>© 2026 Xemay</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
a {
  transition: color 180ms ease;
}

a:hover {
  color: var(--accent-dark);
  text-decoration: underline;
  text-underline-offset: 4px;
}
</style>
