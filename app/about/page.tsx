"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, MapPin, GraduationCap, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4 md:px-10">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
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
            {t("about.title")}
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

              <h2 className="text-2xl font-bold mb-2 text-center">Qodimatur Rofiah</h2>
              <p className="text-zinc-400 text-center mb-6">{t("about.statusValue")}</p>

              <div className="flex justify-center space-x-4">
                <Button
                  asChild
                  className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  <a href="https://wa.me/+6288991071779" target="_blank" rel="noopener noreferrer">
                    {t("contact.sendMessage")}
                  </a>
                </Button>
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
              <h3 className="text-xl font-bold mb-4 text-pink-500">{t("about.personalInfo")}</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <User className="w-5 h-5 mr-3 text-pink-500 mt-1" />
                  <div>
                    <p className="font-medium">{t("about.fullName")}</p>
                    <p className="text-zinc-300">Qodimatur Rofiah Immamatu Imroiah</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <GraduationCap className="w-5 h-5 mr-3 text-pink-500 mt-1" />
                  <div>
                    <p className="font-medium">{t("about.status")}</p>
                    <p className="text-zinc-300">{t("about.statusValue")}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-pink-500 mt-1" />
                  <div>
                    <p className="font-medium">{t("about.birthPlace")}</p>
                    <p className="text-zinc-300">Malang</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-3 text-pink-500 mt-1" />
                  <div>
                    <p className="font-medium">{t("about.birthDate")}</p>
                    <p className="text-zinc-300">{t("about.birthDateValue")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800 mb-8">
              <h3 className="text-xl font-bold mb-4 text-pink-500">{t("about.biography")}</h3>

              <div className="space-y-4 text-zinc-300">
                <p>{t("about.bio.p1")}</p>
                <p>{t("about.bio.p2")}</p>
                <p>{t("about.bio.p3")}</p>
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800">
              <h3 className="text-xl font-bold mb-4 text-pink-500">{t("about.interests")}</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {["Teaching", "Reading", "Writing", "Languages", "Education", "Islamic Studies"].map(
                  (interest, index) => (
                    <div key={index} className="bg-zinc-800/50 rounded-lg p-3 text-center">
                      {interest}
                    </div>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

