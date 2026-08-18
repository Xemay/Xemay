<script setup lang="ts">
const steps = [
  {
    number: '01',
    title: 'Погружение',
    duration: 'до 1 недели',
    image: '/images/process-discovery.png',
    alt: 'Объёмное рукопожатие на ярком абстрактном фоне',
    description:
      'Обсуждаем задачу, аудиторию и ограничения. Я задаю вопросы, собираю материалы и предлагаю формат, который подходит проекту.',
  },
  {
    number: '02',
    title: 'Дизайн',
    duration: '1-2 недели',
    image: '/images/process-design.png',
    alt: 'Объёмная кисть и палитра на ярком абстрактном фоне',
    description:
      'Собираю структуру и показываю макеты в Figma.',
  },
  {
    number: '03',
    title: 'Разработка',
    duration: '1-3 недели',
    image: '/images/process-development.png',
    alt: 'Объёмный ноутбук со знаком кода на ярком абстрактном фоне',
    description:
      'Превращаю макет в рабочий продукт, подключаю нужные сервисы и запускаю на тестовом адресе. Раз в неделю показываю рабочую версию.',
  },
  {
    number: '04',
    title: 'Запуск',
    duration: 'до 1 недели',
    image: '/images/process-launch.png',
    alt: 'Объёмная ракета на ярком абстрактном фоне',
    description:
      'Тестирую проект на разных устройствах, подключаю домен и аналитику. После запуска оказываю поддержку.',
  },
]
</script>

<template>
  <section id="process" class="process section-block" aria-labelledby="process-title">
    <div class="page-shell">
      <div v-reveal class="section-heading process__heading">
        <h2 id="process-title">Как происходит работа со мной</h2>
        <p>Вы видите результат на каждом этапе. Я всегда на связи, чтобы ответить на любые вопросы.</p>
      </div>

      <div class="process__viewport">
        <div class="process__grid">
          <article
            v-for="(step, index) in steps"
            :key="step.title"
            v-reveal="index > 0 ? 'early-delay' : undefined"
            class="process-card"
          >
            <div class="process-card__visual">
              <NuxtPicture
                :src="step.image"
                :alt="step.alt"
                width="1254"
                height="1254"
                sizes="280px md:300px lg:320px"
                format="avif,webp"
                loading="lazy"
              />
              <span class="process-card__number" aria-hidden="true">{{ step.number }}</span>
            </div>

            <header class="process-card__header">
              <h3>{{ step.title }}</h3>
              <span>{{ step.duration }}</span>
            </header>
            <p class="process-card__description">{{ step.description }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process {
  overflow: hidden;
  background: var(--canvas-muted);
}

.process__heading {
  margin-bottom: 48px;
}

.process__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.process-card {
  min-width: 0;
}

.process-card__visual {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-card);
  aspect-ratio: 1;
  background: #dedee3;
}

.process-card__visual :deep(picture),
.process-card__visual :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
}

.process-card__visual :deep(img) {
  object-fit: cover;
  transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
}

.process-card:hover .process-card__visual :deep(img) {
  transform: scale(1.035);
}

.process-card__number {
  position: absolute;
  top: 16px;
  left: 16px;
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 0.5px solid rgb(255 255 255 / 62%);
  border-radius: 999px;
  background: rgb(255 255 255 / 58%);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 70%),
    0 6px 18px rgb(29 29 31 / 14%);
  color: #e8e6e6;
  font-size: 13px;
  font-weight: 600;
  text-shadow: 0 1px 3px rgb(29 29 31 / 28%);
  -webkit-backdrop-filter: blur(14px) saturate(145%);
  backdrop-filter: blur(14px) saturate(145%);
}

.process-card__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;
}

.process-card__header h3 {
  font-size: clamp(22px, 2vw, 28px);
}

.process-card__header span {
  flex: none;
  color: var(--muted);
  font-size: 14px;
  white-space: nowrap;
}

.process-card__description,
.process-card__result {
  color: var(--muted);
  font-size: 15px;
  line-height: 1.5;
}

.process-card__description {
  margin-top: 16px;
}

.process-card__result {
  margin-top: 14px;
  color: var(--ink);
  font-weight: 500;
}

@media (max-width: 1068px) {
  .process__viewport {
    overflow-x: auto;
    padding-bottom: 12px;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
  }

  .process__viewport::-webkit-scrollbar {
    display: none;
  }

  .process__grid {
    grid-template-columns: repeat(4, minmax(280px, 36vw));
    width: max-content;
  }

  .process-card {
    scroll-snap-align: start;
  }
}

@media (max-width: 640px) {
  .process__heading {
    margin-bottom: 34px;
  }

  .process__grid {
    grid-template-columns: repeat(4, minmax(290px, 82vw));
    gap: 14px;
  }

  .process-card__header {
    margin-top: 20px;
  }

  .process-card__header h3 {
    font-size: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .process-card__visual :deep(img) {
    transition: none;
  }
}
</style>
