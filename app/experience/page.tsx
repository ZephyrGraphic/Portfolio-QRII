"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function ExperiencePage() {
  const { t } = useLanguage()

  const experienceData = [
    {
      id: 1,
      period: "2024",
      title: t("experience.admin"),
      company: "Enryu Jockey",
      description: t("experience.adminDesc"),
      responsibilities: [
        t("experience.admin.responsibility1"),
        t("experience.admin.responsibility2"),
        t("experience.admin.responsibility3"),
      ],
    },
    {
      id: 2,
      period: "2024",
      title: t("experience.mua"),
      company: "Manzila MUA",
      description: t("experience.muaDesc"),
      responsibilities: [
        t("experience.mua.responsibility1"),
        t("experience.mua.responsibility2"),
        t("experience.mua.responsibility3"),
      ],
    },
    {
      id: 3,
      period: "2023",
      title: t("experience.retail"),
      company: "Minishop Lely",
      description: t("experience.retailDesc"),
      responsibilities: [
        t("experience.retail.responsibility1"),
        t("experience.retail.responsibility2"),
        t("experience.retail.responsibility3"),
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4 md:px-10">
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
            {t("experience.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-zinc-300"
          >
            {t("experience.description")}
          </motion.p>
        </div>

        <div className="space-y-12">
          {experienceData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
                    <Briefcase className="w-8 h-8 text-pink-500" />
                  </div>
                  <span className="text-pink-500 font-medium">{item.period}</span>
                </div>

                <div className="md:w-3/4">
                  <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                  <h3 className="text-xl text-zinc-400 mb-4">{item.company}</h3>

                  <p className="text-zinc-300 mb-4">{item.description}</p>

                  {item.responsibilities && item.responsibilities.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">{t("experience.responsibilities")}</h4>
                      <ul className="list-disc pl-5 space-y-1 text-zinc-300">
                        {item.responsibilities.map((responsibility, i) => (
                          <li key={i}>{responsibility}</li>
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

