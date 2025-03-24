"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Mail, Instagram, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutPreview from "@/components/about-preview"
import EducationPreview from "@/components/education-preview"
import ExperiencePreview from "@/components/experience-preview"
import SkillsPreview from "@/components/skills-preview"
import StatsSection from "@/components/stats-section"
import SummaryPreview from "@/components/summary-preview"
import ContactPreview from "@/components/contact-preview"
import CVPreview from "@/components/cv-preview"
import AnimatedBackground from "@/components/animated-background"

export default function Portfolio() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  return (
    <div ref={ref} className="min-h-screen bg-black text-white relative">
      <AnimatedBackground />
      <Navbar />

      <main className="relative">
        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 z-50"
          style={{ scaleX: scrollYProgress }}
        />

        <section id="hero" className="h-screen relative">
          <HeroSection />
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <Button variant="ghost" size="icon" asChild>
              <a href="#about">
                <ArrowDown className="h-6 w-6" />
              </a>
            </Button>
          </motion.div>
        </section>

        <section id="about" className="min-h-screen py-20 px-4 md:px-10">
          <AboutPreview />
        </section>

        <section id="education" className="min-h-screen py-20 px-4 md:px-10 bg-zinc-950">
          <EducationPreview />
        </section>

        <section id="experience" className="min-h-screen py-20 px-4 md:px-10">
          <ExperiencePreview />
        </section>

        <section id="skills" className="min-h-screen py-20 px-4 md:px-10 bg-zinc-950">
          <SkillsPreview />
        </section>

        <section id="cv" className="min-h-screen py-20 px-4 md:px-10">
          <CVPreview />
        </section>

        <section id="stats" className="py-20 px-4 md:px-10 bg-zinc-950">
          <StatsSection />
        </section>

        <section id="summary" className="py-20 px-4 md:px-10">
          <SummaryPreview />
        </section>

        <section id="contact" className="py-20 px-4 md:px-10 bg-zinc-950">
          <ContactPreview />
        </section>
      </main>

      <footer className="py-8 px-4 md:px-10 border-t border-zinc-800 text-center">
        <p className="text-zinc-400">{t("footer.copyright")}</p>
        <div className="flex justify-center gap-4 mt-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:qodimaturrofiah@gmail.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://instagram.com/immamatu" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://tiktok.com/@immamatu" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <ExternalLink className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </footer>
    </div>
  )
}

