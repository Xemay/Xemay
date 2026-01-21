import { StarsBackground } from "@/components/starry-background"
import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { CaseStudiesSection } from "@/components/case-studies-section"
import { Footer } from "@/components/footer"

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Animated Stars Background */}
      <StarsBackground speed={80} factor={0.03} />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section with Avatar, Slogan, and Social Links */}
        <HeroSection />

        {/* Skills Section with Glass Cards */}
        <SkillsSection />

        {/* Case Studies Section with Image Galleries */}
        <CaseStudiesSection />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  )
}
