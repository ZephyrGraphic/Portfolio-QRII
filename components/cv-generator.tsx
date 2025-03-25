"use client";

import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Download, FileText, Loader2 } from "lucide-react";

type CVGeneratorProps = {
  className?: string;
  variant?: "button" | "primary";
};

export default function CVGenerator({
  className,
  variant = "primary",
}: CVGeneratorProps) {
  const { t, language } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate enhanced PDF with better design and multi-page support
  const generatePDF = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();

      // Define page dimensions and settings
      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const margin = 50;
      const fontSize = 11;
      const smallFontSize = 10;
      const lineHeight = 18;
      const smallLineHeight = 16;

      // Get the standard fonts
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

      // Add first page
      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;
      let pageNumber = 1;

      // Function to add a new page when needed
      const addNewPageIfNeeded = (requiredSpace: number) => {
        if (y - requiredSpace < margin) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
          pageNumber++;

          // Add page number at the bottom
          page.drawText(`Page ${pageNumber}`, {
            x: pageWidth / 2 - 20,
            y: margin / 2 - 10,
            size: 9,
            font: font,
            color: rgb(0.5, 0.5, 0.5),
          });

          return true;
        }
        return false;
      };

      // Add page number to first page
      page.drawText(`Page ${pageNumber}`, {
        x: pageWidth / 2 - 20,
        y: margin / 2 - 10,
        size: 9,
        font: font,
        color: rgb(0.5, 0.5, 0.5),
      });

      // Flag to track if we've drawn the header
      let skipDefaultHeader = false;

      // Try to embed the profile image with circular styling
      try {
        const response = await fetch("/images/rofi-rounded.png");
        if (!response.ok)
          throw new Error(`Failed to fetch image: ${response.status}`);

        const imageData = await response.arrayBuffer();

        // Validate image data before embedding
        if (imageData.byteLength === 0) {
          throw new Error("Empty image data received");
        }

        // Check if the image data has a valid JPEG header (starts with FF D8 FF)
        const header = new Uint8Array(imageData.slice(0, 3));
        const isValidJpeg =
          header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff;

        if (!isValidJpeg) {
          console.warn(
            "Image does not appear to be a valid JPEG. Using fallback approach."
          );
          // Continue without the image
        } else {
          // Proceed with embedding
          const image = await pdfDoc.embedJpg(imageData);

          // Calculate image dimensions and position for optimal visual appeal
          const imgDiameter = 130; // Slightly larger for better visibility
          const imgX = margin + 5;
          const imgY = y - imgDiameter + 25;

          // Draw a white circular background to ensure clean edges
          page.drawCircle({
            x: imgX + imgDiameter / 2,
            y: imgY + imgDiameter / 2,
            size: imgDiameter / 2 + 2, // Slightly larger than the image
            color: rgb(1, 1, 1),
          });

          // Draw the image
          page.drawImage(image, {
            x: imgX,
            y: imgY,
            width: imgDiameter,
            height: imgDiameter,
          });

          // Create a clipping path for circular image (this is a workaround since PDF-lib doesn't support direct clipping)
          // Draw a circular border around the image with a gradient-like effect
          page.drawCircle({
            x: imgX + imgDiameter / 2,
            y: imgY + imgDiameter / 2,
            size: imgDiameter / 2,
            borderColor: rgb(0.85, 0.3, 0.5),
            borderWidth: 2,
            opacity: 1,
          });

          // Adjust the layout to accommodate the image
          // Move the title to the right of the image
          page.drawText("CURRICULUM VITAE", {
            x: imgX + imgDiameter + 20,
            y: y,
            size: 22,
            font: boldFont,
            color: rgb(0.2, 0.2, 0.2),
          });

          y -= lineHeight * 2;

          // Add personal information to the right of the image
          page.drawText("Qodimatur Rofiah Immamatu Imroiah", {
            x: imgX + imgDiameter + 20,
            y,
            size: 16,
            font: boldFont,
            color: rgb(0.2, 0.2, 0.2),
          });

          y -= lineHeight;

          page.drawText(
            language === "en" ? "Student & Educator" : "Mahasiswa & Pendidik",
            {
              x: imgX + imgDiameter + 20,
              y,
              size: fontSize,
              font: italicFont,
              color: rgb(0.3, 0.3, 0.3),
            }
          );

          // Skip the default title and name drawing
          skipDefaultHeader = true;

          // Adjust y position to move below the image
          y = imgY - 20;
        }
      } catch (error) {
        console.error("Error embedding image:", error);
        // Continue without the image - don't interrupt the PDF generation
        // Reset skipDefaultHeader flag to ensure the title is still drawn
        skipDefaultHeader = false;
      }

      // Add decorative header
      page.drawRectangle({
        x: margin,
        y: y - 5,
        width: pageWidth - margin * 2,
        height: 2,
        color: rgb(0.85, 0.3, 0.5), // Pink color
      });

      // Only draw the title and name if we didn't already do it with the image
      if (!skipDefaultHeader) {
        // Add title
        page.drawText("CURRICULUM VITAE", {
          x: margin,
          y,
          size: 22,
          font: boldFont,
          color: rgb(0.2, 0.2, 0.2),
        });

        y -= lineHeight * 2;

        // Add personal information
        page.drawText("Qodimatur Rofiah Immamatu Imroiah", {
          x: margin,
          y,
          size: 16,
          font: boldFont,
          color: rgb(0.2, 0.2, 0.2),
        });

        y -= lineHeight;

        page.drawText(
          language === "en" ? "Student & Educator" : "Mahasiswa & Pendidik",
          {
            x: margin,
            y,
            size: fontSize,
            font: italicFont,
            color: rgb(0.3, 0.3, 0.3),
          }
        );
      }

      y -= lineHeight * 1.5;

      // Contact information with icons (simulated)
      const contactItems = [
        { label: "Email:", value: "qodimaturrofiah@gmail.com" },
        { label: "Phone:", value: "+62 889 9107 1779" },
        { label: "Location:", value: "Malang, Indonesia" },
        {
          label: language === "en" ? "Birth Date:" : "Tanggal Lahir:",
          value: language === "en" ? "July 8, 2004" : "8 Juli 2004",
        },
      ];

      contactItems.forEach((item) => {
        // Check if we need a new page
        addNewPageIfNeeded(lineHeight);

        page.drawText(`${item.label}`, {
          x: margin,
          y,
          size: fontSize,
          font: boldFont,
          color: rgb(0.3, 0.3, 0.3),
        });

        page.drawText(item.value, {
          x: margin + 70,
          y,
          size: fontSize,
          font: font,
          color: rgb(0.2, 0.2, 0.2),
        });

        y -= lineHeight;
      });

      y -= lineHeight;

      // Section function to reuse for each section
      const drawSection = (title: string) => {
        // Check if we need a new page for the section
        const sectionHeight = 30; // Height needed for section header
        const newPage = addNewPageIfNeeded(sectionHeight);

        // If we're on a new page, don't add extra spacing
        if (!newPage) {
          y -= lineHeight * 0.5;
        }

        // Section title with colored background
        page.drawRectangle({
          x: margin,
          y: y - 2,
          width: pageWidth - margin * 2,
          height: 20,
          color: rgb(0.95, 0.95, 0.95),
        });

        page.drawText(title, {
          x: margin + 5,
          y: y,
          size: 12,
          font: boldFont,
          color: rgb(0.85, 0.3, 0.5), // Pink color
        });

        y -= lineHeight * 1.5;
      };

      // Professional Summary
      drawSection(
        language === "en" ? "PROFESSIONAL SUMMARY" : "RINGKASAN PROFESIONAL"
      );

      const summaryText =
        language === "en"
          ? "I am a dedicated educator with a passion for teaching elementary school students and Quranic reading and writing. Currently pursuing my Bachelor's degree in English Education, I balance my academic pursuits with my teaching responsibilities."
          : "Saya adalah pendidik yang berdedikasi dengan semangat untuk mengajar siswa sekolah dasar dan membaca serta menulis Al-Quran. Saat ini sedang menempuh gelar Sarjana Pendidikan Bahasa Inggris, saya menyeimbangkan kegiatan akademis dengan tanggung jawab mengajar.";

      // Split long text into multiple lines
      const words = summaryText.split(" ");
      let line = "";
      for (const word of words) {
        if ((line + word).length > 70) {
          // Check if we need a new page
          addNewPageIfNeeded(lineHeight);

          page.drawText(line, {
            x: margin,
            y,
            size: fontSize,
            font: font,
            color: rgb(0.2, 0.2, 0.2),
          });
          y -= lineHeight;
          line = word + " ";
        } else {
          line += word + " ";
        }
      }

      if (line.trim().length > 0) {
        // Check if we need a new page
        addNewPageIfNeeded(lineHeight);

        page.drawText(line, {
          x: margin,
          y,
          size: fontSize,
          font: font,
          color: rgb(0.2, 0.2, 0.2),
        });
        y -= lineHeight;
      }

      y -= lineHeight;

      // Education
      drawSection(language === "en" ? "EDUCATION" : "PENDIDIKAN");

      const educationItems = [
        {
          period: "2024 - Present",
          degree:
            language === "en"
              ? "Bachelor's Degree in English Education"
              : "Sarjana Pendidikan Bahasa Inggris",
          institution: "PGRI Kanjuruhan Malang University",
          faculty:
            language === "en"
              ? "Faculty of Language and Literature (S1 Pendidikan Bahasa Inggris)"
              : "Fakultas Bahasa dan Sastra (S1 Pendidikan Bahasa Inggris)",
          status: language === "en" ? "Currently enrolled" : "Sedang berjalan",
        },
        {
          period: "2019 - 2022",
          degree: language === "en" ? "High School" : "Sekolah Menengah Atas",
          institution: "MA AL ITTIHAD",
        },
        {
          period: "2016 - 2019",
          degree:
            language === "en"
              ? "Junior High School"
              : "Sekolah Menengah Pertama",
          institution: "MTS AL ITTIHAD",
        },
        {
          period: "2010 - 2016",
          degree: language === "en" ? "Elementary School" : "Sekolah Dasar",
          institution: "SDN KESAMBEN 02",
        },
      ];

      educationItems.forEach((item) => {
        // Check if we need a new page for this education item
        const itemHeight = item.faculty ? lineHeight * 5 : lineHeight * 3.2; // More height for bachelor's with faculty info
        const newPage = addNewPageIfNeeded(itemHeight);

        // If we're on a new page, don't add extra spacing
        if (!newPage && educationItems.indexOf(item) > 0) {
          y -= lineHeight * 0.5;
        }

        page.drawText(item.period, {
          x: margin,
          y,
          size: fontSize,
          font: boldFont,
          color: rgb(0.85, 0.3, 0.5), // Pink color
        });

        y -= lineHeight;

        page.drawText(item.degree, {
          x: margin + 10,
          y,
          size: fontSize,
          font: boldFont,
          color: rgb(0.2, 0.2, 0.2),
        });

        y -= lineHeight;

        page.drawText(item.institution, {
          x: margin + 10,
          y,
          size: fontSize,
          font: font,
          color: rgb(0.3, 0.3, 0.3),
        });

        y -= lineHeight;

        // Add faculty information for bachelor's degree
        if (item.faculty) {
          page.drawText(item.faculty, {
            x: margin + 10,
            y,
            size: fontSize,
            font: italicFont,
            color: rgb(0.3, 0.3, 0.3),
          });

          y -= lineHeight;
        }

        // Add status information for bachelor's degree
        if (item.status) {
          page.drawText(item.status, {
            x: margin + 10,
            y,
            size: fontSize,
            font: italicFont,
            color: rgb(0.85, 0.3, 0.5), // Pink color for emphasis
          });

          y -= lineHeight;
        }
      });

      // Work Experience
      drawSection(language === "en" ? "WORK EXPERIENCE" : "PENGALAMAN KERJA");

      const experienceItems = [
        {
          period: "2024",
          title: language === "en" ? "Admin" : "Admin",
          company: "Enryu Jockey",
          description:
            language === "en"
              ? "Worked as an admin for an online game jockey service platform."
              : "Bekerja sebagai admin untuk platform layanan joki game online.",
        },
        {
          period: "2024",
          title:
            language === "en"
              ? "Assistant Make Up Artist"
              : "Asisten Penata Rias",
          company: "Manzila MUA",
          description:
            language === "en"
              ? "Assisted with makeup application and client management."
              : "Membantu aplikasi tata rias dan manajemen klien.",
        },
        {
          period: "2023",
          title: language === "en" ? "Retail Staff" : "Staf Toko",
          company: "Minishop Lely",
          description:
            language === "en"
              ? "Worked as a retail staff member at a private store."
              : "Bekerja sebagai anggota staf toko di toko swasta.",
        },
      ];

      experienceItems.forEach((item) => {
        // Check if we need a new page for this experience item
        const itemHeight = lineHeight * 4; // Approximate height for each experience item
        const newPage = addNewPageIfNeeded(itemHeight);

        // If we're on a new page, don't add extra spacing
        if (!newPage && experienceItems.indexOf(item) > 0) {
          y -= lineHeight * 0.5;
        }

        page.drawText(item.period, {
          x: margin,
          y,
          size: fontSize,
          font: boldFont,
          color: rgb(0.85, 0.3, 0.5), // Pink color
        });

        y -= lineHeight;

        page.drawText(item.title, {
          x: margin + 10,
          y,
          size: fontSize,
          font: boldFont,
          color: rgb(0.2, 0.2, 0.2),
        });

        y -= lineHeight;

        page.drawText(item.company, {
          x: margin + 10,
          y,
          size: fontSize,
          font: font,
          color: rgb(0.3, 0.3, 0.3),
        });

        y -= lineHeight;

        // Check if description needs to be split across multiple lines
        const descWords = item.description.split(" ");
        let descLine = "";
        for (const word of descWords) {
          if ((descLine + word).length > 65) {
            // Check if we need a new page
            addNewPageIfNeeded(lineHeight);

            page.drawText(descLine, {
              x: margin + 10,
              y,
              size: fontSize,
              font: font,
              color: rgb(0.2, 0.2, 0.2),
            });
            y -= lineHeight;
            descLine = word + " ";
          } else {
            descLine += word + " ";
          }
        }

        if (descLine.trim().length > 0) {
          // Check if we need a new page
          addNewPageIfNeeded(lineHeight);

          page.drawText(descLine, {
            x: margin + 10,
            y,
            size: fontSize,
            font: font,
            color: rgb(0.2, 0.2, 0.2),
          });
          y -= lineHeight;
        }
      });

      // Skills
      drawSection(language === "en" ? "SKILLS" : "KEAHLIAN");

      const skillCategories = [
        {
          title: language === "en" ? "Teaching Skills:" : "Keahlian Mengajar:",
          skills:
            "Curriculum Development, Classroom Management, Student Assessment",
        },
        {
          title: language === "en" ? "Language Skills:" : "Keahlian Bahasa:",
          skills: "Indonesian (Native), English (Fluent), Arabic (Basic)",
        },
        {
          title: language === "en" ? "Technical Skills:" : "Keahlian Teknis:",
          skills: "Microsoft Office, Google Workspace, Basic Web Design",
        },
        {
          title: language === "en" ? "Soft Skills:" : "Keahlian Lunak:",
          skills: "Communication, Leadership, Time Management, Adaptability",
        },
      ];

      skillCategories.forEach((category) => {
        // Check if we need a new page for this skill category
        const categoryHeight = lineHeight * 2.2; // Approximate height for each skill category
        const newPage = addNewPageIfNeeded(categoryHeight);

        // If we're on a new page, don't add extra spacing
        if (!newPage && skillCategories.indexOf(category) > 0) {
          y -= lineHeight * 0.5;
        }

        page.drawText(category.title, {
          x: margin,
          y,
          size: fontSize,
          font: boldFont,
          color: rgb(0.2, 0.2, 0.2),
        });

        y -= lineHeight;

        // Check if skills need to be split across multiple lines
        const skillWords = category.skills.split(" ");
        let skillLine = "";
        for (const word of skillWords) {
          if ((skillLine + word).length > 65) {
            // Check if we need a new page
            addNewPageIfNeeded(lineHeight);

            page.drawText(skillLine, {
              x: margin + 10,
              y,
              size: fontSize,
              font: font,
              color: rgb(0.3, 0.3, 0.3),
            });
            y -= lineHeight;
            skillLine = word + " ";
          } else {
            skillLine += word + " ";
          }
        }

        if (skillLine.trim().length > 0) {
          // Check if we need a new page
          addNewPageIfNeeded(lineHeight);

          page.drawText(skillLine, {
            x: margin + 10,
            y,
            size: fontSize,
            font: font,
            color: rgb(0.3, 0.3, 0.3),
          });
          y -= lineHeight;
        }
      });

      // Footer with decorative line on the last page
      page.drawRectangle({
        x: margin,
        y: margin / 2 + 15,
        width: pageWidth - margin * 2,
        height: 1,
        color: rgb(0.85, 0.3, 0.5), // Pink color
      });

      const footerText =
        language === "en"
          ? "This CV was generated on " + new Date().toLocaleDateString()
          : "CV ini dibuat pada " + new Date().toLocaleDateString();

      page.drawText(footerText, {
        x: margin,
        y: margin / 2,
        size: 9,
        font: italicFont,
        color: rgb(0.5, 0.5, 0.5),
      });

      // Serialize the PDF to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a blob from the PDF bytes
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      // Create a URL for the blob
      const url = URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.download =
        language === "en"
          ? "qodimatur-rofiah-cv-en.pdf"
          : "qodimatur-rofiah-cv-id.pdf";

      // Append the link to the body
      document.body.appendChild(link);

      // Click the link to trigger the download
      link.click();

      // Remove the link from the body
      document.body.removeChild(link);

      // Release the URL object
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setError("Failed to generate PDF. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Render button based on variant
  if (variant === "primary") {
    return (
      <>
        <Button
          className={`rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 ${className}`}
          onClick={generatePDF}
          disabled={isGenerating}
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
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </>
    );
  } else {
    return (
      <>
        <Button
          onClick={generatePDF}
          disabled={isGenerating}
          className={`rounded-full ${className}`}
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FileText className="mr-2 h-4 w-4" />
          )}
          PDF
        </Button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </>
    );
  }
}
