<script setup lang="ts">
import { getCaseImages } from '~/utils/caseGallery'

const filters = [
  { label: 'Все работы', value: 'all' },
  { label: 'Сайты', value: 'sites' },
  { label: 'Чат-боты', value: 'bots' },
  { label: 'Mini Apps', value: 'miniapps' },
] as const

const categoryLabels = {
  sites: 'Сайты',
  bots: 'Чат-боты',
  miniapps: 'Mini Apps',
} as const

const { data: caseDocuments, error: casesError } = await useAsyncData('portfolio-cases', () => {
  return queryCollection('cases').order('order', 'ASC').all()
})

const activeFilter = ref<(typeof filters)[number]['value']>('all')
const filterGroup = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const filterReady = ref(false)
const filterIndicator = reactive({ x: 0, width: 0 })
const canScrollPrevious = ref(false)
const canScrollNext = ref(false)
let resizeObserver: ResizeObserver | null = null

const filteredCases = computed(() => {
  const cases = caseDocuments.value ?? []
  const selectedCases = activeFilter.value === 'all'
    ? cases
    : cases.filter(item => item.category === activeFilter.value)

  return selectedCases
    .map((item) => {
      const galleryImages = getCaseImages(item)
      return {
        ...item,
        galleryImages,
        coverImage: galleryImages[0]!,
      }
    })
    .filter(item => item.galleryImages.length > 0)
})

function updateFilterIndicator() {
  const activeButton = filterGroup.value?.querySelector<HTMLElement>('button[aria-pressed="true"]')
  if (!activeButton) return

  filterIndicator.x = activeButton.offsetLeft
  filterIndicator.width = activeButton.offsetWidth
  filterReady.value = true
}

function updateCarouselState() {
  if (!track.value) {
    canScrollPrevious.value = false
    canScrollNext.value = false
    return
  }

  const maxScrollLeft = Math.max(0, track.value.scrollWidth - track.value.clientWidth)
  canScrollPrevious.value = track.value.scrollLeft > 2
  canScrollNext.value = track.value.scrollLeft < maxScrollLeft - 2
}

function observeInteractiveAreas() {
  resizeObserver?.disconnect()
  if (filterGroup.value) resizeObserver?.observe(filterGroup.value)
  if (track.value) resizeObserver?.observe(track.value)
}

watch(activeFilter, async () => {
  await nextTick()
  track.value?.scrollTo({ left: 0, behavior: 'smooth' })
  updateFilterIndicator()
  updateCarouselState()
})

watch(track, async () => {
  await nextTick()
  observeInteractiveAreas()
  updateCarouselState()
})

onMounted(async () => {
  resizeObserver = new ResizeObserver(() => {
    updateFilterIndicator()
    updateCarouselState()
  })
  await nextTick()
  observeInteractiveAreas()
  updateFilterIndicator()
  updateCarouselState()
})

onBeforeUnmount(() => resizeObserver?.disconnect())

function changeFilter(value: (typeof filters)[number]['value']) {
  activeFilter.value = value
}

function scrollCases(direction: 1 | -1) {
  if (!track.value) return
  if (direction < 0 && !canScrollPrevious.value) return
  if (direction > 0 && !canScrollNext.value) return
  const card = track.value.querySelector<HTMLElement>('.case-card')
  const distance = (card?.offsetWidth ?? track.value.clientWidth) + 24
  track.value.scrollBy({ left: distance * direction, behavior: 'smooth' })
}

</script>

<template>
  <section id="cases" class="cases section-block" aria-labelledby="cases-title">
    <div class="page-shell">
      <div v-reveal class="section-heading">
        <h2 id="cases-title">Кейсы</h2>
        <p>
          Реальные проекты и авторские концепты с подробным описанием задачи, решений и моей роли.
        </p>
      </div>

      <div class="cases__toolbar">
        <div
          ref="filterGroup"
          class="case-filters"
          :class="{ 'is-ready': filterReady }"
          :style="{
            '--filter-x': `${filterIndicator.x}px`,
            '--filter-width': `${filterIndicator.width}px`,
          }"
          role="group"
          aria-label="Фильтр проектов"
        >
          <button
            v-for="filter in filters"
            :key="filter.value"
            type="button"
            :class="{ 'is-active': activeFilter === filter.value }"
            :aria-pressed="activeFilter === filter.value"
            @click="changeFilter(filter.value)"
          >
            {{ filter.label }}
          </button>
        </div>

        <div class="cases__controls" aria-label="Управление каруселью">
          <button
            type="button"
            aria-label="Предыдущая работа"
            :disabled="!canScrollPrevious"
            @click="scrollCases(-1)"
          >
            <Icon name="ph:caret-left" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Следующая работа"
            :disabled="!canScrollNext"
            @click="scrollCases(1)"
          >
            <Icon name="ph:caret-right" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        v-if="!casesError && filteredCases.length"
        ref="track"
        class="cases__track"
        tabindex="0"
        @scroll.passive="updateCarouselState"
      >
        <article v-for="item in filteredCases" :key="item.path" class="case-card">
          <FullscreenImage
            :src="item.coverImage.src"
            :alt="item.coverImage.alt"
            :images="item.galleryImages"
            :trigger-label="`Открыть ${item.title} на весь экран`"
            trigger-class="case-card__media"
          >
            <NuxtPicture
              class="case-card__media-backdrop"
              :src="item.coverImage.src"
              alt=""
              width="912"
              height="571"
              sizes="350px md:720px lg:912px"
              format="avif,webp"
              loading="lazy"
              aria-hidden="true"
            />
            <NuxtPicture
              class="case-card__media-foreground"
              :src="item.coverImage.src"
              :alt="item.coverImage.alt"
              width="912"
              height="571"
              sizes="350px md:720px lg:912px"
              format="avif,webp"
              loading="lazy"
            />
          </FullscreenImage>
          <div class="case-card__body">
            <h3>{{ item.title }}</h3>
            <p class="case-card__category">{{ categoryLabels[item.category] }}</p>
            <p>{{ item.description }}</p>
            <div class="case-card__actions">
              <a
                class="button button--primary button--without-icon"
                :href="item.link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Открыть
              </a>
              <NuxtLink class="details-link" :to="item.path">
                Подробнее
                <Icon name="ph:caret-right" aria-hidden="true" />
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <div v-else-if="casesError" class="cases__empty" role="alert">
        <p>Не удалось загрузить проекты. Обновите страницу или попробуйте позже.</p>
      </div>

      <div v-else class="cases__empty" role="status">
        <p>В этой категории пока нет опубликованных проектов.</p>
        <TelegramButton label="Обсудить похожую задачу" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.cases {
  overflow: hidden;
  background: var(--canvas-muted);
}

.cases__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.case-filters {
  position: relative;
  display: flex;
  max-width: 100%;
  gap: 2px;
  overflow-x: auto;
  border-radius: var(--radius-pill);
  padding: 5px;
  background: #e7e7ec;
  scrollbar-width: none;
}

.case-filters::before {
  position: absolute;
  top: 5px;
  left: 0;
  width: var(--filter-width, 0px);
  height: calc(100% - 10px);
  border-radius: var(--radius-pill);
  background: var(--surface-dark);
  content: "";
  opacity: 0;
  transform: translateX(var(--filter-x, 0px));
  transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1), width 320ms cubic-bezier(0.16, 1, 0.3, 1), opacity 120ms ease;
}

.case-filters.is-ready::before {
  opacity: 1;
}

.case-filters::-webkit-scrollbar,
.cases__track::-webkit-scrollbar {
  display: none;
}

.case-filters button {
  position: relative;
  z-index: 1;
  min-height: 44px;
  flex: 0 0 auto;
  border: 0;
  border-radius: var(--radius-pill);
  padding: 10px 20px;
  background: transparent;
  cursor: pointer;
  transition: background-color 180ms ease, color 180ms ease;
}

.case-filters button:hover {
  background: rgb(255 255 255 / 0.62);
}

.case-filters button.is-active {
  background: transparent;
  color: #ffffff;
}

.case-filters:not(.is-ready) button.is-active {
  background: var(--surface-dark);
}

.cases__controls {
  display: flex;
  flex: 0 0 auto;
  gap: 8px;
}

.cases__controls button {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: rgb(210 210 215 / 0.7);
  cursor: pointer;
  transition: background-color 180ms ease, color 180ms ease, opacity 180ms ease;
}

.cases__controls button:hover {
  background: #d2d2d7;
}

.cases__controls button:disabled {
  background: rgb(210 210 215 / 0.38);
  color: #8e8e93;
  cursor: default;
  opacity: 0.58;
}

.cases__controls button:disabled:hover {
  background: rgb(210 210 215 / 0.38);
}

.cases__controls :deep(svg) {
  width: 22px;
  height: 22px;
}

.cases__track {
  display: grid;
  grid-auto-columns: minmax(760px, 78%);
  grid-auto-flow: column;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 12px;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.case-card {
  overflow: hidden;
  border-radius: var(--radius-card);
  background: var(--canvas);
  scroll-snap-align: start;
}

.case-card :deep(.case-card__media) {
  position: relative;
  isolation: isolate;
  display: block;
  overflow: hidden;
  width: 100%;
  border: 0;
  padding: 0;
  aspect-ratio: 19 / 10;
  background: #ececf0;
  cursor: zoom-in;
}

.case-card :deep(.case-card__media picture) {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
}

.case-card :deep(.case-card__media .case-card__media-backdrop) {
  inset: -20px;
}

.case-card :deep(.case-card__media .case-card__media-foreground) {
  z-index: 1;
}

.case-card :deep(.case-card__media img) {
  display: block;
  width: 100%;
  height: 100%;
}

.case-card :deep(.case-card__media-backdrop img) {
  object-fit: cover;
  filter: blur(18px) saturate(0.82);
  opacity: 0.68;
  transform: scale(1.08);
}

.case-card :deep(.case-card__media-foreground img) {
  object-fit: contain;
  transition: transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
}

.case-card :deep(.case-card__media:hover .case-card__media-foreground img) {
  transform: scale(1.015);
}

.case-card__body {
  padding: 30px 32px 34px;
}

.case-card__body h3 {
  font-size: 30px;
}

.case-card__category {
  margin-top: 8px;
  color: var(--muted);
  font-size: 14px;
}

.case-card__body > p:not(.case-card__category) {
  max-width: 720px;
  margin-top: 18px;
  color: var(--muted);
}

.case-card__actions {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-top: 28px;
}

.details-link {
  position: relative;
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 3px;
  border-radius: var(--radius-pill);
  padding-inline: 14px;
  color: var(--accent);
}

.details-link:focus-visible {
  outline-offset: 2px;
}

.details-link::after {
  position: absolute;
  right: 14px;
  bottom: 5px;
  left: 14px;
  height: 1px;
  background: currentColor;
  content: "";
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
}

.details-link:hover::after,
.details-link:focus-visible::after {
  transform: scaleX(1);
  transform-origin: left center;
}

.details-link :deep(svg) {
  width: 18px;
  height: 18px;
}

.cases__empty {
  display: grid;
  min-height: 360px;
  place-items: center;
  align-content: center;
  gap: 24px;
  border-radius: var(--radius-card);
  background: var(--canvas);
  color: var(--muted);
  text-align: center;
}

@media (max-width: 833px) {
  .cases__track {
    grid-auto-columns: 88%;
  }
}

@media (max-width: 640px) {
  .cases__toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .case-filters {
    width: 100%;
  }

  .cases__controls {
    align-self: flex-end;
  }

  .cases__track {
    grid-auto-columns: 100%;
  }

  .case-card__body {
    padding: 24px;
  }

  .case-card__body h3 {
    font-size: 26px;
  }

  .case-card__actions {
    gap: 22px;
  }
}
</style>
