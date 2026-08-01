<script setup lang="ts">
const websiteFeatures = [
  'Продающая структура под цели бизнеса',
  'Адаптивный дизайн в стиле вашего бренда',
  'Интеграция заявок, CRM и аналитики',
  'SEO-база, быстрая загрузка и поддержка',
]

const botFeatures = [
  'Приём заявок, оплат и уведомлений',
  'Сценарии под процессы вашего бизнеса',
  'Админ-панель и аналитика',
  'Интеграции с CRM и внешними сервисами',
]

const miniAppFeatures = [
  'Сервис или магазин внутри Telegram',
  'Удобный интерфейс без установки приложения',
  'Оплата, авторизация и личный кабинет',
  'Интеграция с API, CRM и базами данных',
]
</script>

<template>
  <section id="services" class="services section-block" aria-labelledby="services-title">
    <div class="page-shell">
      <div v-reveal class="section-heading">
        <h2 id="services-title">Сначала задача. Потом технология.</h2>
        <p>
          Не обязательно заранее знать, какой продукт вам нужен. Сначала определим цель и минимальный объём для запуска.
        </p>
      </div>

      <div class="services__grid">
        <article v-reveal class="service-card service-card--website">
          <header class="service-card__header">
            <h3>Сайт для бизнеса</h3>
            <p class="service-card__price">от 60 000 ₽<span>3-6 недель</span></p>
          </header>
          <p class="service-card__description">
              Собирает в одном месте услугу, примеры работ, ответы на вопросы и понятный путь до заявки.
          </p>
          <div class="service-card__visual">
            <NuxtPicture
              class="service-card__visual-backdrop"
              src="/images/service-site-option-03-hotel.png"
              alt=""
              width="740"
              height="463"
              sizes="350px md:620px lg:740px"
              format="avif,webp"
              loading="lazy"
              aria-hidden="true"
            />
            <NuxtPicture
              class="service-card__visual-foreground"
              src="/images/service-site-option-03-hotel.png"
              alt="Демонстрационный концепт сайта бутик-отеля"
              width="740"
              height="463"
              sizes="350px md:620px lg:740px"
              format="avif,webp"
              loading="lazy"
            />
          </div>
          <ul class="dash-list">
            <li v-for="feature in websiteFeatures" :key="feature">{{ feature }}</li>
          </ul>
        </article>

        <article v-reveal="'delay'" class="service-card service-card--bot">
          <h3>Чат-бот</h3>
          <p class="service-card__description">
            Автоматизирует рутинные действия, отвечает на частые вопросы, принимает оплату.
            <br/>Платформы: Telegram, VK, MAX
          </p>
          <p class="service-card__price">от 40 000 ₽<span>2-4 недели</span></p>
          <ul class="dash-list">
            <li v-for="feature in botFeatures" :key="feature">{{ feature }}</li>
          </ul>
        </article>

        <article v-reveal class="service-card service-card--miniapp">
          <h3>Telegram Mini App</h3>
          <p class="service-card__description">
            Полноценный интерфейс внутри Telegram, для каталога товаров, личного кабинета.
          </p>
          <p class="service-card__price">от 80 000 ₽<span>4-8 недель</span></p>
          <ul class="dash-list">
            <li v-for="feature in miniAppFeatures" :key="feature">{{ feature }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  background: var(--canvas-muted);
}

.services__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.86fr) minmax(340px, 1fr);
  grid-template-rows: 410px 440px;
  gap: 20px;
}

.service-card {
  overflow: hidden;
  border-radius: var(--radius-card);
  padding: 32px;
}

.service-card--website {
  grid-row: 1 / span 2;
  background: var(--canvas);
}

.service-card--bot {
  background: var(--surface-soft-blue);
}

.service-card--miniapp {
  background: var(--surface-dark);
  color: #ffffff;
}

.service-card__header {
  display: grid;
  grid-template-columns: 1fr auto;
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
  margin-top: 28px;
  color: var(--muted);
  font-size: 18px;
}

.service-card--miniapp .service-card__description,
.service-card--miniapp .dash-list {
  color: var(--muted-dark);
}

.service-card__visual {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  width: 100%;
  margin-top: 40px;
  border-radius: var(--radius-media);
  aspect-ratio: 19 / 10;
  background: #d8d8dc;
}

.service-card__visual-backdrop,
.service-card__visual-foreground {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
}

.service-card__visual-backdrop {
  inset: -20px;
}

.service-card__visual-foreground {
  z-index: 1;
}

.service-card__visual-backdrop :deep(img),
.service-card__visual-foreground :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
}

.service-card__visual-backdrop :deep(img) {
  object-fit: cover;
  filter: blur(18px) saturate(0.82);
  opacity: 0.68;
  transform: scale(1.08);
}

.service-card__visual-foreground :deep(img) {
  object-fit: contain;
}

.dash-list {
  display: grid;
  gap: 16px;
  margin: 34px 0 0;
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

.service-card--bot h3,
.service-card--miniapp h3 {
  font-size: 30px;
}

.service-card--bot .service-card__description,
.service-card--miniapp .service-card__description {
  margin-top: 18px;
  font-size: 16px;
}

.service-card--bot .service-card__price,
.service-card--miniapp .service-card__price {
  margin-top: 24px;
}

.service-card--bot .dash-list,
.service-card--miniapp .dash-list {
  gap: 10px;
  margin-top: 20px;
  font-size: 14px;
  line-height: 1.4;
}

@media (max-width: 1068px) {
  .services__grid {
    grid-template-columns: minmax(0, 1.55fr) minmax(320px, 1fr);
  }

  .service-card {
    padding: 28px;
  }
}

@media (max-width: 833px) {
  .services__grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .service-card--website {
    grid-row: auto;
  }

  .service-card--bot,
  .service-card--miniapp {
    min-height: 420px;
  }
}

@media (max-width: 640px) {
  .service-card {
    padding: 24px;
  }

  .service-card__header {
    grid-template-columns: 1fr;
  }

  .service-card h3,
  .service-card--bot h3,
  .service-card--miniapp h3 {
    font-size: 28px;
  }

  .service-card__price {
    margin-top: 0;
    font-size: 18px;
  }

  .service-card__description {
    margin-top: 20px;
    font-size: 16px;
  }

  .service-card__visual {
    margin-top: 30px;
  }

  .service-card--bot,
  .service-card--miniapp {
    min-height: 0;
  }
}
</style>
