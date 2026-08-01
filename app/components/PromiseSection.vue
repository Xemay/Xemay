<script setup lang="ts">
const promises = [
  {
    title: 'Рабочая версия каждую неделю',
    text: 'Показываю прогресс вживую, не на словах.',
  },
  {
    title: 'Код и доступы у клиента',
    text: 'После полной оплаты передаю исходный код с документацией и инструкциями.',
  },
  {
    title: 'Оплата 50/50',
    text: 'Половина перед стартом, половина перед передачей и запуском.',
  },
  {
    title: '30 дней исправлений',
    text: 'Ошибки в обговоренном функционале исправляются после запуска.',
  },
]
</script>

<template>
  <section class="section-block bg-white" aria-labelledby="promise-title">
    <div class="page-shell">
      <div v-reveal class="section-heading section-heading--large">
        <h2 id="promise-title">Без сюрпризов.</h2>
        <p>
          До старта фиксируем объём, стоимость и срок. По ходу работы вы регулярно видите рабочую версию.
        </p>
      </div>
      <div class="grid grid-cols-2 gap-x-20 max-[833px]:grid-cols-1">
        <article
          v-for="item in promises"
          :key="item.title"
          v-reveal
          class="grid grid-cols-[minmax(190px,0.8fr)_minmax(0,1.2fr)] gap-7 border-t border-[#d9d9de] pt-6 pb-[34px] max-[640px]:grid-cols-1 max-[640px]:gap-2.5"
        >
          <h3 class="text-[21px]">{{ item.title }}</h3>
          <p class="text-base text-[#6e6e73]">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
