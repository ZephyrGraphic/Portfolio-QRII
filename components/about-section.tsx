"use client"

import { motion } from "framer-motion"
import { MapPin, User } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function AboutSection() {
  const { t } = useLanguage()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <div className="container mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
        className="max-w-3xl mx-auto"
      >
        <motion.h2
          variants={item}
          className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text"
        >
          {t("about.title")}
        </motion.h2>

        <motion.div variants={item} className="mb-8 text-center">
          <p className="text-xl text-zinc-300 mb-6">{t("about.intro")}</p>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 mr-2 text-pink-500" />
              <h3 className="text-lg font-semibold">{t("about.personalInfo")}</h3>
            </div>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-start">
                <span className="font-medium min-w-28">{t("about.fullName")}</span>
                <span>Qodimatur Rofiah Immamatu Imroiah</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-28">{t("about.status")}</span>
                <span>{t("about.statusValue")}</span>
              </li>
            </ul>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 mr-2 text-pink-500" />
              <h3 className="text-lg font-semibold">{t("about.location")}</h3>
            </div>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-start">
                <span className="font-medium min-w-28">{t("about.birthPlace")}</span>
                <span>Malang</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-28">{t("about.birthDate")}</span>
                <span>{t("about.birthDateValue")}</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div variants={item} className="text-center">
          <p className="text-zinc-400">{t("about.description")}</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

