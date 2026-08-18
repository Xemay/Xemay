<script setup lang="ts">
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap',
    },
  ],
})
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__strands" aria-hidden="true">

    </div>
    <div class="hero__glow" aria-hidden="true" />
    <div class="hero__inner page-shell">
      <div class="hero__content">
        <h1 id="hero-title" class="hero__title">
          Сайты для экспертов, которые <br>
          <span class="hero__title-accent">продают</span> через контент
        </h1>
        <p class="hero__lead">
            Собираю ваши услуги, кейсы и отзывы в цельную страницу, которая проводит человека от первой встречи до заявки
        </p>
        <div class="hero__actions">
          <TelegramButton />
          <a class="button button--secondary" href="#cases">Примеры работ</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  min-height: min(896px, calc(100dvh - var(--header-height)));
  align-items: center;
  overflow: hidden;
  isolation: isolate;
  background: #050506;
  color: #f5f5f7;
}

.hero__glow {
  position: absolute;
  z-index: 0;
  inset: 0;
  background:
    radial-gradient(circle at 50% 50%, rgb(51 112 255 / 0.1), transparent 42%),
    linear-gradient(90deg, rgb(5 5 6 / 0.42), rgb(5 5 6 / 0.08) 50%, rgb(5 5 6 / 0.42));
  pointer-events: none;
}

.hero__strands {
  position: absolute;
  z-index: 0;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hero__inner {
  position: relative;
  z-index: 1;
  display: flex;
  min-height: inherit;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.hero__content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 920px;
  text-align: center;
  animation: hero-enter 800ms cubic-bezier(0.16, 1, 0.3, 1) both;
  pointer-events: auto;
}

.hero__title {
  max-width: 900px;
  margin-inline: auto;
  font-size: clamp(48px, 4vw, 58px);
  line-height: 1.08;
}

.hero__title-accent {
  color: #e1f6ff;
  font-family: "Inter Tight", Georgia, serif;
  font-size: 1.05em;
  font-style: italic;
  font-weight: 600;
  letter-spacing: -0.035em;
  text-shadow:
    0 0 18px rgb(91 202 255 / 0.38),
    0 0 42px rgb(41 151 255 / 0.2);
}

.hero__lead {
  max-width: 570px;
  margin: 38px auto 0;
  color: #c5c5c9;
  font-size: 20px;
  line-height: 1.45;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 18px;
  margin-top: 64px;
}

.hero__actions .button--secondary {
  border-color: #6e6e73;
  color: #f5f5f7;
  background: rgb(255 255 255 / 0.03);
}

.hero__actions .button--secondary:hover {
  border-color: #a1a1a6;
  background: rgb(255 255 255 / 0.09);
}

@keyframes hero-enter {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1068px) {
  .hero__title {
    font-size: 46px;
  }
}

@media (max-width: 833px) {
  .hero {
    min-height: min(760px, calc(100dvh - var(--header-height)));
  }

  .hero__content {
    max-width: none;
  }

  .hero__title {
    max-width: 650px;
    font-size: clamp(38px, 7vw, 48px);
  }

  .hero__lead {
    margin-top: 26px;
  }

  .hero__actions {
    margin-top: 38px;
  }

  .hero__glow {
    background:
      radial-gradient(circle at 50% 48%, rgb(51 112 255 / 0.08), transparent 52%),
      linear-gradient(180deg, rgb(5 5 6 / 0.12), rgb(5 5 6 / 0.34));
  }

  .hero__strands :deep(.custom-rays) {
    filter: brightness(1.65) saturate(1.2);
  }
}

@media (max-width: 640px) {
  .hero {
    min-height: calc(100svh - var(--header-height));
  }

  .hero__title {
    font-size: 34px;
    line-height: 1.08;
  }

  .hero__lead {
    font-size: 17px;
  }

  .hero__actions {
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 34px;
  }

  .hero__actions :deep(.button) {
    width: 100%;
  }

}

@media (max-width: 419px) {
  .hero__title {
    font-size: 30px;
  }
}
</style>
