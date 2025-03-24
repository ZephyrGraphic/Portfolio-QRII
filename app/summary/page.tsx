"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import AnimatedBackground from "@/components/animated-background"

export default function SummaryPage() {
  const { t } = useLanguage()

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
            {t("summary.title")}
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1"
          >
            <div className="sticky top-24">
              <Image
                src="/images/rofi.jpg"
                alt="Qodimatur Rofiah"
                width={300}
                height={300}
                className="rounded-xl border-4 border-white/10 mx-auto mb-6 object-cover h-[300px] w-[300px]"
              />

              <div className="flex justify-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-pink-500 fill-pink-500" />
                  ))}
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Qodimatur Rofiah</h2>
                <p className="text-zinc-400">{t("about.statusValue")}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-2"
          >
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800 mb-8">
              <h3 className="text-xl font-bold mb-6 text-pink-500">{t("summary.professionalOverview")}</h3>

              <div className="space-y-6 text-zinc-300">
                <p className="text-lg">{t("summary.p1")}</p>
                <p className="text-lg">{t("summary.p2")}</p>
                <p className="text-lg">{t("summary.p3")}</p>
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800 mb-8">
              <h3 className="text-xl font-bold mb-6 text-pink-500">{t("summary.philosophy")}</h3>

              <div className="space-y-6 text-zinc-300">
                <p className="text-lg">{t("summary.philosophy.p1")}</p>
                <p className="text-lg">{t("summary.philosophy.p2")}</p>
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800">
              <h3 className="text-xl font-bold mb-6 text-pink-500">{t("summary.goals")}</h3>

              <div className="space-y-6 text-zinc-300">
                <p className="text-lg">{t("summary.goals.p1")}</p>
                <p className="text-lg">{t("summary.goals.p2")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

