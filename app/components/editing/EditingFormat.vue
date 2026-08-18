<script setup lang="ts">
const formats = [
  {
    icon: 'lesson',
    title: 'Короткие уроки',
    text: 'Одна тема за раз — без длинных лекций и лишней теории.',
    color: 'var(--editing-blue, #2f8cff)',
  },
  {
    icon: 'practice',
    title: 'Практика сразу',
    text: 'После каждого блока применяешь приём в собственном ролике.',
    color: 'var(--editing-teal, #2ac7a0)',
  },
  {
    icon: 'editors',
    title: 'Два редактора',
    text: 'Premiere Pro для монтажа, After Effects — для графики и движения.',
    color: 'var(--editing-violet, #9a72ff)',
  },
  {
    icon: 'archive',
    title: 'Материалы навсегда',
    text: 'Возвращайся к урокам, исходникам и памяткам после марафона.',
    color: 'var(--editing-amber, #f1b94a)',
  },
]
</script>

<template>
  <section id="format" class="editing-format editing-section" aria-labelledby="format-title">
    <div class="editing-shell">
      <div class="editing-format__intro">
        <div>
          <h2 id="format-title">Сложные программы.<br>Понятный маршрут.</h2>
        </div>
        <p>
          Без занудного изучения тысяч ненужных функций. Покажем только основной функционал и плагины для программ.
        </p>
      </div>

      <div class="format-workspace">
        <div class="format-workspace__chrome">
          <div class="format-workspace__traffic" aria-hidden="true"><i /><i /><i /></div>
          <span>Editing_Marathon.prproj</span>
        </div>

        <div class="format-workspace__tabs" aria-hidden="true">
          <span class="is-active">Монтаж</span>
          <span>Графика</span>
          <span>Звук</span>
          <span>Экспорт</span>
          <small>WORKSPACE</small>
        </div>

        <div class="format-workspace__body">
          <aside class="format-bin" aria-label="Состав программы">
            <div class="format-panel-title">
              <span>Project: Марафон</span>
              <small>4 элемента</small>
            </div>

            <article
              v-for="item in formats"
              :key="item.title"
              class="format-bin__item"
              :style="{ '--asset-color': item.color }"
            >
              <span class="format-bin__asset" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <template v-if="item.icon === 'lesson'">
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="m10.4 8.8 5 3.2-5 3.2Z" fill="currentColor" stroke="none" />
                  </template>
                  <template v-else-if="item.icon === 'practice'">
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="m7.7 12.2 2.8 2.8 5.9-6" />
                  </template>
                  <template v-else-if="item.icon === 'editors'">
                    <rect x="3.5" y="5" width="11" height="13" rx="1.5" />
                    <rect x="9.5" y="7" width="11" height="12" rx="1.5" />
                  </template>
                  <template v-else>
                    <path d="M4 8.5h16v10.5H4z" />
                    <path d="M6.5 8.5V5h4.2l2.2 3.5M9 13h6" />
                  </template>
                </svg>
              </span>
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
            </article>

            <div class="format-bin__status" aria-hidden="true">
              <span>▦</span><span>☷</span><i /><small>100%</small>
            </div>
          </aside>

          <div class="format-program">
            <div class="format-program__monitor">
              <div class="format-panel-title">
                <span>Program: твой ролик</span>
                <small>Fit ⌄</small>
              </div>
              <div class="format-program__stage">
                <div class="format-program__safe" aria-hidden="true" />
                <span>Урок → действие</span>
                <strong>Теория подкрепляется <br> практикой</strong>
              </div>
              <div class="format-program__controls" aria-hidden="true">
                <time>00:00:24:12</time>
                <div><span>│◀</span><span>◀</span><span class="is-play">▶</span><span>▶│</span></div>
                <small>Full</small>
              </div>
            </div>

            <div class="format-timeline" aria-label="Пример учебного таймлайна">
              <div class="format-panel-title">
                <span>Sequence: практика_01</span>
                <small>00:00:30:00</small>
              </div>
              <div class="format-timeline__canvas">
                <div class="format-timeline__ruler" aria-hidden="true">
                  <span>00:00</span><span>00:10</span><span>00:20</span><span>00:30</span>
                </div>
                <div class="format-track">
                  <span>V1</span>
                  <div>
                    <i class="clip clip--blue">Урок</i>
                    <i class="clip clip--violet">Приём</i>
                    <i class="clip clip--blue">Твоя сцена</i>
                  </div>
                </div>
                <div class="format-track">
                  <span>A1</span>
                  <div><i class="clip clip--teal clip--wave">практика.wav</i></div>
                </div>
                <div class="format-timeline__playhead" aria-hidden="true"><i /></div>
              </div>
            </div>
          </div>
        </div>

        <div class="format-workspace__apps" aria-label="Редакторы в программе">
          <div>
            <span class="editing-app editing-app--premiere">Pr</span>
            <p><strong>Premiere Pro</strong><small>Кадры · ритм · звук · цвет</small></p>
          </div>
          <span class="format-workspace__handoff" role="img" aria-label="Dynamic Link">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <path d="M9 7H7a5 5 0 0 0 0 10h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8" />
            </svg>
          </span>
          <div>
            <span class="editing-app editing-app--effects">Ae</span>
            <p><strong>After Effects</strong><small>Титры · анимация · эффекты</small></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.editing-format { background: var(--editing-panel, #171719); }

.editing-format__intro {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.62fr);
  align-items: end;
  gap: 64px;
}

.editing-format__intro h2 { margin-top: 16px; }

.editing-format__intro > p {
  max-width: 510px;
  color: var(--editing-muted, #a6a6ad);
  font-size: 17px;
  line-height: 1.65;
}

.format-workspace {
  overflow: hidden;
  margin-top: 64px;
  border: 1px solid var(--editing-line, #37373c);
  border-radius: 14px;
  background: #151517;
  box-shadow: 0 28px 70px rgb(0 0 0 / 0.28);
}

.format-workspace__chrome {
  position: relative;
  display: grid;
  min-height: 43px;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 1px solid var(--editing-line, #37373c);
  padding: 0 14px;
  background: #28282b;
  color: #c4c4c9;
  font-size: 12px;
  letter-spacing: 0.01em;
}

.format-workspace__traffic { display: flex; gap: 8px; }

.format-workspace__traffic i {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff5f57;
  box-shadow: inset 0 0 0 0.5px rgb(0 0 0 / 0.3);
}

.format-workspace__traffic i:nth-child(2) { background: #febc2e; }
.format-workspace__traffic i:nth-child(3) { background: #28c840; }

.format-workspace__tabs {
  display: flex;
  min-height: 42px;
  align-items: stretch;
  gap: 2px;
  border-bottom: 1px solid var(--editing-line, #37373c);
  padding-inline: 12px;
  background: #1d1d20;
}

.format-workspace__tabs span {
  display: grid;
  min-width: 88px;
  place-items: center;
  border-bottom: 2px solid transparent;
  color: #85858c;
  font-size: 11px;
}

.format-workspace__tabs span.is-active {
  border-color: var(--editing-blue, #2f8cff);
  color: #f0f0f3;
  background: #242427;
}

.format-workspace__tabs small {
  align-self: center;
  margin-left: auto;
  color: #626269;
  font-size: 9px;
  letter-spacing: 0.12em;
}

.format-workspace__body {
  display: grid;
  grid-template-columns: minmax(280px, 0.78fr) minmax(0, 1.8fr);
  min-height: 590px;
}

.format-bin {
  display: flex;
  min-width: 0;
  flex-direction: column;
  border-right: 1px solid var(--editing-line, #37373c);
  background: #1b1b1e;
}

.format-panel-title {
  display: flex;
  min-height: 35px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  border-bottom: 1px solid var(--editing-line, #37373c);
  padding: 0 12px;
  background: #242427;
  color: #d6d6da;
  font-size: 11px;
}

.format-panel-title small { color: #74747b; font-size: 9px; }

.format-bin__item {
  --asset-color: var(--editing-blue, #2f8cff);
  display: grid;
  min-height: 138px;
  grid-template-columns: 46px 1fr;
  gap: 16px;
  align-content: center;
  border-bottom: 1px solid var(--editing-line, #37373c);
  padding: 20px 18px;
  background: #1b1b1e;
  transition: background-color 180ms ease;
}

.format-bin__item:hover { background: #252529; }

.format-bin__asset {
  display: grid;
  width: 40px;
  height: 36px;
  place-items: center;
  border-left: 3px solid var(--asset-color);
  background: color-mix(in srgb, var(--asset-color) 22%, #202023);
  color: #f3f3f5;
}

.format-bin__asset svg {
  width: 22px;
  height: 22px;
  color: var(--asset-color);
}

.format-bin h3 { color: #efeff2; font-size: 18px; font-weight: 650; line-height: 1.3; }

.format-bin p {
  margin-top: 8px;
  color: var(--editing-muted, #9d9da4);
  font-size: 15px;
  line-height: 1.5;
}

.format-bin__status {
  display: flex;
  min-height: 35px;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  border-top: 1px solid var(--editing-line, #37373c);
  padding-inline: 12px;
  color: #74747b;
  font-size: 11px;
}

.format-bin__status i { height: 3px; flex: 1; background: #303034; }
.format-bin__status small { font-size: 9px; }

.format-program {
  display: grid;
  min-width: 0;
  grid-template-rows: minmax(320px, 1.15fr) minmax(220px, 0.85fr);
  background: #131315;
}

.format-program__monitor {
  display: flex;
  min-height: 0;
  flex-direction: column;
  border-bottom: 1px solid var(--editing-line, #37373c);
}

.format-program__stage {
  position: relative;
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 36px;
  background-color: #0d0d0f;
  background-image: linear-gradient(rgb(255 255 255 / 0.025) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.025) 1px, transparent 1px);
  background-size: 32px 32px;
  text-align: center;
}

.format-program__safe {
  position: absolute;
  inset: 12%;
  border: 1px solid rgb(255 255 255 / 0.12);
  pointer-events: none;
}

.format-program__safe::after {
  position: absolute;
  inset: 8%;
  border: 1px dashed rgb(255 255 255 / 0.08);
  content: '';
}

.format-program__stage > span {
  position: relative;
  color: var(--editing-blue, #2f8cff);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.format-program__stage strong {
  position: relative;
  margin-top: 12px;
  color: #f4f4f6;
  font-family: var(--editing-display);
  font-size: clamp(28px, 3.4vw, 52px);
  font-stretch: condensed;
  font-weight: 780;
  letter-spacing: -0.035em;
  line-height: 0.94;
  text-transform: uppercase;
}

.format-program__stage > small { position: relative; margin-top: 14px; color: #898990; font-size: 11px; }

.format-program__controls {
  display: grid;
  min-height: 38px;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 12px;
  background: #1d1d20;
  color: #898990;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
}

.format-program__controls time { color: var(--editing-blue, #2f8cff); }
.format-program__controls div { display: flex; align-items: center; gap: 17px; }
.format-program__controls .is-play { color: #f2f2f4; }
.format-program__controls small { justify-self: end; }

.format-timeline { min-width: 0; }

.format-timeline__canvas {
  position: relative;
  min-height: 185px;
  overflow: hidden;
  padding-top: 29px;
  background-color: #171719;
  background-image: linear-gradient(90deg, rgb(255 255 255 / 0.035) 1px, transparent 1px);
  background-size: 12.5% 100%;
}

.format-timeline__ruler {
  position: absolute;
  inset: 0 0 auto 48px;
  display: flex;
  height: 29px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--editing-line, #37373c);
  padding: 0 9px;
  color: #707077;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 8px;
}

.format-track { display: grid; min-height: 60px; grid-template-columns: 48px 1fr; border-bottom: 1px solid #2c2c30; }

.format-track > span {
  display: grid;
  place-items: center;
  border-right: 1px solid var(--editing-line, #37373c);
  background: #202023;
  color: var(--editing-blue, #2f8cff);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  font-weight: 700;
}

.format-track > div {
  display: grid;
  min-width: 0;
  grid-template-columns: 0.72fr 0.54fr 1.12fr;
  gap: 2px;
  align-items: center;
  padding: 6px 4px;
}

.format-track:nth-of-type(3) > div { grid-template-columns: 1fr; padding-right: 14%; }

.clip {
  position: relative;
  display: flex;
  height: 42px;
  align-items: flex-start;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 0.18);
  padding: 5px 7px;
  color: #f6f6f7;
  font-size: 8px;
  font-style: normal;
}

.clip--blue { background: #285aa5; }
.clip--violet { background: #6950a8; }
.clip--teal { background: #167f69; }

.clip--wave::after {
  position: absolute;
  inset: 17px 4px 4px;
  background: repeating-linear-gradient(90deg, rgb(105 255 209 / 0.7) 0 1px, transparent 1px 4px);
  clip-path: polygon(0 50%, 4% 12%, 8% 70%, 13% 28%, 18% 88%, 25% 38%, 31% 65%, 38% 18%, 44% 78%, 50% 45%, 58% 90%, 66% 20%, 72% 65%, 79% 35%, 87% 80%, 93% 28%, 100% 50%, 100% 53%, 0 53%);
  content: '';
}

.format-timeline__playhead {
  position: absolute;
  top: 19px;
  bottom: 0;
  left: 63%;
  width: 1px;
  background: var(--editing-blue, #2f8cff);
  box-shadow: 0 0 8px rgb(47 140 255 / 0.35);
}

.format-timeline__playhead i {
  position: absolute;
  top: 0;
  left: 50%;
  width: 9px;
  height: 9px;
  background: var(--editing-blue, #2f8cff);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform: translateX(-50%);
}

.format-workspace__apps {
  display: grid;
  min-height: 94px;
  grid-template-columns: auto auto auto 1fr;
  align-items: center;
  gap: 22px;
  border-top: 1px solid var(--editing-line, #37373c);
  padding: 16px 20px;
  background: #202023;
}

.format-workspace__apps > div { display: flex; align-items: center; gap: 12px; }

.editing-app {
  display: grid;
  width: 46px;
  height: 46px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid currentColor;
  border-radius: 5px;
  font-size: 19px;
  font-weight: 700;
}

.editing-app--premiere { color: #c7a9ff; background: #251d48; }
.editing-app--effects { color: #9ab7ff; background: #17244b; }
.format-workspace__apps p { display: grid; gap: 4px; }
.format-workspace__apps strong { color: #ededf0; font-size: 13px; }
.format-workspace__apps small { color: #85858c; font-size: 10px; }

.format-workspace__handoff {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  color: #77777e;
}

.format-workspace__handoff svg {
  width: 24px;
  height: 24px;
  color: var(--editing-violet, #9a72ff);
}

@media (max-width: 940px) {
  .editing-format__intro { grid-template-columns: 1fr; gap: 20px; }
  .format-workspace__body { grid-template-columns: 1fr; }

  .format-bin {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-right: 0;
    border-bottom: 1px solid var(--editing-line, #37373c);
  }

  .format-bin > .format-panel-title, .format-bin__status { grid-column: 1 / -1; }
  .format-bin__item:nth-of-type(odd) { border-right: 1px solid var(--editing-line, #37373c); }
  .format-workspace__apps { grid-template-columns: 1fr auto 1fr; }
}

@media (max-width: 640px) {
  .format-workspace { margin-top: 42px; border-radius: 10px; }
  .format-workspace__chrome { grid-template-columns: 1fr auto; }
  .format-workspace__chrome > span { display: none; }
  .format-workspace__tabs { overflow-x: auto; padding-inline: 6px; }
  .format-workspace__tabs span { min-width: 74px; }
  .format-workspace__tabs small { display: none; }
  .format-bin { grid-template-columns: 1fr; }
  .format-bin__item:nth-of-type(odd) { border-right: 0; }
  .format-bin__item { min-height: 124px; }
  .format-program { grid-template-rows: minmax(300px, auto) 215px; }
  .format-program__stage { padding: 28px 16px; }
  .format-program__controls div { gap: 10px; }
  .format-timeline__ruler { left: 38px; }
  .format-track { grid-template-columns: 38px 1fr; }
  .format-workspace__apps { grid-template-columns: 1fr; gap: 15px; }
  .format-workspace__handoff { margin-left: 6px; }
}

@media (prefers-reduced-motion: reduce) {
  .format-bin__item { transition: none; }
}
</style>
