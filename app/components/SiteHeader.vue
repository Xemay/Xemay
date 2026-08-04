<script setup lang="ts">
const menuOpen = ref(false)

const navigation = [
  { label: 'Услуги', href: '/#services' },
  { label: 'Кейсы', href: '/#cases' },
  { label: 'Процесс', href: '/#process' },
  { label: 'FAQ', href: '/#faq' },
]

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="site-header">
    <div class="site-header__bar page-shell">
      <NuxtLink class="site-header__brand" to="/" aria-label="Эльдар Сеттаров, главная">
        Эльдар Сеттаров
      </NuxtLink>

      <nav class="site-header__desktop-nav" aria-label="Основная навигация">
        <NuxtLink v-for="item in navigation" :key="item.href" :to="item.href">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="site-header__actions">
        <TelegramButton class="site-header__desktop-cta" />
        <TelegramButton class="site-header__mobile-cta" label="Написать" compact />
        <button
          class="site-header__menu-button"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'"
          @click="menuOpen = !menuOpen"
        >
          <Icon :name="menuOpen ? 'ph:x' : 'ph:list'" aria-hidden="true" />
        </button>
      </div>
    </div>

    <Transition name="menu-fade">
      <nav
        v-if="menuOpen"
        id="mobile-menu"
        class="site-header__mobile-menu"
        aria-label="Мобильная навигация"
      >
        <div class="page-shell">
          <NuxtLink
            v-for="item in navigation"
            :key="item.href"
            :to="item.href"
            @click="closeMenu"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </header>
  <div class="site-header__spacer" aria-hidden="true" />
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: var(--header-height);
  border-bottom: 1px solid rgb(255 255 255 / 0.1);
  background: rgb(5 5 6 / 0.78);
  color: #f5f5f7;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.04);
  -webkit-backdrop-filter: saturate(180%) blur(22px);
  backdrop-filter: saturate(180%) blur(22px);
}

.site-header__spacer {
  width: 100%;
  height: var(--header-height);
  background: #050506;
}

.site-header__bar {
  display: grid;
  height: 64px;
  grid-template-columns: 280px 1fr 230px;
  align-items: center;
}

.site-header__brand {
  width: max-content;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.site-header__desktop-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(18px, 2.5vw, 38px);
  color: #a1a1a6;
  font-size: 13px;
}

.site-header__desktop-nav a,
.site-header__brand {
  transition: color 180ms ease;
}

.site-header__desktop-nav a:hover,
.site-header__brand:hover {
  color: #ffffff;
}

.site-header__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

.site-header__desktop-cta {
  min-width: 184px;
  min-height: 42px;
  padding: 9px 18px;
  font-size: 15px;
}

.site-header__desktop-cta :deep(.button__telegram-icon) {
  width: 16px;
  height: 16px;
}

.site-header__mobile-cta,
.site-header__menu-button,
.site-header__mobile-menu {
  display: none;
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 180ms ease, transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 1068px) {
  .site-header__bar {
    grid-template-columns: 220px 1fr 210px;
  }
}

@media (max-width: 833px) {
  .site-header__bar {
    grid-template-columns: 1fr auto;
  }

  .site-header__desktop-nav,
  .site-header__desktop-cta {
    display: none;
  }

  .site-header__mobile-cta,
  .site-header__menu-button {
    display: inline-flex;
  }

  .site-header__mobile-cta {
    min-width: 128px;
  }

  .site-header__menu-button {
    width: 44px;
    height: 44px;
    align-items: center;
    justify-content: center;
    border: 0;
    padding: 0;
    background: transparent;
    color: #f5f5f7;
    cursor: pointer;
  }

  .site-header__menu-button :deep(svg) {
    width: 25px;
    height: 25px;
  }

  .site-header__mobile-menu {
    position: absolute;
    top: 64px;
    left: 0;
    display: block;
    width: 100%;
    border-top: 1px solid rgb(255 255 255 / 0.1);
    padding-block: 14px 22px;
    background: rgb(5 5 6 / 0.86);
    box-shadow: 0 16px 28px rgb(0 0 0 / 0.3);
    -webkit-backdrop-filter: saturate(180%) blur(22px);
    backdrop-filter: saturate(180%) blur(22px);
  }

  .site-header__mobile-menu .page-shell {
    display: grid;
  }

  .site-header__mobile-menu a {
    min-height: 48px;
    padding-block: 12px;
    color: #d2d2d7;
  }
}

@media (max-width: 640px) {
  .site-header__brand {
    font-size: 15px;
  }

  .site-header__actions {
    gap: 4px;
  }

  .site-header__mobile-cta {
    min-width: 128px;
  }
}

@media (max-width: 419px) {
  .site-header__mobile-cta {
    min-width: 112px;
    padding-inline: 14px;
  }

  .site-header__brand {
    max-width: 126px;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .site-header,
  .site-header__mobile-menu {
    background: #050506;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
}
</style>
