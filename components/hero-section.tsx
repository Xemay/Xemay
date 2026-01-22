import { Github, Linkedin, Twitter, Mail, Globe, Send } from "lucide-react"

const socialLinks = [
  { icon: Send, href: "https://t.me/xemay4ik", label: "Telegram" },
]

export function HeroSection() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-6 pt-20 pb-10">
      {/* Avatar Container with Glass Effect */}
      <div className="relative mb-8 animate-float">
        <div className="glass-card rounded-full p-2">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-muted">
            {/* Avatar placeholder - replace src with actual image */}
            <img
              src="/ava.jpg"
              alt="Developer Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Glow effect behind avatar */}
        <div
          className="absolute inset-0 -z-10 rounded-full blur-2xl opacity-40"
          style={{
            background: "radial-gradient(circle, oklch(0.7 0.15 200) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Slogan / Tagline */}
      <div className="text-center mb-8 max-w-2xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-foreground">
          <span className="text-balance">Xemay</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty">
          {"Crafting digital experiences that blend creativity with code."}
        </p>
        <p className="mt-4 text-lg text-muted-foreground/70">
          Python Developer
        </p>
      </div>

      {/* Social Media Links */}
      <div className="flex gap-4">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className="glass-card glass-card-hover p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
          >
            <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        ))}
      </div>
    </section>
  )
}
