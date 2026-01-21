import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 px-6 py-12 border-t border-border/30">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
            <span>Designed & Built with</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>by Your Name</span>
          </p>
          <p className="text-muted-foreground/60 text-sm mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
