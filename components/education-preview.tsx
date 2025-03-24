"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

export default function EducationPreview() {
  const { t } = useLanguage();

  const educationData = [
    {
      id: 1,
      period: "2024",
      degree: t("education.bachelor"),
      institution: "Universitas PGRI Kanjuruhan Malang",
      year: "2024",
    },
    {
      id: 2,
      period: "2019 - 2022",
      degree: t("education.highSchool"),
      institution: "MA AL ITTIHAD",
      year: "2022",
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

        <div className="space-y-6 mb-8">
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <span className="text-sm text-pink-500 font-medium">
                    {item.period}
                  </span>
                  <h3 className="text-xl font-bold">{item.degree}</h3>
                  <p className="text-zinc-400">{item.institution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <Link href="/education">
              {t("education.viewAll")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
