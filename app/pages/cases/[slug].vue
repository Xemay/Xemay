<script setup lang="ts">
import { getCaseImages } from '~/utils/caseGallery'

const route = useRoute()

const { data: caseItem } = await useAsyncData(route.path, () => {
  return queryCollection('cases').path(route.path).first()
})

if (!caseItem.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Кейс не найден',
  })
}

const categoryLabels = {
  sites: 'Сайты',
  bots: 'Чат-боты',
  miniapps: 'Mini Apps',
} as const

const categoryLabel = computed(() => {
  return caseItem.value ? categoryLabels[caseItem.value.category] : ''
})

const caseImages = computed(() => {
  if (!caseItem.value) return []
  return getCaseImages(caseItem.value)
})

const coverImage = computed(() => caseImages.value[0])
const galleryTrack = ref<HTMLElement | null>(null)
const canScrollPrevious = ref(false)
const canScrollNext = ref(false)
let galleryResizeObserver: ResizeObserver | null = null

function updateGalleryState() {
  if (!galleryTrack.value) {
    canScrollPrevious.value = false
    canScrollNext.value = false
    return
  }

  const maxScrollLeft = Math.max(0, galleryTrack.value.scrollWidth - galleryTrack.value.clientWidth)
  canScrollPrevious.value = galleryTrack.value.scrollLeft > 2
  canScrollNext.value = galleryTrack.value.scrollLeft < maxScrollLeft - 2
}

function scrollGallery(direction: 1 | -1) {
  if (!galleryTrack.value) return
  const slide = galleryTrack.value.querySelector<HTMLElement>('.case-page__media')
  const gap = Number.parseFloat(getComputedStyle(galleryTrack.value).columnGap) || 0
  const distance = (slide?.offsetWidth ?? galleryTrack.value.clientWidth) + gap
  galleryTrack.value.scrollBy({ left: distance * direction, behavior: 'smooth' })
}

onMounted(async () => {
  galleryResizeObserver = new ResizeObserver(updateGalleryState)
  await nextTick()
  if (galleryTrack.value) galleryResizeObserver.observe(galleryTrack.value)
  updateGalleryState()
})

onBeforeUnmount(() => galleryResizeObserver?.disconnect())

const canonicalUrl = computed(() => `https://xemay.dev${route.path}`)
const socialImage = computed(() => {
  return coverImage.value ? `https://xemay.dev${coverImage.value.src}` : undefined
})

useSeoMeta({
  title: () => `${caseItem.value?.title ?? 'Кейс'} | Эльдар Сеттаров`,
  description: () => caseItem.value?.description,
  ogTitle: () => caseItem.value?.title,
  ogDescription: () => caseItem.value?.description,
  ogImage: 'https://xemay.dev/images/og/og-development-eldar-settarov.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'article',
  twitterCard: 'summary_large_image',
})

useHead(() => ({
  link: [
    {
      key: 'canonical',
      rel: 'canonical',
      href: canonicalUrl.value,
    },
  ],
}))
</script>

<template>
  <div>
    <SiteHeader />
    <main v-if="caseItem" class="case-page">
      <article>
        <header class="page-shell case-page__intro">
          <NuxtLink class="case-page__back" to="/#cases">
            <Icon name="ph:caret-left" aria-hidden="true" />
            Все работы
          </NuxtLink>
          <h1>{{ caseItem.title }}</h1>
          <p class="case-page__description">{{ caseItem.description }}</p>
          <dl class="case-page__meta">
            <div>
              <dt>Категория</dt>
              <dd>{{ categoryLabel }}</dd>
            </div>
          </dl>
        </header>

        <div class="page-shell case-page__gallery-shell">
          <div v-if="caseImages.length > 1" class="case-page__gallery-controls" aria-label="Управление галереей">
            <button
              type="button"
              aria-label="Предыдущее изображение"
              :disabled="!canScrollPrevious"
              @click="scrollGallery(-1)"
            >
              <Icon name="ph:caret-left" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Следующее изображение"
              :disabled="!canScrollNext"
              @click="scrollGallery(1)"
            >
              <Icon name="ph:caret-right" aria-hidden="true" />
            </button>
          </div>

          <div
            ref="galleryTrack"
            class="case-page__gallery"
            tabindex="0"
            aria-label="Изображения кейса"
            @scroll.passive="updateGalleryState"
          >
            <FullscreenImage
              v-for="(image, index) in caseImages"
              :key="`${image.src}-${index}`"
              :src="image.src"
              :alt="image.alt"
              :images="caseImages"
              :initial-index="index"
              :trigger-label="`Открыть изображение ${index + 1} из кейса ${caseItem.title}`"
              trigger-class="case-page__media"
            >
              <NuxtPicture
                class="case-page__media-backdrop"
                :src="image.src"
                alt=""
                width="1586"
                height="992"
                sizes="350px md:900px lg:1280px"
                format="avif,webp"
                loading="lazy"
                aria-hidden="true"
              />
              <NuxtPicture
                class="case-page__media-foreground"
                :src="image.src"
                :alt="image.alt"
                width="1586"
                height="992"
                sizes="350px md:900px lg:1280px"
                format="avif,webp"
                :preload="index === 0"
                :fetchpriority="index === 0 ? 'high' : 'auto'"
                :loading="index === 0 ? 'eager' : 'lazy'"
              />
            </FullscreenImage>
          </div>
        </div>

        <div class="page-shell case-page__content-shell">
          <div class="case-page__content">
            <ContentRenderer :value="caseItem" />
          </div>
        </div>
      </article>

      <FinalCta />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.case-page {
  background: var(--canvas);
}

.case-page__intro {
  width: min(900px, calc(100% - 40px));
  padding-block: 72px 52px;
}

.case-page__back {
  position: relative;
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 6px;
  color: var(--accent);
}

.case-page__back::after {
  position: absolute;
  right: 0;
  bottom: 5px;
  left: 0;
  height: 1px;
  background: currentColor;
  content: "";
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
}

.case-page__back:hover::after,
.case-page__back:focus-visible::after {
  transform: scaleX(1);
  transform-origin: left center;
}

.case-page__back :deep(svg) {
  width: 18px;
  height: 18px;
}

.case-page__intro h1 {
  max-width: 980px;
  margin-top: 44px;
  font-size: clamp(44px, 6vw, 76px);
  line-height: 1.02;
}

.case-page__description {
  max-width: 720px;
  margin-top: 28px;
  color: var(--muted);
  font-size: 20px;
}

.case-page__meta {
  display: flex;
  gap: 72px;
  margin: 42px 0 0;
}

.case-page__meta div {
  display: grid;
  gap: 5px;
}

.case-page__meta dt {
  color: var(--muted);
  font-size: 13px;
}

.case-page__meta dd {
  margin: 0;
  font-weight: 600;
}

.case-page :deep(.case-page__media) {
  position: relative;
  isolation: isolate;
  display: block;
  overflow: hidden;
  width: 100%;
  border: 0;
  border-radius: var(--radius-card);
  padding: 0;
  aspect-ratio: 19 / 10;
  background: var(--canvas-muted);
  cursor: zoom-in;
}

.case-page__gallery-shell {
  width: min(1120px, calc(100% - 40px));
}

.case-page__gallery {
  display: grid;
  grid-auto-columns: 100%;
  grid-auto-flow: column;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.case-page__gallery::-webkit-scrollbar {
  display: none;
}

.case-page__gallery :deep(.case-page__media) {
  scroll-snap-align: start;
}

.case-page__gallery-controls {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 16px;
}

.case-page__gallery-controls button {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border: 0;
  border-radius: 50%;
  padding: 0;
  background: rgb(210 210 215 / 0.7);
  cursor: pointer;
  transition: background-color 180ms ease, color 180ms ease, opacity 180ms ease;
}

.case-page__gallery-controls button:hover {
  background: #d2d2d7;
}

.case-page__gallery-controls button:disabled {
  background: rgb(210 210 215 / 0.38);
  color: #8e8e93;
  cursor: default;
  opacity: 0.58;
}

.case-page__gallery-controls :deep(svg) {
  width: 22px;
  height: 22px;
}

.case-page :deep(.case-page__media picture),
.case-page :deep(.case-page__media img) {
  display: block;
  width: 100%;
  height: 100%;
}

.case-page :deep(.case-page__media picture) {
  position: absolute;
  inset: 0;
}

.case-page :deep(.case-page__media .case-page__media-backdrop) {
  inset: -20px;
}

.case-page :deep(.case-page__media .case-page__media-foreground) {
  z-index: 1;
}

.case-page :deep(.case-page__media-backdrop img) {
  object-fit: cover;
  filter: blur(18px) saturate(0.82);
  opacity: 0.68;
  transform: scale(1.08);
}

.case-page :deep(.case-page__media-foreground img) {
  object-fit: contain;
}

.case-page__content-shell {
  display: grid;
  width: min(760px, calc(100% - 40px));
  justify-content: center;
  padding-block: 88px 110px;
}

.case-page__content {
  width: 100%;
}

.case-page__content :deep(h2) {
  margin-top: 64px;
  font-size: 34px;
}

.case-page__content :deep(h2:first-child) {
  margin-top: 0;
}

.case-page__content :deep(p),
.case-page__content :deep(ul) {
  margin: 20px 0 0;
  color: #4b4b50;
}

.case-page__content :deep(ul) {
  display: grid;
  gap: 10px;
  padding-left: 22px;
}

@media (max-width: 640px) {
  .case-page__gallery {
    gap: 12px;
  }

  .case-page__intro {
    padding-block: 48px 36px;
  }

  .case-page__intro h1 {
    margin-top: 30px;
    font-size: 40px;
  }

  .case-page__description {
    font-size: 18px;
  }

  .case-page__meta {
    flex-wrap: wrap;
    gap: 28px 52px;
  }

  .case-page__content-shell {
    padding-block: 60px 76px;
  }

  .case-page__content :deep(h2) {
    margin-top: 48px;
    font-size: 28px;
  }
}

@media (max-width: 419px) {
  .case-page__intro h1 {
    font-size: 34px;
  }
}
</style>
