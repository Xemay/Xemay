<script setup lang="ts">
const businessCardFeatures = [
  'Бриф, анализ аудитории и конкурентов',
  'Структура страницы и тексты',
  'Уникальный дизайн и адаптивная вёрстка',
  'Форма заявки, базовое SEO, аналитика и запуск',
]

const productFeatures = [
  'Разбор продукта, аудитории и сценария покупки',
  'Программа, тарифы, кейсы и ответы на вопросы',
  'Уникальный дизайн и адаптивная вёрстка',
  'Форма или оплата, рассылка, аналитика и запуск',
]

const automationFeatures = [
  'Telegram-бот под конкретный сценарий',
  'Заявки, оплаты, уведомления и выдача материалов',
  'Выдача материалов и доступов внутри Telegram',
  'Интеграции с CRM, API и базами данных',
]
</script>

<template>
  <section id="services" class="services section-block" aria-labelledby="services-title">
    <div class="page-shell">
      <div v-reveal class="section-heading">
        <h2 id="services-title">Услуги</h2>
        <p>
         Свой формат под каждую задачу
        </p>
      </div>

      <div class="services__grid">
        <article v-reveal class="service-card service-card--site service-card--business-card">
          <header class="service-card__header">
            <h3>Сайт-визитка</h3>
            <p class="service-card__price">от 60 000 ₽<span>от 14 дней</span></p>
          </header>
          <p class="service-card__description">
            Для эксперта, который продаёт консультации или услуги. На одной странице человек поймёт, чем вы можете помочь, увидит примеры и сможет оставить заявку.
          </p>
          <div class="service-card__visual">
            <NuxtPicture
              class="service-card__visual-backdrop"
              src="/images/service-personal-trainer.png"
              alt=""
              width="900"
              sizes="320px md:540px"
              format="avif,webp"
              loading="lazy"
              aria-hidden="true"
            />
            <NuxtPicture
              class="service-card__visual-image"
              src="/images/service-personal-trainer.png"
              alt="Демонстрационный концепт сайта персонального фитнес-тренера"
              width="900"
              sizes="320px md:540px"
              format="avif,webp"
              loading="lazy"
            />
          </div>
          <ul class="dash-list">
            <li v-for="feature in businessCardFeatures" :key="feature">{{ feature }}</li>
          </ul>
        </article>

        <article v-reveal="'delay'" class="service-card service-card--site service-card--product">
          <header class="service-card__header">
            <h3>Продуктовый сайт</h3>
            <p class="service-card__price">от 60 000 ₽<span>от 21 дня</span></p>
          </header>
          <p class="service-card__description">
            Для курса, консультации, практикума или другого продукта эксперта. Человек поймёт ценность предложения, выберет формат и оставит заявку или оплатит участие.
          </p>
          <div class="service-card__visual">
            <NuxtPicture
              class="service-card__visual-image"
              src="/images/service-product-site-editing.png"
              alt="Дизайн-концепт продуктового сайта марафона по видеомонтажу"
              width="1440"
              height="900"
              sizes="320px md:540px"
              format="avif,webp"
              loading="lazy"
            />
          </div>
          <ul class="dash-list">
            <li v-for="feature in productFeatures" :key="feature">{{ feature }}</li>
          </ul>
        </article>

        <article v-reveal class="service-card service-card--automation">
          <header class="service-card__header">
            <div>
              <p class="service-card__eyebrow">Чат-боты</p>
              <h3>Автоматизация</h3>
            </div>
            <p class="service-card__price">от 15 000 ₽<span>от 7 дней</span></p>
          </header>
          <div class="service-card__automation-body">
            <p class="service-card__description">
              Если есть много ручной работы. Бот возьмёт на себя оплату, выдачу материалов и доступов, ответы на частые вопросы и уведомления.
            </p>
            <ul class="dash-list">
              <li v-for="feature in automationFeatures" :key="feature">{{ feature }}</li>
            </ul>
          </div>
        </article>
      </div>

      <p v-reveal class="services__custom-request">
        Не нашли подходящий вариант?
        <a href="https://t.me/xemay4ik">Напишите мне</a>, обсудим вашу задачу отдельно.
      </p>
    </div>
  </section>
</template>

<style scoped>
.services {
  background: var(--canvas-muted);
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 20px;
}

.service-card {
  overflow: hidden;
  border-radius: var(--radius-card);
  padding: 32px;
}

.service-card--site {
  display: flex;
  flex-direction: column;
  background: var(--canvas);
}

.service-card--product {
  background: var(--surface-soft-blue);
}

.service-card--automation {
  grid-column: 1 / -1;
  background: var(--surface-dark);
  color: #ffffff;
}

.service-card__header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.service-card h3 {
  font-size: 32px;
}

.service-card__price {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
}

.service-card__price span {
  display: block;
}

.service-card__description {
  max-width: 640px;
  margin-top: 24px;
  color: var(--muted);
  font-size: 17px;
}

.service-card--site .service-card__description {
  min-height: 6em;
}

.service-card__eyebrow {
  margin-bottom: 8px;
  color: var(--accent-dark);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.service-card--automation .service-card__description,
.service-card--automation .dash-list {
  color: var(--muted-dark);
}

.service-card__visual {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  width: 100%;
  margin-top: 20px;
  border-radius: var(--radius-media);
  aspect-ratio: 3 / 2;
  background: #111317;
}

.service-card__visual-backdrop {
  position: absolute;
  z-index: 0;
  inset: -20px;
  display: block;
}

.service-card__visual-backdrop :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(20px) brightness(0.68) saturate(0.82);
  transform: scale(1.08);
}

.service-card__visual-image {
  position: absolute;
  z-index: 1;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
}

.service-card__visual-image :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.dash-list {
  display: grid;
  gap: 14px;
  margin: 30px 0 0;
  padding: 0;
  color: var(--ink);
  list-style: none;
}

.dash-list li {
  position: relative;
  padding-left: 28px;
}

.dash-list li::before {
  position: absolute;
  top: 0.72em;
  left: 0;
  width: 14px;
  height: 2px;
  background: var(--accent);
  content: "";
}

.service-card__automation-body {
  display: grid;
  grid-template-columns: minmax(280px, 0.75fr) minmax(0, 1.25fr);
  gap: 48px;
  align-items: start;
}

.service-card--automation .service-card__description {
  margin-top: 28px;
}

.service-card--automation .dash-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 28px;
  margin-top: 28px;
  font-size: 15px;
}

.services__custom-request {
  margin: 28px 0 0;
  color: var(--muted);
  font-size: 18px;
  text-align: center;
}

.services__custom-request a {
  color: var(--accent);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
}

.services__custom-request a:hover {
  color: var(--accent-focus);
}

@media (max-width: 1280px) {
  .services__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .service-card {
    padding: 28px;
  }

  .service-card__header {
    grid-template-columns: 1fr;
  }

  .service-card__price {
    margin-top: 0;
  }
}

@media (max-width: 833px) {
  .services__grid {
    grid-template-columns: 1fr;
  }

  .service-card--automation {
    grid-column: auto;
  }

  .service-card__header {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .service-card__automation-body {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .service-card--site .service-card__description {
    min-height: 0;
  }

}

@media (max-width: 640px) {
  .service-card {
    padding: 24px;
  }

  .service-card__header {
    grid-template-columns: 1fr;
  }

  .service-card h3 {
    font-size: 28px;
  }

  .service-card__price {
    font-size: 18px;
  }

  .service-card__description {
    margin-top: 20px;
    font-size: 16px;
  }

  .service-card__visual {
    margin-top: 20px;
  }

  .service-card--automation .dash-list {
    grid-template-columns: 1fr;
  }
}
</style>
