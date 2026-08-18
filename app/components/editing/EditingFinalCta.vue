<template>
  <section class="editing-final" aria-labelledby="editing-final-title">
    <div class="editing-final__grid" aria-hidden="true" />

    <div class="editing-shell editing-final__inner">
      <div class="editing-final__copy">
        <h2 id="editing-final-title">Готов создать<br>свой первый ролик?</h2>
        <p>
          Присоединяйся к марафону. За четыре недели ты соберёшь своё первое видео и сможешь опубликовать его в соцсетях.
        </p>
        <a class="editing-button" href="#program">Начать монтировать</a>
      </div>

    </div>

    <footer class="editing-footer editing-shell">
      <div class="editing-footer__brand">
        <span>Дизайн-концепт для портфолио. Проект не представляет реальный продукт или компанию. Все названия, тексты и данные вымышлены.</span>
      </div>
      <NuxtLink to="/">Вернуться в портфолио</NuxtLink>
    </footer>
  </section>
</template>

<style scoped>
.editing-final {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: #0e0f12;
}

.editing-final__grid {
  position: absolute;
  z-index: -1;
  inset: 0;
  background:
    linear-gradient(90deg, transparent 0 79px, rgb(255 255 255 / 0.032) 80px),
    linear-gradient(0deg, transparent 0 79px, rgb(255 255 255 / 0.026) 80px);
  background-size: 80px 80px;
  mask-image: linear-gradient(90deg, transparent, #000 45%, #000);
}

.editing-final__inner {
  display: grid;
  min-height: 640px;
  grid-template-columns: 1fr;
  align-items: center;
  padding-block: 120px 96px;
}

.editing-final h2 {
  max-width: 790px;
  margin-top: 0;
  font-size: clamp(52px, 6vw, 88px);
}

.editing-final__copy > p {
  max-width: 610px;
  margin-top: 24px;
  color: var(--editing-muted);
  font-size: 17px;
  line-height: 1.65;
}

.editing-final .editing-button {
  margin-top: 32px;
}

.editing-final__export {
  overflow: hidden;
  border: 1px solid #47494f;
  border-radius: 15px;
  background: #1b1c1f;
  box-shadow: 0 36px 90px rgb(0 0 0 / 0.46), inset 0 1px rgb(255 255 255 / 0.07);
}

.editing-final__titlebar {
  display: grid;
  height: 38px;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 1px solid #0a0b0d;
  padding-inline: 13px;
  background: #2b2c30;
  color: #c9cacf;
  font-size: 10px;
}

.editing-final__titlebar > div {
  display: flex;
  gap: 7px;
}

.editing-final__titlebar i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff5f57;
}

.editing-final__titlebar i:nth-child(2) { background: #febc2e; }
.editing-final__titlebar i:nth-child(3) { background: #28c840; }

.editing-final__titlebar > small {
  justify-self: end;
  color: #777a81;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 8px;
}

.editing-final__preview {
  position: relative;
  aspect-ratio: 16 / 8.4;
  overflow: hidden;
  border-bottom: 1px solid #37393e;
  background: #07080a;
}

.editing-final__preview::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgb(0 0 0 / 0.68));
  content: '';
}

.editing-final__preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 58% center;
  filter: saturate(0.78) contrast(1.06);
}

.editing-final__preview > span,
.editing-final__preview > i {
  position: absolute;
  z-index: 1;
  bottom: 12px;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 9px;
  font-style: normal;
}

.editing-final__preview > span {
  left: 14px;
  color: #eef0f3;
}

.editing-final__preview > i {
  right: 14px;
  border: 1px solid rgb(255 255 255 / 0.18);
  border-radius: 4px;
  padding: 3px 6px;
  background: rgb(16 17 20 / 0.68);
  color: #aeb1b8;
}

.editing-final__settings {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom: 1px solid #37393e;
}

.editing-final__settings > div {
  display: grid;
  min-height: 60px;
  gap: 4px;
  border-right: 1px solid #37393e;
  border-bottom: 1px solid #37393e;
  padding: 11px 14px;
}

.editing-final__settings > div:nth-child(even) { border-right: 0; }
.editing-final__settings > div:nth-last-child(-n+2) { border-bottom: 0; }

.editing-final__settings small {
  color: #777a81;
  font-size: 9px;
}

.editing-final__settings span {
  color: #d6d8dd;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 11px;
}

.editing-final__progress {
  display: grid;
  gap: 10px;
  padding: 16px 14px 12px;
}

.editing-final__progress > div {
  height: 5px;
  overflow: hidden;
  border-radius: 5px;
  background: #34363b;
}

.editing-final__progress > div i {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: #35c46a;
}

.editing-final__progress > span {
  color: #aeb1b8;
  font-size: 10px;
}

.editing-final__progress b {
  color: #35c46a;
}

.editing-final__controls {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1px solid #37393e;
  padding: 11px 13px;
  background: #202125;
}

.editing-final__controls button {
  min-height: 29px;
  border: 1px solid #4b4d54;
  border-radius: 6px;
  padding: 5px 12px;
  background: #2a2b30;
  color: #c5c7cc;
  font-size: 10px;
}

.editing-final__controls button:last-child {
  border-color: #5aa7ff;
  background: #147ce5;
  color: #fff;
}

.editing-footer {
  display: flex;
  min-height: 104px;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  border-top: 1px solid var(--editing-line);
  color: #777a81;
  font-size: 12px;
}

.editing-footer__brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.editing-footer__brand :deep(.editing-mark) {
  width: 34px;
  height: 34px;
  color: var(--editing-blue);
}

.editing-footer > a {
  color: #cdd0d5;
  transition: color 180ms ease;
}

.editing-footer > a:hover {
  color: var(--editing-blue-bright);
}

@media (max-width: 960px) {
  .editing-final__inner {
    min-height: auto;
    grid-template-columns: 1fr;
    gap: 60px;
  }

  .editing-final__export {
    width: min(620px, 100%);
  }
}

@media (max-width: 640px) {
  .editing-final__inner {
    gap: 44px;
    padding-block: 92px 70px;
  }

  .editing-final h2 {
    font-size: 48px;
  }

  .editing-final__copy > p {
    font-size: 15px;
  }

  .editing-final__settings {
    grid-template-columns: 1fr;
  }

  .editing-final__settings > div,
  .editing-final__settings > div:nth-child(even),
  .editing-final__settings > div:nth-last-child(-n+2) {
    border-right: 0;
    border-bottom: 1px solid #37393e;
  }

  .editing-final__settings > div:last-child { border-bottom: 0; }

  .editing-footer {
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    padding-block: 24px;
  }
}
</style>
