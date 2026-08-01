<script setup lang="ts">
import { withBase } from 'ufo'

type GalleryImage = {
  src: string
  alt: string
}

const props = withDefaults(defineProps<{
  src: string
  alt: string
  images?: GalleryImage[]
  initialIndex?: number
  triggerLabel: string
  triggerClass?: string
}>(), {
  images: () => [],
  initialIndex: 0,
  triggerClass: undefined,
})

const dialog = ref<HTMLDialogElement | null>(null)
const currentIndex = ref(0)
let previousHtmlOverflow = ''
let previousBodyOverflow = ''

const galleryImages = computed<GalleryImage[]>(() => {
  const validImages = props.images.filter(image => typeof image?.src === 'string' && image.src.trim())
  return validImages.length ? validImages : [{ src: props.src, alt: props.alt }]
})

const currentImage = computed(() => galleryImages.value[currentIndex.value] ?? galleryImages.value[0])
const runtimeConfig = useRuntimeConfig()
const currentImageSource = computed(() => {
  return currentImage.value
    ? withBase(currentImage.value.src, runtimeConfig.app.baseURL)
    : undefined
})
const hasMultipleImages = computed(() => galleryImages.value.length > 1)

function lockPageScroll() {
  previousHtmlOverflow = document.documentElement.style.overflow
  previousBodyOverflow = document.body.style.overflow
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
}

function unlockPageScroll() {
  document.documentElement.style.overflow = previousHtmlOverflow
  document.body.style.overflow = previousBodyOverflow
}

function openImage() {
  currentIndex.value = Math.min(Math.max(props.initialIndex, 0), galleryImages.value.length - 1)
  lockPageScroll()
  dialog.value?.showModal()
}

function closeImage() {
  dialog.value?.close()
}

function showPrevious() {
  currentIndex.value = (currentIndex.value - 1 + galleryImages.value.length) % galleryImages.value.length
}

function showNext() {
  currentIndex.value = (currentIndex.value + 1) % galleryImages.value.length
}

function handleKeydown(event: KeyboardEvent) {
  if (!hasMultipleImages.value) return
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    showPrevious()
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    showNext()
  }
}

onBeforeUnmount(unlockPageScroll)
</script>

<template>
  <button
    type="button"
    class="image-lightbox__trigger"
    :class="props.triggerClass"
    :aria-label="props.triggerLabel"
    @click="openImage"
  >
    <slot />
  </button>

  <Teleport to="body">
    <dialog
      ref="dialog"
      class="image-lightbox"
      :aria-label="props.triggerLabel"
      @click.self="closeImage"
      @close="unlockPageScroll"
      @keydown="handleKeydown"
    >
      <button
        class="image-lightbox__close"
        type="button"
        aria-label="Закрыть галерею"
        @click="closeImage"
      >
        <Icon name="ph:x" aria-hidden="true" />
      </button>

      <button
        v-if="hasMultipleImages"
        class="image-lightbox__arrow image-lightbox__arrow--previous"
        type="button"
        aria-label="Предыдущее изображение"
        @click="showPrevious"
      >
        <Icon name="ph:caret-left" aria-hidden="true" />
      </button>

      <div class="image-lightbox__canvas" @click.self="closeImage">
        <img
          v-if="currentImage"
          :key="currentImage.src"
          :src="currentImageSource"
          :alt="currentImage.alt"
          width="1586"
          height="992"
        >
      </div>

      <button
        v-if="hasMultipleImages"
        class="image-lightbox__arrow image-lightbox__arrow--next"
        type="button"
        aria-label="Следующее изображение"
        @click="showNext"
      >
        <Icon name="ph:caret-right" aria-hidden="true" />
      </button>

      <p v-if="hasMultipleImages" class="image-lightbox__counter" aria-live="polite">
        {{ currentIndex + 1 }} / {{ galleryImages.length }}
      </p>
    </dialog>
  </Teleport>
</template>

<style scoped>
.image-lightbox__trigger {
  border: 0;
  padding: 0;
}

.image-lightbox {
  width: 100vw;
  max-width: none;
  height: 100dvh;
  max-height: none;
  margin: 0;
  border: 0;
  padding: clamp(20px, 4vw, 64px) clamp(68px, 7vw, 112px);
  overflow: hidden;
  background: rgb(29 29 31 / 0.34);
  color: #f5f5f7;
  -webkit-backdrop-filter: blur(22px) saturate(135%);
  backdrop-filter: blur(22px) saturate(135%);
}

.image-lightbox[open] {
  display: grid;
  place-items: center;
}

.image-lightbox::backdrop {
  background: rgb(17 17 19 / 0.38);
  -webkit-backdrop-filter: blur(26px) saturate(125%);
  backdrop-filter: blur(26px) saturate(125%);
}

.image-lightbox__close,
.image-lightbox__arrow,
.image-lightbox__counter {
  border: 1px solid rgb(255 255 255 / 0.18);
  background: rgb(52 52 55 / 0.64);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.12);
  -webkit-backdrop-filter: blur(18px) saturate(135%);
  backdrop-filter: blur(18px) saturate(135%);
}

.image-lightbox__close,
.image-lightbox__arrow {
  position: fixed;
  z-index: 1;
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border-radius: 50%;
  padding: 0;
  color: #f5f5f7;
  cursor: pointer;
  transition: background-color 180ms ease, transform 180ms ease;
}

.image-lightbox__close {
  top: 20px;
  right: 20px;
}

.image-lightbox__arrow {
  top: 50%;
  transform: translateY(-50%);
}

.image-lightbox__arrow--previous {
  left: 20px;
}

.image-lightbox__arrow--next {
  right: 20px;
}

.image-lightbox__close:hover,
.image-lightbox__arrow:hover {
  background: rgb(72 72 76 / 0.86);
}

.image-lightbox__close:active {
  transform: scale(0.96);
}

.image-lightbox__arrow:active {
  transform: translateY(-50%) scale(0.96);
}

.image-lightbox__close :deep(svg),
.image-lightbox__arrow :deep(svg) {
  width: 22px;
  height: 22px;
}

.image-lightbox__canvas {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
}

.image-lightbox__canvas img {
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: calc(100dvh - clamp(40px, 8vw, 128px));
  border-radius: var(--radius-media);
  object-fit: contain;
}

.image-lightbox__counter {
  position: fixed;
  bottom: 20px;
  left: 50%;
  margin: 0;
  border-radius: var(--radius-pill);
  padding: 8px 13px;
  color: #f5f5f7;
  font-size: 14px;
  line-height: 1;
  transform: translateX(-50%);
}

@media (max-width: 640px) {
  .image-lightbox {
    padding: 72px 16px 84px;
  }

  .image-lightbox__arrow {
    top: auto;
    bottom: 18px;
    transform: none;
  }

  .image-lightbox__arrow--previous {
    left: 16px;
  }

  .image-lightbox__arrow--next {
    right: 16px;
  }

  .image-lightbox__arrow:active {
    transform: scale(0.96);
  }

  .image-lightbox__counter {
    bottom: 26px;
  }
}

@media (max-width: 419px) {
  .image-lightbox__close {
    top: 12px;
    right: 12px;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .image-lightbox,
  .image-lightbox::backdrop {
    background: #1d1d1f;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }

  .image-lightbox__close,
  .image-lightbox__arrow,
  .image-lightbox__counter {
    background: #343437;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
}
</style>
