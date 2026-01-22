"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { createPortal } from "react-dom"
import { ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react"

const caseStudies = [
  {
    id: 1,
    title: "Adadelta",
    developer: "xemay4ik",
    description:
      `Точка А\n
Ранее на сервере использовался стандартный RPG-бот, который работал только для уже вовлечённых игроков. Новички быстро отваливались, потому что не понимали, как играть. Предыдущий бот был ограничен фиксированным списком предметов и не поддерживал кастомные механики. Создатель сервера хотел создать нового бота для полной автоматизации RPG-процессов, внедрения автоматических квестов и инструментов администрирования в Discord.\n
Точка Б\n
—Решил проблему ручных расчетов, разработав кастомную систему с автоматической боёвкой, экономикой и квестами.\n
—Сделал акцент на автоматизированном анкетировании и обучении: бот пошагово вводит новичков в игровой процесс через понятный интерфейс и навигацию.\n
—Дополнительно я реализовал менеджер-меню для управления игроками и контентом, а бот содержит 100+ команд, объединённых в единую систему.\n
Результат\n
В итоге сервер стабильно работает, новички быстрее вовлекаются в игру, активность игроков и удержание выросли, а администрация получила простой и практичный инструмент для управления крупным RPG-проектом без ручной работы.`, 
    technologies: ["Python", "uv", "Ruff", "MySQL"],
    images: [
      "ada1.png",
      "ada2.png",
      "ada3.png",
      "ada4.png"
    ],
    links: {
      live: "https://discord.gg/ewSFcePUZR",
    },
  },
]

function ImageGallery({ images, contentHeight }: { images: string[], contentHeight: number }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  const openFullscreen = () => setIsFullscreen(true)
  const closeFullscreen = () => setIsFullscreen(false)

  useEffect(() => {
    if (!isFullscreen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFullscreen()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }

    // Safari fix: use both properties
    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.width = "100%"
    document.body.style.top = `-${window.scrollY}px`
    
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      const scrollY = document.body.style.top
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
      document.body.style.top = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isFullscreen, goToPrevious, goToNext])

  // Рассчитываем высоту галереи на основе высоты контента
  const galleryHeight = contentHeight > 0 ? `${Math.min(contentHeight, 600)}px` : '400px'

  return (
    <>
      <div className="relative group" ref={galleryRef}>
        {/* Main Image - адаптивная высота */}
        <div 
          className="relative rounded-xl overflow-hidden bg-muted/30 cursor-pointer"
          style={{ height: galleryHeight }}
          onClick={openFullscreen}
        >
          <img
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Project screenshot ${currentIndex + 1}`}
            className="w-full h-full object-contain transition-opacity duration-300"
          />

          {/* Glass overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          {/* Click to expand hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="glass-card px-3 py-1.5 rounded-lg text-sm text-foreground/80">
              Нажми для увеличения
            </span>
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 glass-card p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 glass-card p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-4"
                    : "bg-foreground/30 hover:bg-foreground/50"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal - using portal and high z-index for Safari compatibility */}
      {isFullscreen && isMounted && createPortal(
        <div 
          className="fixed inset-0 flex items-center justify-center"
          style={{
            zIndex: 99999,
            backgroundColor: "rgba(6, 6, 15, 0.98)",
            WebkitBackdropFilter: "blur(12px)",
            backdropFilter: "blur(12px)",
          }}
          onClick={closeFullscreen}
        >
          {/* Close button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 p-3 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: "rgba(20, 20, 30, 0.8)",
              border: "1px solid rgba(60, 60, 80, 0.3)",
              zIndex: 100000,
            }}
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>

          {/* Fullscreen Image */}
          <div 
            className="relative flex items-center justify-center"
            style={{
              width: "100%",
              height: "100%",
              padding: "60px 16px 80px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Project screenshot ${currentIndex + 1}`}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: "rgba(20, 20, 30, 0.8)",
                  border: "1px solid rgba(60, 60, 80, 0.3)",
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: "rgba(20, 20, 30, 0.8)",
                  border: "1px solid rgba(60, 60, 80, 0.3)",
                }}
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-foreground" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-6"
                      : "bg-foreground/30 hover:bg-foreground/50"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Image counter */}
          <div 
            className="absolute top-4 left-4 px-4 py-2 rounded-lg"
            style={{
              backgroundColor: "rgba(20, 20, 30, 0.8)",
              border: "1px solid rgba(60, 60, 80, 0.3)",
            }}
          >
            <span className="text-foreground text-sm">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export function CaseStudiesSection() {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  // Эффект для расчета высоты контента после рендера
  useEffect(() => {
    // Можно добавить ресайз обсервер для адаптивности
    const handleResize = () => {
      // Пересчет высоты при изменении размера окна
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Кейсы</h2>

      <div className="space-y-16">
        {caseStudies.map((study, index) => {
          // Вычисляем высоту контента для текущего кейса
          const contentHeight = contentRefs.current[index]?.offsetHeight || 0
          
          return (
            <article
              key={study.id}
              className={`glass-card rounded-3xl p-6 md:p-8 lg:p-10 transition-all duration-500 hover:shadow-[0_20px_60px_oklch(0_0_0/0.4)]`}
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ${
                  index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Image Gallery */}
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <ImageGallery images={study.images} contentHeight={contentHeight} />
                </div>

                {/* Content */}
                <div 
                  ref={el => contentRefs.current[index] = el}
                  className="space-y-6" 
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
                      {study.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-pretty">
                      {study.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <a
                      href={study.links.live}
                      className="glass-card glass-card-hover px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-105 text-foreground"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ссылка
                    </a>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}