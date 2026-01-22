"use client"

import { useState, useEffect, useCallback } from "react"
import { ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react"

const caseStudies = [
  {
    id: 1,
    title: "Adadelta",
    developer: "xemay4ik",
    description:
      "Дискорд бот для RPG сервера Cyber-Infusion. Содержит системы инвентаря, анкет. Реализована автоматическая боевая система с учетом экипированных предметов. Внутреигровой магазин и рынок где торгуют игроки. РП сообщения по таймеру. Квесты и миниигры", 
    technologies: ["Python", "uv", "Ruff", "MySQL"],
    images: [
      "/ada1.png",
      "/ada2.png",
      "/ada3.png",
      "/ada4.png"
    ],
    links: {
      live: "#",
      github: "#",
    },
  }
]

function ImageGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

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

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isFullscreen, goToPrevious, goToNext])

  return (
    <>
      <div className="relative group">
        {/* Main Image - object-contain to show full image */}
        <div 
          className="relative aspect-video rounded-xl overflow-hidden bg-muted/30 cursor-pointer"
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
              Нажмите для увеличения
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

      {/* Fullscreen Modal - using z-[9999] to ensure it's above everything */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/98 backdrop-blur-md"
          onClick={closeFullscreen}
        >
          {/* Close button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 glass-card p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>

          {/* Fullscreen Image */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Project screenshot ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 glass-card p-3 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 glass-card p-3 rounded-full transition-all duration-300 hover:scale-110"
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
          <div className="absolute top-4 left-4 glass-card px-4 py-2 rounded-lg">
            <span className="text-foreground text-sm">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export function CaseStudiesSection() {
  return (
    <section className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Примеры работ</h2>
      <div className="space-y-16">
        {caseStudies.map((study, index) => (
          <article
            key={study.id}
            className={`glass-card rounded-3xl p-6 md:p-8 lg:p-10 transition-all duration-500 hover:shadow-[0_20px_60px_oklch(0_0_0/0.4)]`}
          >
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Image Gallery */}
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <ImageGallery images={study.images} />
              </div>

              {/* Content */}
              <div className="space-y-6">
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
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

