<script setup lang="ts">
const outcomes = [
  {
    number: '01',
    title: 'Ролик для своего проекта',
    text: 'Собери промо, видео для соцсетей или историю о продукте — с понятной структурой и чистым звуком.',
    meta: 'project_01.mp4',
  },
  {
    number: '02',
    title: 'Первая работа в портфолио',
    text: 'Не учебный обрывок, а законченная работа, которую можно показать клиенту или работодателю.',
    meta: 'portfolio_cut.mov',
  },
  {
    number: '03',
    title: 'Процесс, который повторишь',
    text: 'После марафона у тебя останется маршрут от идеи и исходников до экспорта готового видео.',
    meta: 'workflow.template',
  },
]

</script>

<template>
  <section id="outcomes" class="editing-outcomes editing-section" aria-labelledby="outcomes-title">
    <div class="editing-shell">
      <div class="editing-outcomes__heading">
        <div>
          <h2 id="outcomes-title">Не просто посмотришь.<br>Соберёшь своё.</h2>
        </div>
        <p>На выходе — не набор повторённых упражнений, а готовая работа и понятная схема, по которой можно собрать следующую.</p>
      </div>

      <div class="delivery-window">
        <div class="delivery-window__chrome">
          <div class="delivery-window__traffic" aria-hidden="true"><i /><i /><i /></div>
          <span>Final_project_v12.prproj</span>
          <small>Сохранено</small>
        </div>

        <div class="delivery-window__body">
          <div class="delivery-preview">
            <div class="delivery-panel-title">
              <span>Program: финальная версия</span>
              <small>Fit ⌄</small>
            </div>
            <div class="delivery-preview__screen">
              <div class="delivery-preview__safe" aria-hidden="true" />
              <span>PROJECT / 01</span>
              <strong>Твой<br>ролик</strong>
              <p>От исходников до финального кадра</p>
              <i aria-hidden="true">▶</i>
            </div>
            <div class="delivery-preview__controls" aria-hidden="true">
              <time>00:01:00:00</time>
              <div><span>◀</span><b>▶</b><span>▶│</span></div>
              <small>1/2</small>
            </div>
          </div>

          <div class="delivery-results">
            <div class="delivery-panel-title">
              <span>Project: результат</span>
              <small>3 элемента</small>
            </div>
            <article v-for="outcome in outcomes" :key="outcome.number">
              <span>{{ outcome.number }}</span>
              <div>
                <small>{{ outcome.meta }}</small>
                <h3>{{ outcome.title }}</h3>
                <p>{{ outcome.text }}</p>
              </div>
            </article>
            <div class="delivery-results__footer" aria-hidden="true">
              <span>▦</span><span>☷</span><i /><small>3 / 3</small>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.editing-outcomes { background: #101012; }

.editing-outcomes__heading {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.62fr);
  align-items: end;
  gap: 64px;
}

.editing-outcomes h2 { margin-top: 16px; }

.editing-outcomes__heading > p {
  max-width: 510px;
  color: var(--editing-muted, #a6a6ad);
  font-size: 17px;
  line-height: 1.65;
}

.delivery-window {
  overflow: hidden;
  margin-top: 64px;
  border: 1px solid var(--editing-line, #37373c);
  border-radius: 14px;
  background: #161618;
  box-shadow: 0 28px 70px rgb(0 0 0 / 0.3);
}

.delivery-window__chrome {
  display: grid;
  min-height: 43px;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 1px solid var(--editing-line, #37373c);
  padding: 0 14px;
  background: #28282b;
  color: #c4c4c9;
  font-size: 12px;
}

.delivery-window__traffic { display: flex; gap: 8px; }

.delivery-window__traffic i {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff5f57;
  box-shadow: inset 0 0 0 0.5px rgb(0 0 0 / 0.3);
}

.delivery-window__traffic i:nth-child(2) { background: #febc2e; }
.delivery-window__traffic i:nth-child(3) { background: #28c840; }

.delivery-window__chrome > small {
  justify-self: end;
  color: #74747b;
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.delivery-window__body {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(360px, 1.1fr);
  min-height: 500px;
  border-bottom: 1px solid var(--editing-line, #37373c);
}

.delivery-panel-title {
  display: flex;
  min-height: 35px;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  border-bottom: 1px solid var(--editing-line, #37373c);
  padding: 0 12px;
  background: #242427;
  color: #d6d6da;
  font-size: 11px;
}

.delivery-panel-title small { color: #74747b; font-size: 9px; }

.delivery-preview {
  display: flex;
  min-width: 0;
  flex-direction: column;
  border-right: 1px solid var(--editing-line, #37373c);
  background: #111113;
}

.delivery-preview__screen {
  position: relative;
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  overflow: hidden;
  margin: 22px;
  padding: clamp(28px, 5vw, 60px);
  background-color: #15131e;
  background-image:
    linear-gradient(90deg, transparent 49.8%, rgb(255 255 255 / 0.055) 50%, transparent 50.2%),
    linear-gradient(transparent 49.8%, rgb(255 255 255 / 0.055) 50%, transparent 50.2%);
  color: #f4f4f6;
}

.delivery-preview__screen::before {
  position: absolute;
  inset: 0;
  width: 8px;
  background: var(--editing-violet, #9a72ff);
  content: '';
}

.delivery-preview__screen::after {
  position: absolute;
  top: 14%;
  right: 12%;
  width: 82px;
  height: 82px;
  border: 1px solid var(--editing-blue, #2f8cff);
  content: '';
  transform: rotate(16deg);
}

.delivery-preview__safe {
  position: absolute;
  inset: 7%;
  border: 1px solid rgb(255 255 255 / 0.1);
}

.delivery-preview__screen > span {
  position: relative;
  color: var(--editing-teal, #2ac7a0);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
}

.delivery-preview__screen strong {
  position: relative;
  margin-top: 12px;
  font-family: var(--editing-display);
  font-size: clamp(50px, 7vw, 92px);
  font-stretch: condensed;
  font-weight: 800;
  letter-spacing: -0.055em;
  line-height: 0.72;
  text-transform: uppercase;
}

.delivery-preview__screen p {
  position: relative;
  max-width: 250px;
  margin-top: 24px;
  color: #a2a2aa;
  font-size: 11px;
  line-height: 1.45;
}

.delivery-preview__screen > i {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 0.18);
  border-radius: 50%;
  background: rgb(20 20 23 / 0.78);
  color: #ededf0;
  font-size: 12px;
  font-style: normal;
  transform: translate(-50%, -50%);
}

.delivery-preview__controls {
  display: grid;
  min-height: 39px;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 12px;
  background: #1d1d20;
  color: #85858c;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
}

.delivery-preview__controls time { color: var(--editing-blue, #2f8cff); }
.delivery-preview__controls div { display: flex; gap: 18px; }
.delivery-preview__controls b { color: #f3f3f5; font-weight: 400; }
.delivery-preview__controls small { justify-self: end; }

.delivery-results { display: flex; min-width: 0; flex-direction: column; background: #1b1b1e; }

.delivery-results article {
  display: grid;
  min-height: 174px;
  grid-template-columns: 46px 1fr;
  gap: 14px;
  align-items: start;
  border-bottom: 1px solid var(--editing-line, #37373c);
  padding: 27px 22px;
  transition: background-color 180ms ease;
}

.delivery-results article:hover { background: #242428; }

.delivery-results article > span {
  display: grid;
  width: 38px;
  height: 31px;
  place-items: center;
  border-left: 3px solid var(--editing-blue, #2f8cff);
  background: #26364e;
  color: #e9f2ff;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
}

.delivery-results article:nth-of-type(2) > span {
  border-color: var(--editing-violet, #9a72ff);
  background: #352c50;
}

.delivery-results article:nth-of-type(3) > span {
  border-color: var(--editing-teal, #2ac7a0);
  background: #20423b;
}

.delivery-results article small {
  color: #696970;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
}

.delivery-results h3 {
  margin-top: 8px;
  color: #f0f0f2;
  font-family: var(--editing-display);
  font-size: clamp(25px, 2vw, 30px);
  font-stretch: condensed;
  font-weight: 750;
  letter-spacing: -0.02em;
  line-height: 1.05;
  text-transform: uppercase;
}

.delivery-results p {
  max-width: 680px;
  margin-top: 12px;
  color: var(--editing-muted, #9d9da4);
  font-size: 15px;
  line-height: 1.55;
}

.delivery-results__footer {
  display: flex;
  min-height: 35px;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  padding-inline: 12px;
  color: #74747b;
  font-size: 11px;
}

.delivery-results__footer i { height: 3px; flex: 1; background: #303034; }
.delivery-results__footer small { font-size: 9px; }

.outcome-timeline { min-width: 0; }

.outcome-timeline__editor {
  position: relative;
  min-height: 230px;
  overflow: hidden;
  padding-top: 31px;
  background-color: #171719;
  background-image: linear-gradient(90deg, rgb(255 255 255 / 0.035) 1px, transparent 1px);
  background-size: calc((100% - 68px) / 8) 100%;
  background-position: 68px 0;
}

.outcome-timeline__ruler {
  position: absolute;
  inset: 0 0 auto 68px;
  display: flex;
  height: 31px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--editing-line, #37373c);
  padding: 0 8px;
  color: #6f6f76;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 8px;
}

.outcome-track {
  display: grid;
  grid-template-columns: 68px 1fr;
  border-bottom: 1px solid #303034;
}

.outcome-track__label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-right: 1px solid var(--editing-line, #37373c);
  padding: 0 10px;
  background: #202023;
  color: #83838a;
  font-size: 8px;
}

.outcome-track__label b {
  color: var(--editing-blue, #2f8cff);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
}

.outcome-track--video { min-height: 96px; }

.outcome-track__clips {
  display: grid;
  min-width: 0;
  grid-template-columns: 0.72fr 1.05fr 1.2fr 0.8fr;
  gap: 2px;
  align-items: center;
  padding: 7px 4px;
}

.outcome-track__clips > div {
  display: flex;
  height: 78px;
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 0.18);
  padding: 8px;
  color: #f5f5f7;
}

.outcome-track__clips span { font-size: 10px; font-weight: 650; }
.outcome-track__clips small { margin-top: 4px; color: rgb(255 255 255 / 0.62); font-size: 8px; line-height: 1.25; }
.outcome-track__clips .clip--violet { background: #654aa0; }
.outcome-track__clips .clip--blue { background: #285aa5; }
.outcome-track__clips .clip--magenta { background: #91407f; }
.outcome-track__clips .clip--teal { background: #167f69; }

.outcome-track--audio { min-height: 74px; }

.outcome-track__audio { display: flex; align-items: center; padding: 7px 14% 7px 4px; }

.outcome-track__audio i {
  position: relative;
  width: 100%;
  height: 52px;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 0.16);
  background: #116b58;
}

.outcome-track__audio i::after {
  position: absolute;
  inset: 8px 4px;
  background: repeating-linear-gradient(90deg, rgb(111 255 210 / 0.72) 0 1px, transparent 1px 4px);
  clip-path: polygon(0 50%, 3% 15%, 6% 78%, 10% 25%, 14% 90%, 20% 35%, 25% 70%, 30% 18%, 36% 84%, 43% 38%, 48% 72%, 53% 22%, 59% 88%, 64% 32%, 70% 67%, 76% 12%, 82% 76%, 88% 25%, 94% 82%, 100% 50%, 100% 53%, 0 53%);
  content: '';
}

.outcome-timeline__playhead {
  position: absolute;
  top: 20px;
  bottom: 0;
  left: 88%;
  width: 1px;
  background: var(--editing-blue, #2f8cff);
  box-shadow: 0 0 8px rgb(47 140 255 / 0.4);
}

.outcome-timeline__playhead > i {
  position: absolute;
  top: 0;
  left: 50%;
  width: 10px;
  height: 10px;
  background: var(--editing-blue, #2f8cff);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform: translateX(-50%);
}

.outcome-timeline__status {
  display: flex;
  min-height: 46px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-top: 1px solid var(--editing-line, #37373c);
  padding: 0 14px;
  background: #202023;
  color: #d9d9dd;
  font-size: 11px;
}

.outcome-timeline__status span { display: flex; align-items: center; gap: 8px; }

.outcome-timeline__status span i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--editing-teal, #2ac7a0);
  box-shadow: 0 0 0 3px rgb(42 199 160 / 0.12);
}

.outcome-timeline__status small {
  color: #74747b;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9px;
}

@media (max-width: 900px) {
  .editing-outcomes__heading { grid-template-columns: 1fr; gap: 20px; }
  .delivery-window__body { grid-template-columns: 1fr; }
  .delivery-preview { min-height: 460px; border-right: 0; border-bottom: 1px solid var(--editing-line, #37373c); }
}

@media (max-width: 620px) {
  .delivery-window { margin-top: 42px; border-radius: 10px; }
  .delivery-window__chrome { grid-template-columns: 1fr auto; }
  .delivery-window__chrome > span { display: none; }
  .delivery-preview { min-height: 390px; }
  .delivery-preview__screen { margin: 12px; padding: 34px 24px; }

  .delivery-results article {
    min-height: auto;
    grid-template-columns: 38px 1fr;
    gap: 12px;
    padding: 18px 12px;
  }

  .delivery-results h3 {
    font-size: 24px;
  }

  .delivery-results p {
    font-size: 14px;
  }

  .delivery-results article > span { width: 32px; }
  .outcome-timeline__editor { min-height: 324px; padding-top: 31px; }
  .outcome-timeline__ruler { left: 44px; }
  .outcome-track { grid-template-columns: 44px 1fr; }
  .outcome-track--video { min-height: 212px; }

  .outcome-track__clips {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  .outcome-track__clips > div { height: 94px; }
  .outcome-track__label { padding: 0 7px; }
  .outcome-track__label small { display: none; }
  .outcome-track__audio { padding-right: 5%; }
  .outcome-timeline__playhead { left: 91%; }
  .outcome-timeline__status { align-items: flex-start; flex-direction: column; padding-block: 11px; }
}

@media (prefers-reduced-motion: reduce) {
  .delivery-results article { transition: none; }
}
</style>
