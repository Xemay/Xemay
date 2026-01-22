"use client"

import { Code2 } from "lucide-react"

const skills = ["Python", "MySQL", "MongoDB", "Redis", "Git", "Linux"]

export function SkillsSection() {
  return (
    <section className="relative z-10 px-6 py-20 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
        Навыки и технологии
      </h2>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        Инструменты и технологии с которыми я работаю
      </p>

      <div className="glass-card glass-card-hover rounded-2xl p-8 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-2.5 rounded-xl"
            style={{ background: "oklch(0.7 0.15 200 / 0.15)" }}
          >
            <Code2 className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">Tech Stack</h3>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {skills.map((skill) => (
            <span
              key={skill}
              className="skill-badge px-5 py-2.5 text-base font-medium rounded-xl bg-secondary/50 text-secondary-foreground border border-border/50 hover:border-primary/40 hover:bg-primary/15 transition-all duration-300 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
