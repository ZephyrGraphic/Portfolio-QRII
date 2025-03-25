"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function EducationSection() {
  const { t } = useLanguage();

  const educationData = [
    {
      id: 1,
      period: "2024 - Present",
      degree: t("education.bachelor"),
      institution: "PGRI Kanjuruhan Malang University",
      year: "2024",
    },
    {
      id: 2,
      period: "2019 - 2022",
      degree: t("education.highSchool"),
      institution: "MA AL ITTIHAD",
      year: "2022",
    },
    {
      id: 3,
      period: "2016 - 2019",
      degree: t("education.juniorHigh"),
      institution: "MTS AL ITTIHAD",
      year: "2019",
    },
    {
      id: 4,
      period: "2010 - 2016",
      degree: t("education.elementary"),
      institution: "SDN KESAMBEN 02",
      year: "2016",
    },
  ];

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
          {t("education.title")}
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 to-indigo-500" />

          {/* Timeline items */}
          <div className="space-y-12">
            {educationData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-zinc-900 border-4 border-pink-500 flex items-center justify-center z-10">
                  <GraduationCap className="w-4 h-4 text-pink-500" />
                </div>

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 hover:border-pink-500/50 transition-colors">
                    <span className="text-sm text-pink-500 font-medium">
                      {item.period}
                    </span>
                    <h3 className="text-xl font-bold mt-1">{item.degree}</h3>
                    <p className="text-zinc-400 mt-2">{item.institution}</p>
                    <div className="mt-4 inline-block px-3 py-1 rounded-full bg-zinc-800 text-xs font-medium">
                      {item.year}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
