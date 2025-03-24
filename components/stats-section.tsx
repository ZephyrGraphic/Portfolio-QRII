"use client"

import { motion } from "framer-motion"
import { Users, BookOpen, Award, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function StatsSection() {
  const { t } = useLanguage()

  const statsData = [
    {
      id: 1,
      value: "50+",
      label: t("stats.students"),
      icon: <Users className="w-6 h-6" />,
    },
    {
      id: 2,
      value: "3+",
      label: t("stats.experience"),
      icon: <Clock className="w-6 h-6" />,
    },
    {
      id: 3,
      value: "2",
      label: t("stats.specialties"),
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      id: 4,
      value: "4",
      label: t("stats.education"),
      icon: <Award className="w-6 h-6" />,
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
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          {t("stats.title")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-pink-500">{stat.icon}</span>
              </div>
              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                {stat.value}
              </h3>
              <p className="text-zinc-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

