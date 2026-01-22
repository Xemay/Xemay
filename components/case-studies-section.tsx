"use client"

import { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react"

const caseStudies = [
  {
    id: 1,
    title: "E-Commerce Platform Redesign",
    developer: "Your Name",
    description:
      "A complete overhaul of an e-commerce platform focusing on user experience and conversion optimization. Implemented a modern design system, improved checkout flow, and integrated real-time inventory management. The project resulted in a 40% increase in conversion rates and significantly improved mobile engagement.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL"],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    links: {
      live: "#",
      github: "#",
    },
  },
  {
    id: 2,
    title: "AI-Powered Analytics Dashboard",
    developer: "Your Name",
    description:
      "Built a comprehensive analytics dashboard with AI-driven insights for data visualization and business intelligence. Features include real-time data streaming, predictive analytics, and customizable reporting tools. Utilized machine learning models for trend prediction and anomaly detection.",
    technologies: ["React", "Python", "TensorFlow", "D3.js", "AWS"],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    links: {
      live: "#",
      github: "#",
    },
  },
  {
    id: 3,
    title: "Mobile Banking Application",
    developer: "Your Name",
    description:
      "Developed a secure and intuitive mobile banking application with features including biometric authentication, real-time transaction tracking, and peer-to-peer payments. Focused on accessibility and security compliance while maintaining a sleek user interface.",
    technologies: ["React Native", "Node.js", "MongoDB", "Redis", "OAuth 2.0"],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    links: {
      live: "#",
      github: "#",
    },
  },
]

function ImageGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

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
              Click to expand
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
  return (
    <section className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Case Studies</h2>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        Deep dives into selected projects showcasing problem-solving and technical implementation
      </p>

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
                  <p className="text-primary text-sm font-medium mb-2">
                    by {study.developer}
                  </p>
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
                    Live Demo
                  </a>
                  <a
                    href={study.links.github}
                    className="glass-card glass-card-hover px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-105 text-foreground"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
