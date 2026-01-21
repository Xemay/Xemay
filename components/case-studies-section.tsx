"use client"

import { useState } from "react"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"

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

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative group">
      {/* Main Image */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted/30">
        <img
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`Project screenshot ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Glass overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 glass-card p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={goToNext}
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
              onClick={() => setCurrentIndex(index)}
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
