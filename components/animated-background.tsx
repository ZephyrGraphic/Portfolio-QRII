"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type AnimatedBackgroundProps = {
  variant?: "default" | "subtle" | "none"
  className?: string
}

export default function AnimatedBackground({ variant = "default", className = "" }: AnimatedBackgroundProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  if (variant === "none" || prefersReducedMotion) {
    return null
  }

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`} aria-hidden="true">
      {variant === "default" ? (
        <>
          <motion.div
            className="absolute w-[40rem] h-[40rem] rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-3xl opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            style={{ top: "10%", left: "5%" }}
          />
          <motion.div
            className="absolute w-[35rem] h-[35rem] rounded-full bg-gradient-to-r from-indigo-500/10 to-blue-500/10 blur-3xl opacity-30"
            animate={{
              x: [0, -80, 0],
              y: [0, 80, 0],
            }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            style={{ bottom: "5%", right: "10%" }}
          />
          <motion.div
            className="absolute w-[25rem] h-[25rem] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl opacity-20"
            animate={{
              x: [0, 60, 0],
              y: [0, 60, 0],
            }}
            transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            style={{ top: "40%", right: "25%" }}
          />
        </>
      ) : (
        <>
          <motion.div
            className="absolute w-[30rem] h-[30rem] rounded-full bg-gradient-to-r from-pink-500/5 to-purple-500/5 blur-3xl opacity-20"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            style={{ top: "15%", left: "10%" }}
          />
          <motion.div
            className="absolute w-[25rem] h-[25rem] rounded-full bg-gradient-to-r from-indigo-500/5 to-blue-500/5 blur-3xl opacity-20"
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            style={{ bottom: "10%", right: "15%" }}
          />
        </>
      )}
    </div>
  )
}

