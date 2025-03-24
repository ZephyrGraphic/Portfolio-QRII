"use client"

import { motion } from "framer-motion"
import { BookOpen, Languages, Users, Lightbulb } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function SkillsSection() {
  const { t } = useLanguage()

  const skillsData = [
    {
      id: 1,
      title: t("skills.teaching"),
      description: t("skills.teachingDesc"),
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      id: 2,
      title: t("skills.quran"),
      description: t("skills.quranDesc"),
      icon: <Languages className="w-6 h-6" />,
    },
    {
      id: 3,
      title: t("skills.engagement"),
      description: t("skills.engagementDesc"),
      icon: <Users className="w-6 h-6" />,
    },
    {
      id: 4,
      title: t("skills.adaptive"),
      description: t("skills.adaptiveDesc"),
      icon: <Lightbulb className="w-6 h-6" />,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          {t("skills.title")}
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skillsData.map((skill) => (
            <motion.div
              key={skill.id}
              variants={item}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 hover:border-pink-500/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mb-4">
                <span className="text-pink-500">{skill.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
              <p className="text-zinc-400">{skill.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

