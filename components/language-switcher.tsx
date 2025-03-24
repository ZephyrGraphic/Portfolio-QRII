"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const toggleLanguage = (lang: "en" | "id") => {
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative">
        <Globe className="h-5 w-5" />
        <span className="absolute -bottom-1 -right-1 text-xs font-bold">{language.toUpperCase()}</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-md shadow-lg overflow-hidden z-50">
          <div className="py-1">
            <button
              className={`block w-full text-left px-4 py-2 text-sm ${
                language === "en" ? "bg-pink-500/20 text-pink-500" : "hover:bg-zinc-800"
              }`}
              onClick={() => toggleLanguage("en")}
            >
              English
            </button>
            <button
              className={`block w-full text-left px-4 py-2 text-sm ${
                language === "id" ? "bg-pink-500/20 text-pink-500" : "hover:bg-zinc-800"
              }`}
              onClick={() => toggleLanguage("id")}
            >
              Bahasa Indonesia
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

