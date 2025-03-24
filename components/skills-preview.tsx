"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, BookOpen, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function SkillsPreview() {
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
  ]

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800"
            >
              <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mb-4">
                <span className="text-pink-500">{skill.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
              <p className="text-zinc-400">{skill.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <Link href="/skills">
              {t("skills.viewAll")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

