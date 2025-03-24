"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import AnimatedBackground from "@/components/animated-background";

export default function EducationPage() {
  const { t } = useLanguage();

  const educationData = [
    {
      id: 1,
      period: "2024",
      degree: t("education.bachelor"),
      institution: "Universitas PGRI Kanjuruhan Malang",
      year: "2024",
      description: t("education.bachelorDesc"),
      achievements: [
        t("education.bachelor.achievement1"),
        t("education.bachelor.achievement2"),
        t("education.bachelor.achievement3"),
      ],
    },
    {
      id: 2,
      period: "2019 - 2022",
      degree: t("education.highSchool"),
      institution: "MA AL ITTIHAD",
      year: "2022",
      description: t("education.highSchoolDesc"),
      achievements: [
        t("education.highSchool.achievement1"),
        t("education.highSchool.achievement2"),
      ],
    },
    {
      id: 3,
      period: "2016 - 2019",
      degree: t("education.juniorHigh"),
      institution: "MTS AL ITTIHAD",
      year: "2019",
      description: t("education.juniorHighDesc"),
      achievements: [t("education.juniorHigh.achievement1")],
    },
    {
      id: 4,
      period: "2010 - 2016",
      degree: t("education.elementary"),
      institution: "SDN KESAMBEN 02",
      year: "2016",
      description: t("education.elementaryDesc"),
      achievements: [t("education.elementary.achievement1")],
    },
  ];

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
            {t("education.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-zinc-300"
          >
            {t("education.description")}
          </motion.p>
        </div>

        <div className="space-y-12">
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
                    <GraduationCap className="w-8 h-8 text-pink-500" />
                  </div>
                  <span className="text-pink-500 font-medium">
                    {item.period}
                  </span>
                  <div className="mt-2 inline-block px-3 py-1 rounded-full bg-zinc-800 text-xs font-medium">
                    {item.year}
                  </div>
                </div>

                <div className="md:w-3/4">
                  <h2 className="text-2xl font-bold mb-2">{item.degree}</h2>
                  <h3 className="text-xl text-zinc-400 mb-4">
                    {item.institution}
                  </h3>

                  <p className="text-zinc-300 mb-4">{item.description}</p>

                  {item.achievements && item.achievements.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">
                        {t("education.achievements")}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-zinc-300">
                        {item.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
