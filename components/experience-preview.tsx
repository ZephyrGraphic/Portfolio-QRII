"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function ExperiencePreview() {
  const { t } = useLanguage()

  const experienceData = [
    {
      id: 1,
      period: "2024",
      title: t("experience.admin"),
      company: "Enryu Jockey",
      description: t("experience.adminDesc"),
    },
    {
      id: 2,
      period: "2024",
      title: t("experience.mua"),
      company: "Manzila MUA",
      description: t("experience.muaDesc"),
    },
  ]

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          {t("experience.title")}
        </h2>

        <div className="space-y-6 mb-8">
          {experienceData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-pink-500" />
                </div>

                <div className="flex-grow">
                  <span className="text-sm text-pink-500 font-medium">{item.period}</span>
                  <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                  <p className="text-zinc-400 mt-1">{item.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <Link href="/experience">
              {t("experience.viewAll")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

