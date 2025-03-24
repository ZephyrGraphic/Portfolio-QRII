"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import AnimatedBackground from "@/components/animated-background"
import CVGenerator from "@/components/cv-generator"

export default function CVPage() {
  const { t, language, setLanguage } = useLanguage()
  const [animateContent, setAnimateContent] = useState(true)

  const handleLanguageChange = (lang: "en" | "id") => {
    if (lang !== language) {
      setAnimateContent(false)
      setTimeout(() => {
        setLanguage(lang)
        setAnimateContent(true)
      }, 300)
    }
  }

  const educationData = [
    {
      id: 1,
      period: "2020 - 2024",
      degree: t("education.bachelor"),
      institution: "S-1 Pend.B.Inggris",
      description: t("education.bachelorDesc"),
    },
    {
      id: 2,
      period: "2019 - 2022",
      degree: t("education.highSchool"),
      institution: "MA AL ITTIHAD",
      description: t("education.highSchoolDesc"),
    },
    {
      id: 3,
      period: "2016 - 2019",
      degree: t("education.juniorHigh"),
      institution: "MTS AL ITTIHAD",
      description: t("education.juniorHighDesc"),
    },
    {
      id: 4,
      period: "2010 - 2016",
      degree: t("education.elementary"),
      institution: "SDN KESAMBEN 02",
      description: t("education.elementaryDesc"),
    },
  ]

  const experienceData = [
    {
      id: 1,
      period: "2024",
      title: t("experience.admin"),
      company: "Enryu Jockey",
      description: t("experience.adminDesc"),
      responsibilities: [
        t("experience.admin.responsibility1"),
        t("experience.admin.responsibility2"),
        t("experience.admin.responsibility3"),
      ],
    },
    {
      id: 2,
      period: "2024",
      title: t("experience.mua"),
      company: "Manzila MUA",
      description: t("experience.muaDesc"),
      responsibilities: [
        t("experience.mua.responsibility1"),
        t("experience.mua.responsibility2"),
        t("experience.mua.responsibility3"),
      ],
    },
    {
      id: 3,
      period: "2023",
      title: t("experience.retail"),
      company: "Minishop Lely",
      description: t("experience.retailDesc"),
      responsibilities: [
        t("experience.retail.responsibility1"),
        t("experience.retail.responsibility2"),
        t("experience.retail.responsibility3"),
      ],
    },
  ]

  const skillsData = [
    {
      category: t("cv.skills.teaching"),
      skills: ["Curriculum Development", "Classroom Management", "Student Assessment", "Lesson Planning"],
    },
    {
      category: t("cv.skills.languages"),
      skills: ["Indonesian (Native)", "English (Fluent)", "Arabic (Basic)"],
    },
    {
      category: t("cv.skills.technical"),
      skills: ["Microsoft Office", "Google Workspace", "Basic Web Design", "Social Media Management"],
    },
    {
      category: t("cv.skills.soft"),
      skills: ["Communication", "Leadership", "Time Management", "Adaptability", "Problem Solving"],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4 md:px-10 relative">
      <AnimatedBackground variant="subtle" />

      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("back")}
            </Link>
          </Button>

          <div className="flex items-center gap-4">
            <div className="flex p-1 bg-zinc-800/50 rounded-full">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  language === "en"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange("id")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  language === "id"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Indonesia
              </button>
            </div>

            <CVGenerator />
          </div>
        </div>

        {/* CV Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: animateContent ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-10 pb-10 border-b border-zinc-800">
            <div className="md:w-1/4 flex justify-center">
              <Image
                src="/images/rofi.jpg"
                alt="Qodimatur Rofiah"
                width={150}
                height={150}
                className="rounded-full border-4 border-white/10 object-cover h-[150px] w-[150px]"
              />
            </div>

            <div className="md:w-3/4 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                Qodimatur Rofiah Immamatu Imroiah
              </h1>

              <p className="text-xl text-zinc-300 mb-4">{t("about.statusValue")}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-pink-500" />
                  <span className="text-zinc-300">qodimaturrofiah@gmail.com</span>
                </div>

                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-pink-500" />
                  <span className="text-zinc-300">+62 889 9107 1779</span>
                </div>

                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                  <span className="text-zinc-300">Malang, Indonesia</span>
                </div>

                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-pink-500" />
                  <span className="text-zinc-300">{t("about.birthDateValue")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-10 pb-10 border-b border-zinc-800">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-pink-500" />
              {t("cv.professionalSummary")}
            </h2>

            <p className="text-zinc-300 mb-4">{t("summary.p1")}</p>

            <p className="text-zinc-300">{t("summary.p3")}</p>
          </div>

          {/* Work Experience */}
          <div className="mb-10 pb-10 border-b border-zinc-800">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-pink-500" />
              {t("cv.workExperience")}
            </h2>

            <div className="space-y-6">
              {experienceData.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <p className="text-pink-500 font-medium">{item.period}</p>
                  </div>

                  <div className="md:col-span-3">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-zinc-400 mb-2">{item.company}</p>
                    <p className="text-zinc-300 mb-2">{item.description}</p>

                    {item.responsibilities && (
                      <ul className="list-disc pl-5 text-zinc-300">
                        {item.responsibilities.map((responsibility, index) => (
                          <li key={index}>{responsibility}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-10 pb-10 border-b border-zinc-800">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-pink-500" />
              {t("cv.education")}
            </h2>

            <div className="space-y-6">
              {educationData.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <p className="text-pink-500 font-medium">{item.period}</p>
                  </div>

                  <div className="md:col-span-3">
                    <h3 className="text-xl font-bold">{item.degree}</h3>
                    <p className="text-zinc-400 mb-2">{item.institution}</p>
                    <p className="text-zinc-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-10 pb-10 border-b border-zinc-800">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Award className="w-5 h-5 mr-2 text-pink-500" />
              {t("cv.skills.title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillsData.map((category, index) => (
                <div key={index} className="bg-zinc-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3 text-pink-500">{category.category}</h3>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="bg-zinc-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Languages className="w-5 h-5 mr-2 text-pink-500" />
              {t("cv.languages")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Indonesian</h3>
                <div className="w-full bg-zinc-800 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <p className="text-right text-xs mt-1 text-zinc-400">Native</p>
              </div>

              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2">English</h3>
                <div className="w-full bg-zinc-800 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>

                <p className="text-right text-xs mt-1 text-zinc-400">Fluent</p>
              </div>

              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Arabic</h3>
                <div className="w-full bg-zinc-800 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full"
                    style={{ width: "40%" }}
                  ></div>
                </div>
                <p className="text-right text-xs mt-1 text-zinc-400">Basic</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

