"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function AboutPreview() {
  const { t } = useLanguage()

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
          {t("about.title")}
        </h2>

        <div className="mb-8 text-center">
          <p className="text-xl text-zinc-300 mb-6">{t("about.intro")}</p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800 mb-8">
          <p className="text-zinc-400 mb-6">{t("about.description")}</p>

          <div className="flex justify-center">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              <Link href="/about">
                {t("about.readMore")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

