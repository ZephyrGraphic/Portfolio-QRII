"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "@/components/language-switcher"

const navItems = [
  { name: "nav.home", href: "/" },
  { name: "nav.about", href: "/about" },
  { name: "nav.education", href: "/education" },
  { name: "nav.experience", href: "/experience" },
  { name: "nav.skills", href: "/skills" },
  { name: "nav.summary", href: "/summary" },
  { name: "nav.contact", href: "/contact" },
]

export default function Navbar() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
          >
            Immamatu
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button key={item.name} variant="ghost" asChild className={isActive(item.href) ? "text-pink-500" : ""}>
              <Link href={item.href} className="text-sm">
                {t(item.name)}
              </Link>
            </Button>
          ))}
          <LanguageSwitcher />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" className="ml-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md"
        >
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={`justify-start ${isActive(item.href) ? "text-pink-500" : ""}`}
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link href={item.href}>{t(item.name)}</Link>
              </Button>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  )
}

