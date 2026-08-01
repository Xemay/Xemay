<script setup lang="ts">
type FaqItem = {
  id: number
  question: string
  answer: string
}

const faq: FaqItem[] = [
  {
    id: 1,
    question: 'Зачем мне сайт, если меня рекомендуют или есть ТГ канал',
    answer: 'Рекомендации создают доверие, но сайт помогает быстро понять предложение и оставить заявку, не ища информацию в разных местах'
  },
  {
    id: 2,
    question: 'Что делать, если нет технического задания?',
    answer: 'Это нормально. Начнём с задачи и ограничений, затем оформим согласованный сценарий и понятный состав работ.',
  },
  {
    id: 3,
    question: 'Что делать, если нет структуры и текстов?',
    answer: 'Определим, какие материалы уже есть и что нужно подготовить. Помощь со структурой и текстами отдельно фиксируется в составе проекта.',
  },
  {
    id: 4,
    question: 'Сколько правок входит?',
    answer: 'Число мелких правок неограниченно в течение разработки и до 30 дней после запуска проекта. Средние и большие изменения обговариваются и оцениваются отдельно.',
  },
  {
    id: 5,
    question: 'Можно ли начать с небольшой версии?',
    answer: 'Да. Сначала можно запустить минимальный рабочий объём, проверить результат и только потом добавлять новые функции.',
  },
  {
    id: 8,
    question: 'Кто оплачивает хостинг и сервисы?',
    answer: 'Аккаунты внешних сервисов и регулярные платежи оформляются на клиента. Возможные расходы обговариваем заранее.',
  },
  {
    id: 9,
    question: 'Кому принадлежат домен, код и доступы?',
    answer: 'После полной оплаты клиент получает исходный код проекта, доступы и инструкции. Внешние аккаунты сразу регистрируем на клиента.',
  },
  {
    id: 10,
    question: 'Что происходит после запуска?',
    answer: 'Я передаю продукт, доступы и инструкции. Затем действует согласованный период исправления ошибок в реализованной функциональности.',
  },
  {
    id: 11,
    question: 'Что входит в период 30-дневной гарантии?',
    answer: 'Исправляю ошибки и недоработки в существуем функционале(если такие найдутся). Новые функции и изменение логики оцениваются отдельно.',
  },
  {
    id: 12,
    question: 'Можно ли добавлять функции по ходу?',
    answer: 'Можно, но сначала оценивается влияние на стоимость и срок. Изменения добавляются только после согласования.',
  },
  {
    id: 13,
    question: 'Когда готовое решение разумнее разработки?',
    answer: 'Когда задача стандартная, бюджет ограничен и готовый инструмент закрывает основной сценарий без критичных компромиссов. Если готовое решение подойдет лучше, я скажу вам об этом.',
  },
]

const openId = ref<number | null>(null)
const columns = computed(() => [faq.slice(0, 7), faq.slice(7)])

function toggle(id: number) {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <section id="faq" class="faq section-block" aria-labelledby="faq-title">
    <div class="page-shell">
      <div v-reveal class="section-heading">
        <h2 id="faq-title">Частые вопросы</h2>
        <p>Коротко про процесс разработки и запуск проекта.</p>
      </div>

      <div class="faq__columns">
        <div v-for="(column, index) in columns" :key="index" class="faq__viewport">
          <article v-for="item in column" :key="item.id" class="faq-item">
            <button
              type="button"
              :id="`faq-question-${item.id}`"
              :aria-expanded="openId === item.id"
              :aria-controls="`faq-answer-${item.id}`"
              @click="toggle(item.id)"
            >
              <span>{{ item.question }}</span>
              <span class="faq-item__symbol" aria-hidden="true">
                {{ openId === item.id ? '−' : '+' }}
              </span>
            </button>
            <div
              :id="`faq-answer-${item.id}`"
              class="faq-item__answer"
              :class="{ 'is-open': openId === item.id }"
              :aria-hidden="openId !== item.id"
              :aria-labelledby="`faq-question-${item.id}`"
              role="region"
            >
              <div class="faq-item__answer-inner">
                <p>{{ item.answer }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  background: var(--canvas);
}

.faq__columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 80px;
}

.faq__viewport {
  min-width: 0;
}

.faq-item {
  border-top: 1px solid var(--hairline);
}

.faq-item:last-child {
  border-bottom: 1px solid var(--hairline);
}

.faq-item > button {
  display: grid;
  width: 100%;
  min-height: 78px;
  grid-template-columns: 1fr 34px;
  align-items: center;
  gap: 20px;
  border: 0;
  padding: 18px 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: color 180ms ease;
}

.faq-item > button:hover {
  color: var(--accent);
}

.faq-item__symbol {
  color: var(--accent);
  font-size: 27px;
  font-weight: 300;
  line-height: 1;
  text-align: center;
}

.faq-item__answer {
  display: grid;
  overflow: hidden;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease;
}

.faq-item__answer.is-open {
  grid-template-rows: 1fr;
  opacity: 1;
}

.faq-item__answer-inner {
  min-height: 0;
  overflow: hidden;
}

.faq-item__answer p {
  max-width: 62ch;
  padding: 0 42px 24px 0;
  color: var(--muted);
  font-size: 15px;
}

@media (max-width: 833px) {
  .faq__columns {
    display: block;
  }

  .faq__viewport {
    min-width: 0;
  }

  .faq__viewport + .faq__viewport .faq-item:first-child {
    border-top: 0;
  }
}

@media (max-width: 640px) {
  .faq__columns {
    height: auto;
  }

  .faq-item > button {
    min-height: 72px;
    font-size: 15px;
  }
}
</style>
