export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(element, binding) {
      const target = element as HTMLElement & {
        __revealObserver?: IntersectionObserver
      }

      target.classList.add('reveal')

      if (binding.value === 'delay') {
        target.classList.add('reveal--delay')
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        target.classList.add('is-visible')
        return
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return
          target.classList.add('is-visible')
          observer.disconnect()
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
      )

      observer.observe(target)
      target.__revealObserver = observer
    },
    unmounted(element) {
      const target = element as HTMLElement & {
        __revealObserver?: IntersectionObserver
      }
      target.__revealObserver?.disconnect()
    },
  })
})
