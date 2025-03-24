"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Mail, Instagram, ExternalLink, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import AnimatedBackground from "@/components/animated-background"

export default function ContactPage() {
  const { t } = useLanguage()

  const contactData = [
    {
      id: 1,
      platform: "Email",
      handle: "qodimaturrofiah@gmail.com",
      link: "mailto:qodimaturrofiah@gmail.com",
      icon: <Mail className="w-8 h-8" />,
    },
    {
      id: 2,
      platform: "Instagram",
      handle: "@immamatu",
      link: "https://instagram.com/immamatu",
      icon: <Instagram className="w-8 h-8" />,
    },
    {
      id: 3,
      platform: "TikTok",
      handle: "@immamatu",
      link: "https://tiktok.com/@immamatu",
      icon: <ExternalLink className="w-8 h-8" />,
    },
    {
      id: 4,
      platform: "WhatsApp",
      handle: "+62 889 9107 1779",
      link: "https://wa.me/+6288991071779",
      icon: <MessageSquare className="w-8 h-8" />,
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
            {t("contact.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-zinc-300"
          >
            {t("contact.description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {contactData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800 hover:border-pink-500/50 transition-colors"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-pink-500/20 flex items-center justify-center mb-6">
                  <span className="text-pink-500">{item.icon}</span>
                </div>

                <h2 className="text-2xl font-bold mb-2">{item.platform}</h2>
                <p className="text-zinc-400 mb-6">{item.handle}</p>

                <Button
                  asChild
                  className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {t("contact.connect")}
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">{t("contact.workTogether")}</h2>
          <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">{t("contact.reachOut")}</p>

          <Button
            asChild
            size="lg"
            className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <a href="https://wa.me/+6288991071779" target="_blank" rel="noopener noreferrer">
              {t("contact.sendMessage")}
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

