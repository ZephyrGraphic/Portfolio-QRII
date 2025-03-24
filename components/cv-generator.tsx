"use client"

import { useState } from "react"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Loader2 } from "lucide-react"

type CVGeneratorProps = {
  className?: string
}

export default function CVGenerator({ className }: CVGeneratorProps) {
  const { t, language } = useLanguage()
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    try {
      setIsGenerating(true)

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create()

      // Add a page to the document
      const page = pdfDoc.addPage([595.28, 841.89]) // A4 size

      // Get the standard font
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

      // Set text properties
      const fontSize = 12
      const lineHeight = 20
      const margin = 50
      let y = page.getHeight() - margin

      // Add title
      page.drawText("CURRICULUM VITAE", {
        x: margin,
        y,
        size: 18,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight * 2

      // Add personal information
      page.drawText("Qodimatur Rofiah Immamatu Imroiah", {
        x: margin,
        y,
        size: 16,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      page.drawText(language === "en" ? "Student & Educator" : "Mahasiswa & Pendidik", {
        x: margin,
        y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight * 1.5

      // Contact information
      page.drawText("Email: qodimaturrofiah@gmail.com", {
        x: margin,
        y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      page.drawText("Phone: +62 889 9107 1779", {
        x: margin,
        y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      page.drawText("Location: Malang, Indonesia", {
        x: margin,
        y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      page.drawText(language === "en" ? "Birth Date: July 8, 2004" : "Tanggal Lahir: 8 Juli 2004", {
        x: margin,
        y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight * 2

      // Professional Summary
      page.drawText(language === "en" ? "PROFESSIONAL SUMMARY" : "RINGKASAN PROFESIONAL", {
        x: margin,
        y,
        size: 14,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      const summaryText =
        language === "en"
          ? "I am a dedicated educator with a passion for teaching elementary school students and Quranic reading and writing. Currently pursuing my Bachelor's degree in English Education, I balance my academic pursuits with my teaching responsibilities."
          : "Saya adalah pendidik yang berdedikasi dengan semangat untuk mengajar siswa sekolah dasar dan membaca serta menulis Al-Quran. Saat ini sedang menempuh gelar Sarjana Pendidikan Bahasa Inggris, saya menyeimbangkan kegiatan akademis dengan tanggung jawab mengajar."

      // Split long text into multiple lines
      const words = summaryText.split(" ")
      let line = ""
      for (const word of words) {
        if ((line + word).length > 70) {
          page.drawText(line, {
            x: margin,
            y,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          })
          y -= lineHeight
          line = word + " "
        } else {
          line += word + " "
        }
      }

      if (line.trim().length > 0) {
        page.drawText(line, {
          x: margin,
          y,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        })
        y -= lineHeight
      }

      y -= lineHeight

      // Education
      page.drawText(language === "en" ? "EDUCATION" : "PENDIDIKAN", {
        x: margin,
        y,
        size: 14,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      // Bachelor's degree
      page.drawText("2020 - 2024", {
        x: margin,
        y,
        size: fontSize,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      page.drawText(
        language === "en" ? "Bachelor's Degree in English Education" : "Sarjana Pendidikan Bahasa Inggris",
        {
          x: margin + 10,
          y,
          size: fontSize,
          font: boldFont,
          color: rgb(0, 0, 0),
        },
      )

      y -= lineHeight

      page.drawText("S-1 Pend.B.Inggris", {
        x: margin + 10,
        y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      // High School
      page.drawText("2019 - 2022", {
        x: margin,
        y,
        size: fontSize,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      page.drawText(language === "en" ? "High School" : "Sekolah Menengah Atas", {
        x: margin + 10,
        y,
        size: fontSize,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      page.drawText("MA AL ITTIHAD", {
        x: margin + 10,
        y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight * 2

      // Work Experience
      page.drawText(language === "en" ? "WORK EXPERIENCE" : "PENGALAMAN KERJA", {
        x: margin,
        y,
        size: 14,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      // Admin experience
      page.drawText("2024", {
        x: margin,
        y,
        size: fontSize,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      page.drawText(language === "en" ? "Admin" : "Admin", {
        x: margin + 10,
        y,
        size: fontSize,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      page.drawText("Enryu Jockey", {
        x: margin + 10,
        y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      const adminDesc =
        language === "en"
          ? "Worked as an admin for an online game jockey service platform."
          : "Bekerja sebagai admin untuk platform layanan joki game online."

      page.drawText(adminDesc, {
        x: margin + 10,
        y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      // MUA experience
      page.drawText("2024", {
        x: margin,
        y,
        size: fontSize,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      page.drawText(language === "en" ? "Assistant Make Up Artist" : "Asisten Penata Rias", {
        x: margin + 10,
        y,
        size: fontSize,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      page.drawText("Manzila MUA", {
        x: margin + 10,
        y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight * 2

      // Skills
      page.drawText(language === "en" ? "SKILLS" : "KEAHLIAN", {
        x: margin,
        y,
        size: 14,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      // Teaching skills
      page.drawText(language === "en" ? "Teaching Skills:" : "Keahlian Mengajar:", {
        x: margin,
        y,
        size: fontSize,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      page.drawText("Curriculum Development, Classroom Management, Student Assessment", {
        x: margin + 10,
        y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      // Language skills
      page.drawText(language === "en" ? "Language Skills:" : "Keahlian Bahasa:", {
        x: margin,
        y,
        size: fontSize,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight

      page.drawText("Indonesian (Native), English (Fluent), Arabic (Basic)", {
        x: margin + 10,
        y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      })

      y -= lineHeight * 2

      // Footer
      const footerText =
        language === "en"
          ? "This CV was generated on " + new Date().toLocaleDateString()
          : "CV ini dibuat pada " + new Date().toLocaleDateString()

      page.drawText(footerText, {
        x: margin,
        y: margin / 2,
        size: 10,
        font: font,
        color: rgb(0.5, 0.5, 0.5),
      })

      // Serialize the PDF to bytes
      const pdfBytes = await pdfDoc.save()

      // Create a blob from the PDF bytes
      const blob = new Blob([pdfBytes], { type: "application/pdf" })

      // Create a URL for the blob
      const url = URL.createObjectURL(blob)

      // Create a link element
      const link = document.createElement("a")
      link.href = url
      link.download = language === "en" ? "qodimatur-rofiah-cv-en.pdf" : "qodimatur-rofiah-cv-id.pdf"

      // Append the link to the body
      document.body.appendChild(link)

      // Click the link to trigger the download
      link.click()

      // Remove the link from the body
      document.body.removeChild(link)

      // Release the URL object
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button
      onClick={generatePDF}
      disabled={isGenerating}
      className={`rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 ${className}`}
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {language === "en" ? "Generating..." : "Membuat..."}
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          {t("cv.download")}
        </>
      )}
    </Button>
  )
}

