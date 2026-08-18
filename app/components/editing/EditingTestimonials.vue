<script setup lang="ts">
const testimonials = [
  {
    id: '01',
    name: 'Пользователь 1',
    text: 'До марафона я открывал Premiere и не понимал, за что браться. На первой неделе собрал черновик. После этого стало проще: я уже видел, что именно хочу исправить.',
  },
  {
    id: '02',
    name: 'Пользователь 2',
    text: 'Понравилось, что уроки не существуют отдельно от практики. Посмотрел один блок, открыл свой проект и сразу повторил. К концу недели ролик заметно изменился.',
  },
  {
    id: '03',
    name: 'Пользователь 3',
    text: 'After Effects я долго откладывал, потому что интерфейс казался слишком сложным. Здесь понадобились только титры и простая анимация. Этого хватило, чтобы сделать ролик аккуратнее.',
  },
  {
    id: '04',
    name: 'Пользователь 4',
    text: 'Я проходил марафон после работы, поэтому короткий формат оказался к месту. Не всегда получалось заниматься каждый день, но было понятно, с какого шага продолжить.',
  },
  {
    id: '05',
    name: 'Пользователь 5',
    text: 'После марафона у меня остался понятный порядок работы. Теперь перед монтажом я разбираю материал, собираю черновую структуру и только потом занимаюсь деталями.',
  },
] as const

const activeIndex = ref(0)

const trackStyle = computed(() => ({
  transform: `translate3d(-${activeIndex.value * 100}%, 0, 0)`,
}))

function showPrevious() {
  activeIndex.value = (activeIndex.value - 1 + testimonials.length) % testimonials.length
}

function showNext() {
  activeIndex.value = (activeIndex.value + 1) % testimonials.length
}

function showTestimonial(index: number) {
  activeIndex.value = index
}
</script>

<template>
  <section id="testimonials" class="editing-testimonials editing-section" aria-labelledby="testimonials-title">
    <div class="editing-shell">
      <header class="editing-testimonials__heading">
        <div>
          <h2 id="testimonials-title"><br>отзывы</h2>
        </div>
        <p class="editing-testimonials__note">
          Тексты созданы для демонстрации концепта. Имена и истории вымышлены.
        </p>
      </header>

      <div
        class="editing-testimonials__window"
        role="region"
        aria-roledescription="Карусель"
        aria-label="Демонстрационные отзывы участников"
        tabindex="0"
        @keydown.left.prevent="showPrevious"
        @keydown.right.prevent="showNext"
      >
        <div class="editing-testimonials__titlebar" aria-hidden="true">
          <div class="editing-testimonials__traffic-lights">
            <span />
            <span />
            <span />
          </div>
          <span class="editing-testimonials__filename">reviews_sequence.prproj</span>
          <span class="editing-testimonials__demo-label">DEMO</span>
        </div>

        <div class="editing-testimonials__viewport" aria-live="polite">
          <div class="editing-testimonials__track" :style="trackStyle">
            <article
              v-for="(testimonial, index) in testimonials"
              :key="testimonial.id"
              class="editing-testimonial"
              :aria-hidden="activeIndex !== index"
            >
              <div class="editing-testimonial__content">
                <blockquote>«{{ testimonial.text }}»</blockquote>
                <footer class="editing-testimonial__author">
                  <div>
                    <strong>{{ testimonial.name }}</strong>
                  </div>
                </footer>
              </div>
            </article>
          </div>
        </div>

        <div class="editing-testimonials__controls">
          <div class="editing-testimonials__transport" aria-label="Управление каруселью">
            <button type="button" aria-label="Предыдущий отзыв" @click="showPrevious">
              <span aria-hidden="true">←</span>
            </button>
            <span class="editing-testimonials__counter">
              {{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(testimonials.length).padStart(2, '0') }}
            </span>
            <button type="button" aria-label="Следующий отзыв" @click="showNext">
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div class="editing-testimonials__clips" role="group" aria-label="Выбор отзыва">
            <button
              v-for="(testimonial, index) in testimonials"
              :key="testimonial.id"
              type="button"
              :class="{ 'is-active': activeIndex === index }"
              :aria-label="`Показать отзыв ${index + 1}`"
              :aria-pressed="activeIndex === index"
              @click="showTestimonial(index)"
            >
              <span>{{ testimonial.id }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.editing-testimonials {
  border-top: 1px solid var(--editing-line);
  padding-top: 64px !important;
  background: #101113;
}

.editing-testimonials__heading {
  display: grid;
  align-items: end;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 420px);
  gap: 64px;
}

.editing-testimonials__heading h2 {
  margin-top: 18px;
}

.editing-testimonials__note {
  padding-bottom: 6px;
  color: var(--editing-muted);
  font-size: 17px;
  line-height: 1.65;
}

.editing-testimonials__window {
  overflow: hidden;
  margin-top: 64px;
  border: 1px solid #41434a;
  border-radius: 14px;
  background: #17181b;
  box-shadow: 0 28px 80px rgb(0 0 0 / 0.3), inset 0 1px rgb(255 255 255 / 0.04);
}

.editing-testimonials__titlebar {
  position: relative;
  display: grid;
  min-height: 46px;
  align-items: center;
  grid-template-columns: 1fr auto 1fr;
  border-bottom: 1px solid var(--editing-line);
  padding-inline: 18px;
  background: #2a2b30;
  color: #c6c8cd;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 12px;
}

.editing-testimonials__traffic-lights {
  display: flex;
  gap: 8px;
}

.editing-testimonials__traffic-lights span {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #ff5f57;
}

.editing-testimonials__traffic-lights span:nth-child(2) {
  background: #febb2e;
}

.editing-testimonials__traffic-lights span:nth-child(3) {
  background: #28c840;
}

.editing-testimonials__filename {
  grid-column: 2;
}

.editing-testimonials__demo-label {
  justify-self: end;
  color: #858891;
  letter-spacing: 0.12em;
}

.editing-testimonials__viewport {
  overflow: hidden;
}

.editing-testimonials__track {
  display: flex;
  transition: transform 520ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.editing-testimonial {
  min-height: 430px;
  flex: 0 0 100%;
}

.editing-testimonial__content {
  display: flex;
  min-width: 0;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(42px, 5.5vw, 78px);
  background:
    linear-gradient(90deg, transparent 0 49.9%, rgb(255 255 255 / 0.025) 50%, transparent 50.1%),
    #17181b;
}

.editing-testimonial blockquote {
  max-width: 970px;
  color: #f0f0f2;
  font-family: var(--editing-display);
  font-size: clamp(26px, 3vw, 43px);
  font-weight: 500;
  letter-spacing: -0.032em;
  line-height: 1.25;
}

.editing-testimonial__author {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 28px;
  margin-top: 54px;
  border-top: 1px solid var(--editing-line);
  padding-top: 24px;
}

.editing-testimonial__author div {
  display: grid;
  gap: 4px;
}

.editing-testimonial__author strong {
  color: var(--editing-ink);
  font-size: 17px;
  font-weight: 650;
}

.editing-testimonial__author div span {
  color: var(--editing-muted);
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 12px;
}

.editing-testimonials__controls {
  display: grid;
  min-height: 84px;
  align-items: center;
  grid-template-columns: auto 1fr;
  gap: 30px;
  border-top: 1px solid var(--editing-line);
  padding: 15px 18px;
  background: #202125;
}

.editing-testimonials__transport {
  display: flex;
  align-items: center;
  gap: 9px;
}

.editing-testimonials__transport button {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid #454750;
  border-radius: 7px;
  background: #2b2c31;
  color: #e8e8eb;
  cursor: pointer;
  font-size: 18px;
  transition: border-color 160ms ease, background-color 160ms ease;
}

.editing-testimonials__transport button:hover {
  border-color: #656873;
  background: #34363c;
}

.editing-testimonials__counter {
  min-width: 66px;
  color: var(--editing-blue-bright);
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 12px;
  text-align: center;
}

.editing-testimonials__clips {
  display: grid;
  min-width: 0;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
}

.editing-testimonials__clips button {
  position: relative;
  min-width: 0;
  height: 38px;
  overflow: hidden;
  border: 1px solid #4c4f57;
  padding: 0 10px;
  background: #35363c;
  color: #9b9da5;
  cursor: pointer;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 10px;
  text-align: left;
  transition: border-color 180ms ease, background-color 180ms ease, color 180ms ease;
}

.editing-testimonials__clips button::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 3px;
  background: transparent;
  content: "";
}

.editing-testimonials__clips button:hover {
  border-color: #777a85;
  color: #eeeeef;
}

.editing-testimonials__clips button.is-active {
  border-color: #9e85d7;
  background: #604b92;
  color: #fff;
}

.editing-testimonials__clips button.is-active::after {
  background: var(--editing-blue);
}

@media (max-width: 900px) {
  .editing-testimonials__heading {
    align-items: start;
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .editing-testimonials__note {
    max-width: 560px;
  }

}

@media (max-width: 640px) {
  .editing-testimonials {
    padding-top: 52px !important;
  }

  .editing-testimonials__window {
    margin-top: 42px;
    border-radius: 12px;
  }

  .editing-testimonials__titlebar {
    grid-template-columns: 1fr auto;
    padding-inline: 14px;
  }

  .editing-testimonials__filename {
    display: none;
  }

  .editing-testimonials__demo-label {
    grid-column: 2;
  }

  .editing-testimonial {
    min-height: 430px;
  }

  .editing-testimonial__content {
    padding: 30px 24px;
  }

  .editing-testimonial blockquote {
    font-size: clamp(23px, 7.1vw, 30px);
  }

  .editing-testimonial__author {
    align-items: start;
    flex-direction: column;
    gap: 14px;
    margin-top: 36px;
  }

  .editing-testimonials__controls {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 14px;
  }

  .editing-testimonials__transport {
    justify-content: space-between;
  }

  .editing-testimonials__clips {
    order: -1;
  }

  .editing-testimonials__clips button {
    height: 30px;
    padding-inline: 7px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .editing-testimonials__track {
    transition: none;
  }
}
</style>
