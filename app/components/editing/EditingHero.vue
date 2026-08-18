<template>
  <section id="hero" class="editing-hero" aria-labelledby="editing-hero-title">
    <EditingHeader />

    <img
      class="editing-hero__image"
      src="/images/editing/hero-editor.jpg"
      alt="Монтажёр работает над роликом в видеоредакторе"
      width="1376"
      height="1100"
      fetchpriority="high"
    >

    <div class="editing-hero__shade" aria-hidden="true" />

    <div class="editing-shell editing-hero__content">
      <h1 id="editing-hero-title">Снимай. Монтируй.<br>Твори.</h1>
      <p class="editing-hero__description">
        Пошаговый марафон по видеомонтажу для тех, кто хочет создавать видео уверенно и со вкусом.
      </p>

      <div class="editing-hero__actions">
        <a class="editing-button" href="#program">Посмотреть программу</a>
      </div>
    </div>

    <a class="editing-hero__scroll" href="#program" aria-label="Перейти к программе">
      <span />
      Листай к программе
    </a>
  </section>
</template>

<style scoped>
.editing-hero {
  position: relative;
  isolation: isolate;
  display: grid;
  min-height: max(790px, 100svh);
  overflow: hidden;
  align-items: center;
  background: var(--editing-bg);
}

.editing-hero__image,
.editing-hero__shade {
  position: absolute;
  z-index: -2;
  inset: 0;
  width: 100%;
  height: 100%;
}

.editing-hero__image {
  object-fit: cover;
  object-position: 58% center;
  filter: saturate(0.72) contrast(1.05);
  scale: 1.012;
}

.editing-hero__shade {
  z-index: -1;
  background:
    linear-gradient(90deg, #0e0f12 0%, rgb(14 15 18 / 0.98) 20%, rgb(14 15 18 / 0.79) 45%, rgb(14 15 18 / 0.28) 73%, rgb(14 15 18 / 0.18)),
    linear-gradient(180deg, rgb(14 15 18 / 0.7), transparent 28%, transparent 68%, #121315 100%);
}

.editing-hero__content {
  padding-block: 120px 98px;
}

.editing-hero h1 {
  max-width: 760px;
  margin-top: 0;
  color: #f4f4f5;
  font-family: var(--editing-display);
  font-size: clamp(62px, 6.3vw, 104px);
  font-weight: 600;
  letter-spacing: -0.045em;
  line-height: 1;
  text-transform: uppercase;
  text-wrap: balance;
}

.editing-hero__description {
  max-width: 600px;
  margin-top: 13px;
  color: #b1b2b8;
  font-size: clamp(16px, 1.25vw, 19px);
  line-height: 1.55;
}

.editing-hero__benefits {
  display: grid;
  width: min(650px, 100%);
  grid-template-columns: repeat(3, 1fr);
  margin: 30px 0 0;
  padding: 0;
  border-top: 1px solid rgb(255 255 255 / 0.18);
  border-bottom: 1px solid rgb(255 255 255 / 0.18);
  background: rgb(18 19 21 / 0.5);
  list-style: none;
}

.editing-hero__benefits li {
  display: grid;
  min-height: 64px;
  grid-template-columns: 31px 1fr 16px;
  align-items: center;
  gap: 8px;
  border-right: 1px solid rgb(255 255 255 / 0.13);
  padding: 10px 12px;
}

.editing-hero__benefits li:last-child {
  border-right: 0;
}

.editing-hero__benefits li > span {
  color: var(--editing-blue);
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 11px;
  font-weight: 750;
}

.editing-hero__benefits p {
  color: #dadbdf;
  font-size: 12px;
  line-height: 1.25;
}

.editing-hero__benefits small {
  color: #73767d;
  font-size: 10px;
  text-align: center;
}

.editing-hero__actions {
  display: flex;
  align-items: stretch;
  gap: 16px;
  margin-top: 30px;
}

.editing-hero__meta {
  display: flex;
  min-height: 58px;
  align-items: center;
  gap: 11px;
  border: 1px solid rgb(255 255 255 / 0.18);
  border-radius: 8px;
  padding: 12px 17px;
  background: rgb(25 26 29 / 0.72);
  color: #b6b8be;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 11px;
  white-space: nowrap;
}

.editing-hero__meta i {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #62656c;
}

.editing-hero__sequence {
  position: absolute;
  right: max(36px, calc((100vw - 1400px) / 2));
  bottom: 55px;
  width: min(650px, 45vw);
  overflow: hidden;
  border: 1px solid #46484f;
  border-radius: 13px;
  background: #18191c;
  box-shadow: 0 24px 70px rgb(0 0 0 / 0.52), inset 0 1px rgb(255 255 255 / 0.07);
  color: #c9cbd0;
}

.editing-hero__titlebar {
  position: relative;
  display: grid;
  height: 34px;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 1px solid #111214;
  padding-inline: 12px;
  background: #2b2c30;
  font-size: 10px;
}

.editing-hero__titlebar > span {
  color: #c7c8cc;
  font-weight: 620;
}

.editing-hero__titlebar > small {
  justify-self: end;
  color: #74777e;
  font-size: 9px;
}

.editing-hero__lights {
  display: flex;
  gap: 7px;
}

.editing-hero__lights i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff5f57;
}

.editing-hero__lights i:nth-child(2) { background: #febc2e; }
.editing-hero__lights i:nth-child(3) { background: #28c840; }

.editing-hero__toolbar {
  display: grid;
  height: 37px;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 1px solid #37393e;
  padding-inline: 12px;
  background: #202125;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 9px;
}

.editing-hero__toolbar > div {
  display: flex;
  align-items: center;
  gap: 9px;
}

.editing-hero__toolbar b {
  display: grid;
  width: 23px;
  height: 23px;
  place-items: center;
  border: 1px solid #5f58c8;
  background: #211c4e;
  color: #aaa4ff;
  font-size: 10px;
}

.editing-hero__toolbar time {
  color: var(--editing-blue);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}

.editing-hero__toolbar > small {
  justify-self: end;
  color: #73767d;
}

.editing-hero__ruler {
  display: grid;
  height: 25px;
  grid-template-columns: repeat(4, 1fr);
  align-items: end;
  margin-left: 42px;
  padding: 0 4px 5px;
  background:
    repeating-linear-gradient(90deg, #5a5c62 0 1px, transparent 1px 16px),
    #18191c;
  background-position-y: bottom;
  background-size: auto 6px;
  background-repeat: repeat-x;
  color: #777a81;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 8px;
}

.editing-hero__track {
  display: grid;
  height: 31px;
  grid-template-columns: 42px 1fr;
  border-top: 1px solid #303237;
}

.editing-hero__track > b {
  display: grid;
  place-items: center;
  border-right: 1px solid #0c0d0f;
  background: #24262a;
  color: #5da8f7;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 9px;
}

.editing-hero__track > div {
  position: relative;
  overflow: hidden;
  background: repeating-linear-gradient(90deg, transparent 0 47px, rgb(255 255 255 / 0.025) 48px);
}

.clip {
  position: absolute;
  top: 3px;
  bottom: 3px;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 0.16);
  padding: 3px 5px;
  color: rgb(255 255 255 / 0.82);
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 7px;
  font-style: normal;
  white-space: nowrap;
}

.clip--violet { background: #6f5fb0; }
.clip--blue { background: #3e63a7; }
.clip--audio {
  background:
    repeating-linear-gradient(90deg, transparent 0 3px, rgb(223 255 245 / 0.22) 3px 4px, transparent 4px 7px),
    #117e63;
}

.clip--v2-a { left: 28%; width: 28%; }
.clip--v2-b { left: 58%; width: 24%; }
.clip--v1-a { left: 1%; width: 24%; }
.clip--v1-b { left: 27%; width: 39%; }
.clip--v1-c { left: 68%; width: 31%; }
.clip--a1-a { left: 4%; width: 43%; }
.clip--a1-b { left: 49%; width: 48%; }

.editing-hero__playhead {
  position: absolute;
  top: 71px;
  bottom: 0;
  left: 63%;
  width: 1px;
  background: var(--editing-blue);
  box-shadow: 0 0 7px rgb(45 140 255 / 0.7);
}

.editing-hero__playhead::before {
  position: absolute;
  top: 0;
  left: -5px;
  width: 11px;
  height: 8px;
  background: var(--editing-blue);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  content: '';
}

.editing-hero__scroll {
  position: absolute;
  right: 24px;
  bottom: 32px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #73767d;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
}

.editing-hero__scroll span {
  width: 1px;
  height: 38px;
  background: linear-gradient(var(--editing-blue), transparent);
}

@media (max-width: 1100px) {
  .editing-hero__sequence {
    width: min(560px, 44vw);
    opacity: 0.88;
  }

  .editing-hero__scroll {
    display: none;
  }
}

@media (max-width: 820px) {
  .editing-hero {
    min-height: max(760px, 100svh);
  }

  .editing-hero__image {
    object-position: 63% center;
    opacity: 0.7;
  }

  .editing-hero__shade {
    background:
      linear-gradient(90deg, #0e0f12 0%, rgb(14 15 18 / 0.91) 58%, rgb(14 15 18 / 0.45)),
      linear-gradient(180deg, rgb(14 15 18 / 0.58), transparent 50%, #121315 84%);
  }

  .editing-hero__content {
    padding-block: 112px 88px;
  }
}

@media (max-width: 640px) {
  .editing-hero {
    min-height: max(720px, 100svh);
  }

  .editing-hero__content {
    padding-block: 102px 76px;
  }

  .editing-hero h1 {
    margin-top: 0;
    font-size: clamp(48px, 13vw, 62px);
    letter-spacing: -0.06em;
    line-height: 1;
  }


  .editing-hero__description {
    font-size: 15px;
  }

  .editing-hero__actions {
    margin-top: 24px;
  }
}
</style>
