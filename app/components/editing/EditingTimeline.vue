<script setup lang="ts">
type TrackId = 'V2' | 'V1' | 'A1' | 'A2'

const steps = [
  {
    week: 'Неделя 1',
    title: 'Освой пространство монтажа',
    tool: 'Premiere Pro',
    result: 'Соберёшь первый черновик и перестанешь теряться в интерфейсе.',
    topics: ['Проект, файлы и таймлайн', 'Нарезка без лишних движений', 'Первый экспорт ролика'],
  },
  {
    week: 'Неделя 2',
    title: 'Сделай монтаж живым',
    tool: 'Ритм, звук, цвет',
    result: 'Превратишь набор кадров в историю, которую хочется досмотреть.',
    topics: ['Темп и логика склеек', 'Чистый звук и музыка', 'Базовая цветокоррекция'],
  },
  {
    week: 'Неделя 3',
    title: 'Добавь движение и графику',
    tool: 'After Effects',
    result: 'Создашь собственные титры и простую анимацию без готовых шаблонов.',
    topics: ['Слои и ключевые кадры', 'Титры и анимация текста', 'Маски и базовые эффекты'],
  },
  {
    week: 'Неделя 4',
    title: 'Доведи идею до финала',
    tool: 'Личный проект',
    result: 'Закончишь ролик под свою задачу и подготовишь его к публикации.',
    topics: ['Сценарий и черновая сборка', 'Графика, звук и финальный цвет', 'Экспорт и разбор результата'],
  },
]

const tracks: Array<{ id: TrackId, controls: string[] }> = [
  { id: 'V2', controls: ['◉', '◇'] },
  { id: 'V1', controls: ['◉', '◇'] },
  { id: 'A1', controls: ['M', 'S'] },
  { id: 'A2', controls: ['M', 'S'] },
]

const clips: Array<{
  id: string
  track: TrackId
  step: number
  left: number
  width: number
  label: string
  short: string
  tone: 'blue' | 'indigo' | 'violet' | 'teal' | 'magenta' | 'amber'
  fx?: boolean
}> = [
  { id: 'w1-bin', track: 'V1', step: 0, left: 0.7, width: 10.8, label: 'IMPORT_01', short: '01', tone: 'blue' },
  { id: 'w1-cut', track: 'V1', step: 0, left: 12.1, width: 11.7, label: 'ROUGH CUT', short: 'CUT', tone: 'blue', fx: true },
  { id: 'w1-sync', track: 'A1', step: 0, left: 1.1, width: 22.4, label: 'SYNC · DIALOGUE', short: 'SYNC', tone: 'teal' },
  { id: 'w2-rhythm-a', track: 'V1', step: 1, left: 25.6, width: 9.6, label: 'RHYTHM_A', short: '02', tone: 'indigo' },
  { id: 'w2-rhythm-b', track: 'V1', step: 1, left: 35.8, width: 13, label: 'RHYTHM_B', short: 'CUT', tone: 'blue' },
  { id: 'w2-music', track: 'A1', step: 1, left: 25.6, width: 23.2, label: 'MUSIC MIX', short: 'MIX', tone: 'teal', fx: true },
  { id: 'w2-sfx', track: 'A2', step: 1, left: 28.5, width: 17.1, label: 'SFX · ROOM TONE', short: 'SFX', tone: 'amber' },
  { id: 'w3-titles', track: 'V2', step: 2, left: 50.8, width: 11.5, label: 'Ae · TITLES', short: 'Ae', tone: 'violet', fx: true },
  { id: 'w3-motion', track: 'V2', step: 2, left: 62.8, width: 10.8, label: 'MOTION', short: 'MOT', tone: 'magenta' },
  { id: 'w3-plate', track: 'V1', step: 2, left: 50.8, width: 22.8, label: 'GRAPHICS PLATE', short: '03', tone: 'indigo' },
  { id: 'w4-color', track: 'V2', step: 3, left: 75.5, width: 10.4, label: 'COLOR PASS', short: 'CLR', tone: 'magenta', fx: true },
  { id: 'w4-master', track: 'V1', step: 3, left: 75.5, width: 23.6, label: 'MASTER_v07', short: '04', tone: 'blue' },
  { id: 'w4-mix', track: 'A1', step: 3, left: 75.5, width: 23.6, label: 'FINAL MIX', short: 'MIX', tone: 'teal' },
  { id: 'w4-sfx', track: 'A2', step: 3, left: 77.6, width: 18.3, label: 'SFX MASTER', short: 'SFX', tone: 'amber' },
]

const ruler = [
  { label: '00:00', left: 0 },
  { label: '00:08', left: 25 },
  { label: '00:16', left: 50 },
  { label: '00:24', left: 75 },
  { label: '00:32', left: 100 },
]

const section = ref<HTMLElement | null>(null)
const sticky = ref<HTMLElement | null>(null)
const progress = ref(0)
const activeIndex = ref(0)
let frame = 0
let visible = true
let intersectionObserver: IntersectionObserver | undefined
let resizeObserver: ResizeObserver | undefined

const activeStep = computed(() => steps[activeIndex.value]!)
const progressPercent = computed(() => Math.max(0, Math.min(100, progress.value * 100)))
const sectionStyle = computed(() => ({ '--timeline-height': `${100 + steps.length * 82}svh` }))
const playheadStyle = computed(() => ({ transform: `translate3d(${progressPercent.value}%, 0, 0)` }))
const renderStyle = computed(() => ({ transform: `scaleX(${progress.value})` }))
const timecode = computed(() => {
  const totalFrames = Math.round(progress.value * 32 * 25)
  const seconds = Math.floor(totalFrames / 25)
  const frames = totalFrames % 25
  return `00:00:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`
})

function clipsForTrack(track: TrackId) {
  return clips.filter(clip => clip.track === track)
}

function measureProgress() {
  frame = 0
  if (!section.value) return

  const rect = section.value.getBoundingClientRect()
  const stickyHeight = sticky.value?.offsetHeight ?? window.innerHeight
  const distance = Math.max(1, section.value.offsetHeight - stickyHeight)
  const travelled = Math.min(distance, Math.max(0, -rect.top))
  progress.value = travelled / distance
  const boundedProgress = Math.min(progress.value, 0.999999)
  activeIndex.value = Math.min(steps.length - 1, Math.floor(boundedProgress * steps.length))
}

function requestMeasure() {
  if (frame || !visible) return
  frame = window.requestAnimationFrame(measureProgress)
}

onMounted(() => {
  measureProgress()
  intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting)
    if (visible) requestMeasure()
  }, { rootMargin: '100% 0px' })
  intersectionObserver.observe(section.value!)

  resizeObserver = new ResizeObserver(requestMeasure)
  resizeObserver.observe(section.value!)
  window.addEventListener('scroll', requestMeasure, { passive: true })
  window.addEventListener('resize', requestMeasure)
})

onBeforeUnmount(() => {
  intersectionObserver?.disconnect()
  resizeObserver?.disconnect()
  window.removeEventListener('scroll', requestMeasure)
  window.removeEventListener('resize', requestMeasure)
  if (frame) window.cancelAnimationFrame(frame)
})
</script>

<template>
  <section
    id="program"
    ref="section"
    class="editing-timeline"
    :style="sectionStyle"
    aria-labelledby="program-title"
  >
    <ol class="editing-timeline__sr-only">
      <li v-for="step in steps" :key="`accessible-${step.week}`">
        {{ step.week }}. {{ step.title }}. {{ step.result }}
      </li>
    </ol>

    <div ref="sticky" class="editing-timeline__sticky">
      <div class="editing-shell editing-timeline__inner">
        <div class="editing-timeline__heading">
          <div>
            <h2 id="program-title">Первый ролик за <br>4 недели</h2>
          </div>
        </div>

        <div class="editing-timeline__window" aria-hidden="true">
          <div class="editing-timeline__titlebar">
            <div class="editing-timeline__lights"><i /><i /><i /></div>
            <span>editing_marathon.prproj — Sequence 01</span>
            <small>Saved</small>
          </div>

          <div class="editing-timeline__toolbar">
            <div class="editing-timeline__tools">
              <span class="editing-timeline__app">Pr</span>
              <i>V</i><i>C</i><i>R</i><i>T</i>
            </div>
            <time>{{ timecode }}</time>
            <div class="editing-timeline__transport">
              <span>J</span><b>▶</b><span>L</span><small>24 fps</small>
            </div>
          </div>

          <div class="editing-timeline__sequence">
            <div class="editing-timeline__headers">
              <div class="editing-timeline__header-ruler">TRACKS</div>
              <div v-for="track in tracks" :key="track.id" class="editing-timeline__track-head">
                <span>▣</span>
                <b>{{ track.id }}</b>
                <small v-for="control in track.controls" :key="control">{{ control }}</small>
              </div>
            </div>

            <div class="editing-timeline__canvas">
              <div class="editing-timeline__ruler">
                <span
                  v-for="tick in ruler"
                  :key="tick.label"
                  :style="{ left: `${tick.left}%` }"
                >{{ tick.label }}</span>
                <i class="editing-timeline__render" :style="renderStyle" />
              </div>

              <div class="editing-timeline__tracks">
                <i
                  v-for="boundary in 3"
                  :key="`boundary-${boundary}`"
                  class="editing-timeline__boundary"
                  :style="{ left: `${boundary * 25}%` }"
                />

                <div v-for="track in tracks" :key="`row-${track.id}`" class="editing-timeline__row">
                  <div
                    v-for="clip in clipsForTrack(track.id)"
                    :key="clip.id"
                    class="editing-timeline__clip"
                    :class="[
                      `tone-${clip.tone}`,
                      { 'is-active': clip.step === activeIndex, 'is-past': clip.step < activeIndex, 'has-fx': clip.fx },
                    ]"
                    :style="{ left: `${clip.left}%`, width: `${clip.width}%` }"
                  >
                    <span class="editing-timeline__clip-full">{{ clip.label }}</span>
                    <span class="editing-timeline__clip-short">{{ clip.short }}</span>
                    <small v-if="clip.fx">fx</small>
                  </div>
                </div>

                <div class="editing-timeline__playhead-layer" :style="playheadStyle">
                  <i class="editing-timeline__playhead" />
                </div>
              </div>
            </div>
          </div>

          <div class="editing-timeline__statusbar">
            <span>00:00:00:00</span><i><b :style="{ width: `${progressPercent}%` }" /></i><span>00:00:32:00</span>
          </div>
        </div>

        <article class="editing-timeline__detail">
          <div class="editing-timeline__counter">
            <small>{{ activeStep.week }} · {{ activeStep.tool }}</small>
          </div>

          <div class="editing-timeline__copy">
            <h3>{{ activeStep.title }}</h3>
            <strong>{{ activeStep.result }}</strong>
          </div>

          <ol>
            <li v-for="(topic, index) in activeStep.topics" :key="topic">
              <kbd>{{ String(index + 1).padStart(2, '0') }}</kbd>
              <span>{{ topic }}</span>
            </li>
          </ol>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.editing-timeline {
  position: relative;
  height: var(--timeline-height);
  background:
    repeating-linear-gradient(90deg, transparent 0 79px, rgb(255 255 255 / 0.014) 80px),
    #0e0f12;
}

.editing-timeline__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  white-space: nowrap;
}

.editing-timeline__sticky {
  position: sticky;
  top: 0;
  display: grid;
  min-height: 100svh;
  align-items: center;
  overflow: hidden;
}

.editing-timeline__inner {
  padding-block: clamp(26px, 4.5vh, 52px);
}

.editing-timeline__heading {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.55fr);
  align-items: end;
  gap: 56px;
}

.editing-timeline__heading h2 {
  margin-top: 0;
  font-size: clamp(42px, 4.35vw, 68px);
}

.editing-timeline__heading > p {
  max-width: 500px;
  padding-bottom: 4px;
  color: var(--editing-muted);
  font-size: 15px;
  line-height: 1.55;
}

.editing-timeline__window {
  overflow: hidden;
  margin-top: clamp(24px, 4vh, 40px);
  border: 1px solid #45474d;
  border-radius: 12px;
  background: #18191c;
  box-shadow: 0 20px 60px rgb(0 0 0 / 0.32), inset 0 1px rgb(255 255 255 / 0.06);
}

.editing-timeline__titlebar {
  display: grid;
  height: 34px;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 1px solid #0a0b0d;
  padding-inline: 12px;
  background: #2b2c30;
  color: #c9cacf;
  font-size: 14px;
}

.editing-timeline__titlebar > span {
  font-weight: 620;
}

.editing-timeline__titlebar > small {
  justify-self: end;
  color: #777a80;
  font-size: 9px;
}

.editing-timeline__lights {
  display: flex;
  gap: 7px;
}

.editing-timeline__lights i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff5f57;
}

.editing-timeline__lights i:nth-child(2) { background: #febc2e; }
.editing-timeline__lights i:nth-child(3) { background: #28c840; }

.editing-timeline__toolbar {
  display: grid;
  height: 38px;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 1px solid #383a3f;
  padding-inline: 10px;
  background: #202125;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
}

.editing-timeline__tools,
.editing-timeline__transport {
  display: flex;
  align-items: center;
  gap: 6px;
}

.editing-timeline__app,
.editing-timeline__tools i,
.editing-timeline__transport > span,
.editing-timeline__transport > b {
  display: grid;
  width: 23px;
  height: 23px;
  place-items: center;
  border: 1px solid #3b3d42;
  background: #292a2f;
  color: #bfc1c7;
  font-size: 9px;
  font-style: normal;
  font-weight: 620;
}

.editing-timeline__app {
  border-color: #5d58c4;
  margin-right: 4px;
  background: #211d4d;
  color: #aaa5ff;
}

.editing-timeline__toolbar time {
  color: var(--editing-blue);
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  font-weight: 650;
  letter-spacing: 0.02em;
}

.editing-timeline__transport {
  justify-self: end;
}

.editing-timeline__transport > b {
  color: #f2f2f4;
  font-size: 8px;
}

.editing-timeline__transport small {
  margin-left: 8px;
  color: #777a81;
  font-size: 9px;
}

.editing-timeline__sequence {
  display: grid;
  grid-template-columns: 122px 1fr;
}

.editing-timeline__headers {
  border-right: 1px solid #090a0c;
  background: #242529;
}

.editing-timeline__header-ruler {
  display: flex;
  height: 30px;
  align-items: center;
  border-bottom: 1px solid #3a3c41;
  padding-inline: 11px;
  color: #73767d;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 8px;
  letter-spacing: 0.12em;
}

.editing-timeline__track-head {
  display: grid;
  height: 38px;
  grid-template-columns: 21px 1fr 18px 18px;
  align-items: center;
  border-bottom: 1px solid #34363b;
  padding-inline: 7px;
  color: #85888f;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 8px;
}

.editing-timeline__track-head > b {
  display: grid;
  width: 28px;
  height: 22px;
  place-items: center;
  background: #174f7d;
  color: #85c6ff;
  font-size: 9px;
}

.editing-timeline__track-head:nth-child(n+4) > b {
  background: #185747;
  color: #87dbc2;
}

.editing-timeline__track-head small {
  text-align: center;
}

.editing-timeline__canvas {
  position: relative;
  min-width: 0;
  overflow: hidden;
  background: #141518;
}

.editing-timeline__ruler {
  position: relative;
  height: 30px;
  border-bottom: 1px solid #3a3c41;
  background:
    repeating-linear-gradient(90deg, #62646a 0 1px, transparent 1px 18px),
    #18191c;
  background-position-y: bottom;
  background-size: auto 7px;
  background-repeat: repeat-x;
}

.editing-timeline__ruler > span {
  position: absolute;
  bottom: 9px;
  color: #85888f;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 8px;
  font-variant-numeric: tabular-nums;
  transform: translateX(-50%);
}

.editing-timeline__ruler > span:first-child { transform: none; }
.editing-timeline__ruler > span:last-of-type { transform: translateX(-100%); }

.editing-timeline__render {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--editing-render);
  transform-origin: left center;
}

.editing-timeline__tracks {
  position: relative;
}

.editing-timeline__row {
  position: relative;
  height: 38px;
  border-bottom: 1px solid #303238;
  background: repeating-linear-gradient(90deg, transparent 0 59px, rgb(255 255 255 / 0.018) 60px);
}

.editing-timeline__boundary {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  border-left: 1px dashed rgb(255 255 255 / 0.13);
}

.editing-timeline__clip {
  position: absolute;
  z-index: 2;
  top: 3px;
  bottom: 3px;
  display: flex;
  min-width: 9px;
  overflow: hidden;
  align-items: center;
  gap: 5px;
  border: 1px solid rgb(255 255 255 / 0.15);
  padding-inline: 6px;
  color: rgb(255 255 255 / 0.82);
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 8px;
  white-space: nowrap;
  opacity: 0.28;
  transition: filter 140ms ease, opacity 140ms ease, outline-color 140ms ease;
}

.editing-timeline__clip.is-past { opacity: 0.7; }
.editing-timeline__clip.is-active {
  z-index: 3;
  outline: 1px solid rgb(255 255 255 / 0.78);
  outline-offset: -2px;
  filter: saturate(1.18) brightness(1.08);
  opacity: 1;
}

.editing-timeline__clip small {
  margin-left: auto;
  color: #fff4a2;
  font-family: Georgia, serif;
  font-size: 9px;
  font-style: italic;
}

.editing-timeline__clip-short { display: none; }
.tone-blue { background: #3f65a8; }
.tone-indigo { background: #5a62b1; }
.tone-violet { background: #7657b3; }
.tone-magenta { background: #a63f83; }
.tone-teal {
  background:
    repeating-linear-gradient(90deg, transparent 0 4px, rgb(221 255 244 / 0.23) 4px 5px, transparent 5px 9px),
    #117e63;
}
.tone-amber {
  background:
    repeating-linear-gradient(90deg, transparent 0 5px, rgb(255 239 204 / 0.2) 5px 6px, transparent 6px 10px),
    #9a671f;
}

.editing-timeline__playhead-layer {
  position: absolute;
  z-index: 6;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  will-change: transform;
}

.editing-timeline__playhead {
  position: absolute;
  top: -30px;
  bottom: 0;
  left: 0;
  width: 1px;
  background: var(--editing-blue);
  box-shadow: 0 0 7px rgb(45 140 255 / 0.72);
}

.editing-timeline__playhead::before {
  position: absolute;
  top: 0;
  left: -6px;
  width: 13px;
  height: 9px;
  background: var(--editing-blue);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  content: '';
}

.editing-timeline__statusbar {
  display: grid;
  height: 25px;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  border-top: 1px solid #090a0c;
  padding-inline: 12px;
  background: #202125;
  color: #70737a;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 8px;
}

.editing-timeline__statusbar > i {
  height: 3px;
  overflow: hidden;
  border-radius: 3px;
  background: #34363b;
}

.editing-timeline__statusbar b {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--editing-blue);
}

.editing-timeline__detail {
  display: grid;
  min-height: 224px;
  grid-template-columns: 250px minmax(0, 1.15fr) minmax(340px, 0.7fr);
  align-items: start;
  gap: clamp(26px, 4vw, 56px);
  border-right: 1px solid var(--editing-line);
  border-bottom: 1px solid var(--editing-line);
  border-left: 1px solid var(--editing-line);
  padding: clamp(22px, 3vh, 34px);
  background: #18191c;
}

.editing-timeline__counter {
  display: block;
}

.editing-timeline__counter small {
  display: block;
  color: var(--editing-blue);
  font-family: var(--editing-display);
  font-size: clamp(22px, 1.6vw, 28px);
  font-weight: 690;
  letter-spacing: 0.04em;
  line-height: 1.12;
  text-transform: uppercase;
}

.editing-timeline__copy h3 {
  max-width: 760px;
  color: #f0f0f2;
  font-size: clamp(34px, 3vw, 54px);
  font-weight: 670;
  letter-spacing: -0.035em;
  line-height: 1;
}

.editing-timeline__copy > strong {
  display: block;
  max-width: 760px;
  margin-top: 17px;
  color: #aeb0b7;
  font-size: 18px;
  font-weight: 440;
  line-height: 1.5;
}

.editing-timeline__detail > ol {
  display: grid;
  gap: 0;
  margin: 0;
  padding: 0;
  border-top: 1px solid #34363b;
  list-style: none;
}

.editing-timeline__detail li {
  display: grid;
  min-height: 52px;
  grid-template-columns: 34px 1fr;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #34363b;
  color: #c2c4ca;
  font-size: 15px;
}

.editing-timeline__detail kbd {
  display: grid;
  width: 29px;
  height: 25px;
  place-items: center;
  border: 1px solid #484a50;
  border-radius: 3px;
  background: #242529;
  color: #858890;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 10px;
  box-shadow: inset 0 -1px #111214;
}

@media (max-width: 900px) {
  .editing-timeline__heading {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .editing-timeline__heading > p {
    max-width: 660px;
  }

  .editing-timeline__detail {
    grid-template-columns: 82px 1fr;
  }

  .editing-timeline__detail > ol {
    grid-column: 2;
  }
}

@media (max-width: 640px) {
  .editing-timeline__inner {
    padding-block: 22px 28px;
  }

  .editing-timeline__heading h2 {
    margin-top: 0;
    font-size: clamp(36px, 10.8vw, 48px);
  }

  .editing-timeline__heading > p {
    display: none;
  }

  .editing-timeline__window {
    margin-top: 22px;
    border-radius: 10px;
  }

  .editing-timeline__titlebar > span {
    max-width: 190px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .editing-timeline__titlebar > small,
  .editing-timeline__transport small,
  .editing-timeline__tools i:nth-last-child(-n+2) {
    display: none;
  }

  .editing-timeline__toolbar {
    grid-template-columns: 1fr auto 1fr;
  }

  .editing-timeline__toolbar time {
    font-size: 11px;
  }

  .editing-timeline__sequence {
    grid-template-columns: 52px 1fr;
  }

  .editing-timeline__header-ruler {
    padding: 0;
    justify-content: center;
    font-size: 0;
  }

  .editing-timeline__header-ruler::before {
    color: #6f7279;
    content: 'TC';
    font-size: 8px;
  }

  .editing-timeline__track-head {
    height: 31px;
    grid-template-columns: 1fr;
    justify-items: center;
    padding: 0;
  }

  .editing-timeline__track-head > span,
  .editing-timeline__track-head > small {
    display: none;
  }

  .editing-timeline__track-head > b {
    width: 30px;
    height: 20px;
  }

  .editing-timeline__row {
    height: 31px;
  }

  .editing-timeline__ruler > span:nth-child(2),
  .editing-timeline__ruler > span:nth-child(4) {
    display: none;
  }

  .editing-timeline__clip {
    top: 2px;
    bottom: 2px;
    justify-content: center;
    padding-inline: 2px;
    font-size: 7px;
  }

  .editing-timeline__clip-full,
  .editing-timeline__clip small {
    display: none;
  }

  .editing-timeline__clip-short {
    display: inline;
  }

  .editing-timeline__detail {
    min-height: 286px;
    grid-template-columns: 1fr;
    gap: 13px;
    padding: 18px;
  }

  .editing-timeline__counter {
    width: auto;
  }

  .editing-timeline__copy h3 {
    font-size: 32px;
  }

  .editing-timeline__copy > strong {
    margin-top: 9px;
    font-size: 15px;
  }

  .editing-timeline__detail > ol {
    grid-column: auto;
  }

  .editing-timeline__detail li {
    min-height: 40px;
    font-size: 13px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .editing-timeline__clip {
    transition: none;
  }
}
</style>
