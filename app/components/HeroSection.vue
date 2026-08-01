<template>
  <section class="hero page-shell" aria-labelledby="hero-title">
    <div class="hero__content">
      <h1 id="hero-title" class="hero__title">
        Цифровые решения для роста бизнеса и личного бренда
      </h1>
      <p class="hero__lead">
          Разрабатываю сайты, Telegram-ботов и Mini Apps для экспертов и бизнесов.
      </p>
      <div class="hero__actions">
        <TelegramButton />
        <a class="button button--secondary" href="#audit">Получить мини-аудит</a>
      </div>
    </div>

    <div class="hero__media" aria-hidden="true">
      <NuxtPicture
        src="/images/hero-option-01-laptop-website.png"
        alt=""
        width="480"
        height="650"
        sizes="350px md:420px lg:480px"
        format="avif,webp"
        :preload="{ fetchPriority: 'high' }"
        :img-attrs="{
          class: 'hero__image',
          loading: 'eager',
          decoding: 'async',
          fetchpriority: 'high',
        }"
      />
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  min-height: min(896px, calc(100dvh - var(--header-height)));
  grid-template-columns: minmax(0, 1.08fr) minmax(480px, 0.92fr);
  align-items: center;
  gap: 32px;
  overflow: hidden;
}

.hero__content {
  position: relative;
  z-index: 1;
  max-width: 720px;
  padding-left: 40px;
  animation: hero-enter 800ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero__title {
  max-width: 700px;
  font-size: clamp(48px, 4vw, 58px);
  line-height: 1.08;
}

.hero__lead {
  max-width: 570px;
  margin-top: 38px;
  color: var(--muted);
  font-size: 20px;
  line-height: 1.45;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 64px;
}

.hero__media {
  display: grid;
  height: clamp(440px, 58vh, 540px);
  min-height: 0;
  place-items: center;
  animation: hero-media-enter 900ms 100ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero__media :deep(picture) {
  display: block;
  overflow: hidden;
  width: min(100%, 620px);
  height: 100%;
  border-radius: 24px;
}

.hero__media :deep(.hero__image) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

@keyframes hero-media-enter {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 1068px) {
  .hero {
    grid-template-columns: minmax(0, 1.15fr) minmax(440px, 0.85fr);
  }

  .hero__content {
    padding-left: 20px;
  }

  .hero__title {
    font-size: 46px;
  }
}

@media (max-width: 833px) {
  .hero {
    min-height: 0;
    grid-template-columns: 1fr;
    gap: 42px;
    padding-block: 76px 30px;
  }

  .hero__content {
    max-width: none;
    padding-left: 0;
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

  .hero__media {
    width: 100%;
    height: auto;
    min-height: 0;
    aspect-ratio: 4 / 3;
  }

  .hero__media :deep(picture) {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .hero {
    gap: 38px;
    padding-top: 70px;
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

  .hero__media {
    aspect-ratio: 4 / 3;
  }
}

@media (max-width: 419px) {
  .hero__title {
    font-size: 30px;
  }
}
</style>
