"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import CVGenerator from "@/components/cv-generator"

export default function CVPreview() {
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
          {t("cv.title")}
        </h2>

        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800 mb-8 text-center">
          <div className="w-20 h-20 rounded-full bg-pink-500/20 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-pink-500" />
          </div>

          <h3 className="text-2xl font-bold mb-4">{t("cv.downloadTitle")}</h3>

          <p className="text-zinc-300 mb-8 max-w-xl mx-auto">{t("cv.description")}</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <CVGenerator />

            <Button asChild variant="outline" className="rounded-full border-zinc-700 hover:bg-zinc-800">
              <Link href="/cv">
                {t("cv.viewOnline")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

