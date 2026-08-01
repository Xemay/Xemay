<template>
  <section class="final-cta section-block bg-[#272729] text-[#f5f5f7]" aria-labelledby="final-title">
    <div v-reveal class="final-cta__inner page-shell grid place-items-center content-center gap-7 text-center">
      <h2 id="final-title" class="max-w-[980px]">Расскажите о проблеме. Я предложу разумный первый шаг.</h2>
      <p class="text-[#cccccc]">Можно начать сообщением. Созвон не обязателен.</p>
      <TelegramButton />
    </div>
  </section>
</template>

<style scoped>
.final-cta {
  padding-bottom: 44px;
}

.final-cta__inner {
  min-height: 260px;
}

@media (max-width: 640px) {
  .final-cta {
    padding-bottom: 32px;
  }

  .final-cta__inner {
    min-height: 300px;
  }
}
</style>
