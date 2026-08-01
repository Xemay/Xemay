<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const isNotFound = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: () => isNotFound.value ? 'Страница не найдена | Эльдар Сеттаров' : 'Что-то пошло не так | Эльдар Сеттаров',
  robots: 'noindex, nofollow',
})

function returnHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="error-page">
    <SiteHeader />
    <main class="page-shell error-page__main">
      <div class="error-page__content">
        <p class="error-page__code">{{ isNotFound ? '404' : error.statusCode }}</p>
        <h1>{{ isNotFound ? 'Такой страницы нет' : 'Не получилось открыть страницу' }}</h1>
        <p>
          {{ isNotFound
            ? 'Возможно, адрес изменился или в ссылке есть ошибка.'
            : 'Попробуйте вернуться на главную и повторить действие позже.' }}
        </p>
        <button type="button" class="button button--primary" @click="returnHome">
          На главную
        </button>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.error-page {
  display: grid;
  min-height: 100dvh;
  grid-template-rows: auto 1fr auto;
  background: var(--canvas-muted);
}

.error-page__main {
  display: grid;
  min-height: min(680px, calc(100dvh - 128px));
  place-items: center;
  padding-block: 72px;
}

.error-page__content {
  display: grid;
  max-width: 660px;
  justify-items: start;
  gap: 24px;
}

.error-page__code {
  color: var(--accent);
  font-size: 17px;
  font-weight: 600;
}

.error-page h1 {
  font-size: clamp(44px, 7vw, 76px);
  line-height: 1.02;
}

.error-page__content > p:not(.error-page__code) {
  max-width: 540px;
  color: var(--muted);
  font-size: 20px;
}

.error-page .button {
  margin-top: 8px;
}

@media (max-width: 640px) {
  .error-page__main {
    min-height: 560px;
    padding-block: 52px;
  }

  .error-page h1 {
    font-size: 42px;
  }

  .error-page__content > p:not(.error-page__code) {
    font-size: 18px;
  }
}
</style>
