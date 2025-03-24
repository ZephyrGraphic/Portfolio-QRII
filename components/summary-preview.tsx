"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function SummaryPreview() {
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
          {t("summary.title")}
        </h2>

        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800 mb-8">
          <div className="flex justify-center mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-pink-500 fill-pink-500" />
              ))}
            </div>
          </div>

          <p className="text-zinc-300 text-lg text-center mb-6">{t("summary.p1")}</p>

          <div className="flex justify-center mt-6">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              <Link href="/summary">
                {t("summary.readMore")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

