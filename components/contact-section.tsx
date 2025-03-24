"use client"

import { motion } from "framer-motion"
import { Mail, Instagram, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function ContactSection() {
  const { t } = useLanguage()

  const contactData = [
    {
      id: 1,
      platform: "Email",
      handle: "qodimaturrofiah@gmail.com",
      link: "mailto:qodimaturrofiah@gmail.com",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      id: 2,
      platform: "Instagram",
      handle: "@immamatu",
      link: "https://instagram.com/immamatu",
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      id: 3,
      platform: "TikTok",
      handle: "@immamatu",
      link: "https://tiktok.com/@immamatu",
      icon: <ExternalLink className="w-5 h-5" />,
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
          {t("contact.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 hover:border-pink-500/50 transition-colors text-center"
            >
              <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-pink-500">{item.icon}</span>
              </div>
              <h3 className="text-lg font-bold mb-2">{item.platform}</h3>
              <p className="text-zinc-400 mb-4">{item.handle}</p>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-zinc-700 hover:bg-zinc-800 hover:text-pink-500"
              >
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {t("contact.connect")}
                </a>
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800 text-center">
          <h3 className="text-2xl font-bold mb-4">{t("contact.workTogether")}</h3>
          <p className="text-zinc-300 mb-6">{t("contact.reachOut")}</p>
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <a href="mailto:qodimaturrofiah@gmail.com">{t("contact.sendMessage")}</a>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

