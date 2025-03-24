"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <div className="h-full flex flex-col justify-center items-center px-4 md:px-10 text-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 to-transparent" />

      {/* Animated circles */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-indigo-500/20 to-blue-500/20 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
        }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6"
        >
          <Image
            src="/images/rofi.jpg"
            alt="Qodimatur Rofiah"
            width={150}
            height={150}
            className="rounded-full border-4 border-white/10 mx-auto object-cover h-[150px] w-[150px]"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
        >
          Qodimatur Rofiah
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl text-zinc-400 mb-8 max-w-2xl mx-auto"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <a href="#contact">{t("hero.cta.contact")}</a>
          </Button>
          <Button variant="outline" asChild className="rounded-full border-zinc-700 hover:bg-zinc-800">
            <a href="#about">{t("hero.cta.learnMore")}</a>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

