"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, BookOpen, Languages, Users, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import AnimatedBackground from "@/components/animated-background"

export default function SkillsPage() {
  const { t } = useLanguage()

  const skillsData = [
    {
      id: 1,
      title: t("skills.teaching"),
      description: t("skills.teachingDesc"),
      icon: <BookOpen className="w-8 h-8" />,
      details: [t("skills.teaching.detail1"), t("skills.teaching.detail2"), t("skills.teaching.detail3")],
    },
    {
      id: 2,
      title: t("skills.quran"),
      description: t("skills.quranDesc"),
      icon: <Languages className="w-8 h-8" />,
      details: [t("skills.quran.detail1"), t("skills.quran.detail2"), t("skills.quran.detail3")],
    },
    {
      id: 3,
      title: t("skills.engagement"),
      description: t("skills.engagementDesc"),
      icon: <Users className="w-8 h-8" />,
      details: [t("skills.engagement.detail1"), t("skills.engagement.detail2"), t("skills.engagement.detail3")],
    },
    {
      id: 4,
      title: t("skills.adaptive"),
      description: t("skills.adaptiveDesc"),
      icon: <Lightbulb className="w-8 h-8" />,
      details: [t("skills.adaptive.detail1"), t("skills.adaptive.detail2"), t("skills.adaptive.detail3")],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4 md:px-10 relative">
      <AnimatedBackground variant="subtle" />

      <div className="container mx-auto max-w-4xl">
        <div className="mb-12">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("back")}
            </Link>
          </Button>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text"
          >
            {t("skills.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-zinc-300"
          >
            {t("skills.description")}
          </motion.p>
        </div>

        <div className="space-y-12">
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <div className="w-20 h-20 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
                    <span className="text-pink-500">{skill.icon}</span>
                  </div>
                </div>

                <div className="md:w-3/4">
                  <h2 className="text-2xl font-bold mb-2">{skill.title}</h2>
                  <p className="text-zinc-300 mb-4">{skill.description}</p>

                  {skill.details && skill.details.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">{t("skills.keyAspects")}</h4>
                      <ul className="list-disc pl-5 space-y-1 text-zinc-300">
                        {skill.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

