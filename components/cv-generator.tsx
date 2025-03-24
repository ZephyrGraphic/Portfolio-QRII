"use client";

import { useState, useRef } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Download, ImageIcon, FileText, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import html2canvas from "html2canvas";

type CVGeneratorProps = {
  className?: string;
  variant?: "dropdown" | "buttons";
};

export default function CVGenerator({
  className,
  variant = "dropdown",
}: CVGeneratorProps) {
  const { t, language } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentFormat, setCurrentFormat] = useState<"pdf" | "png" | "jpg">(
    "pdf"
  );
  const canvasRef = useRef<HTMLDivElement>(null);

  // Generate enhanced PDF with better design and multi-page support
  const generatePDF = async () => {
    try {
      setIsGenerating(true);

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

      // Try to embed the profile image
      try {
        const response = await fetch("/images/rofi.jpg");
        if (!response.ok)
          throw new Error(`Failed to fetch image: ${response.status}`);

        const imageData = await response.arrayBuffer();

        // Check if the image data has a valid JPEG header (starts with FF D8 FF)
        const header = new Uint8Array(imageData.slice(0, 3));
        const isValidJpeg =
          header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff;

        if (!isValidJpeg) {
          console.warn(
            "Image does not appear to be a valid JPEG. Using fallback approach."
          );
          // Skip embedding the image
        } else {
          // Proceed with embedding
          const image = await pdfDoc.embedJpg(imageData);

          // Calculate image dimensions (keeping aspect ratio)
          const imgWidth = 100;
          const imgHeight = 100;

          // Draw image in top right corner
          page.drawImage(image, {
            x: pageWidth - margin - imgWidth,
            y: y - imgHeight + 20,
            width: imgWidth,
            height: imgHeight,
          });
        }
      } catch (error) {
        console.error("Error embedding image:", error);
        // Continue without the image
      }

      // Add decorative header
      page.drawRectangle({
        x: margin,
        y: y - 5,
        width: pageWidth - margin * 2,
        height: 2,
        color: rgb(0.85, 0.3, 0.5), // Pink color
      });

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
          period: "2024",
          degree:
            language === "en"
              ? "Bachelor's Degree in English Education"
              : "Sarjana Pendidikan Bahasa Inggris",
          institution: "S-1 Pend.B.Inggris",
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
        const itemHeight = lineHeight * 3.2; // Approximate height for each education item
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
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate image-based CV
  const generateImageCV = async (format: "png" | "jpg") => {
    try {
      setIsGenerating(true);

      if (!canvasRef.current) {
        console.error("Canvas reference not found");
        return;
      }

      // First, check the content height to determine if we need to adjust the layout
      const contentHeight = canvasRef.current.scrollHeight;
      const contentWidth = canvasRef.current.scrollWidth;

      // If content is too long, apply a scaling factor to fit it better
      let scale = 2; // Default scale for high quality
      let adjustedStyles = {};

      if (contentHeight > 3000) {
        // Content is very long, apply more aggressive adjustments
        scale = 1.5; // Reduce scale to keep file size manageable

        // Apply style adjustments to the template to make it more compact
        adjustedStyles = {
          fontSize: "0.9em",
          lineHeight: "1.3",
        };

        // Apply the adjusted styles
        Object.assign(canvasRef.current.style, adjustedStyles);
      }

      // Create a canvas from the CV template with appropriate settings
      const canvas = await html2canvas(canvasRef.current, {
        scale: scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#111111",
        logging: false, // Disable logging to reduce console noise
        onclone: (clonedDoc) => {
          // This function runs on the cloned document before rendering
          // We can make additional adjustments here if needed
          const clonedElement = clonedDoc.querySelector(".cv-template");
          if (clonedElement) {
            // Apply any last-minute style adjustments to the clone
            Object.assign(clonedElement.style, adjustedStyles);
          }
        },
      });

      // Convert canvas to image data URL with appropriate quality settings
      const mimeType = format === "png" ? "image/png" : "image/jpeg";
      const quality = format === "png" ? 1.0 : 0.92;

      try {
        const dataUrl = canvas.toDataURL(mimeType, quality);

        // Create a link element
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download =
          language === "en"
            ? `qodimatur-rofiah-cv-en.${format}`
            : `qodimatur-rofiah-cv-id.${format}`;

        // Append the link to the body
        document.body.appendChild(link);

        // Click the link to trigger the download
        link.click();

        // Remove the link from the body
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error converting canvas to data URL:", error);
        alert(
          "There was an error generating the image. Please try a different format or try again later."
        );
      }
    } catch (error) {
      console.error("Error generating image CV:", error);
      alert(
        "There was an error generating the CV image. Please try again or use the PDF format instead."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = (format: "pdf" | "png" | "jpg") => {
    setCurrentFormat(format);
    if (format === "pdf") {
      generatePDF();
    } else {
      generateImageCV(format);
    }
  };

  // Render dropdown or buttons based on variant
  if (variant === "dropdown") {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={`rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 ${className}`}
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
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleGenerate("pdf")}>
              <FileText className="mr-2 h-4 w-4" />
              <span>PDF Format</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleGenerate("png")}>
              <ImageIcon className="mr-2 h-4 w-4" />
              <span>PNG Image</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleGenerate("jpg")}>
              <ImageIcon className="mr-2 h-4 w-4" />
              <span>JPG Image</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Hidden CV template for image generation */}
        <div className="hidden">
          <div
            ref={canvasRef}
            className="cv-template"
            style={{
              width: "1000px",
              padding: "40px",
              fontFamily: "sans-serif",
            }}
          >
            <CVImageTemplate />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => handleGenerate("pdf")}
          disabled={isGenerating}
          className={`rounded-full ${className}`}
          variant={currentFormat === "pdf" ? "default" : "outline"}
        >
          {isGenerating && currentFormat === "pdf" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FileText className="mr-2 h-4 w-4" />
          )}
          PDF
        </Button>

        <Button
          onClick={() => handleGenerate("png")}
          disabled={isGenerating}
          className={`rounded-full ${className}`}
          variant={currentFormat === "png" ? "default" : "outline"}
        >
          {isGenerating && currentFormat === "png" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ImageIcon className="mr-2 h-4 w-4" />
          )}
          PNG
        </Button>

        <Button
          onClick={() => handleGenerate("jpg")}
          disabled={isGenerating}
          className={`rounded-full ${className}`}
          variant={currentFormat === "jpg" ? "default" : "outline"}
        >
          {isGenerating && currentFormat === "jpg" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ImageIcon className="mr-2 h-4 w-4" />
          )}
          JPG
        </Button>

        {/* Hidden CV template for image generation */}
        <div className="hidden">
          <div
            ref={canvasRef}
            className="cv-template"
            style={{
              width: "1000px",
              padding: "40px",
              fontFamily: "sans-serif",
            }}
          >
            <CVImageTemplate />
          </div>
        </div>
      </div>
    );
  }
}

// Component for the image-based CV template
function CVImageTemplate() {
  const { t, language } = useLanguage();

  const educationData = [
    {
      id: 1,
      period: "2024",
      degree: t("education.bachelor"),
      institution: "S-1 Pend.B.Inggris",
    },
    {
      id: 2,
      period: "2019 - 2022",
      degree: t("education.highSchool"),
      institution: "MA AL ITTIHAD",
    },
    {
      id: 3,
      period: "2016 - 2019",
      degree: t("education.juniorHigh"),
      institution: "MTS AL ITTIHAD",
    },
    {
      id: 4,
      period: "2010 - 2016",
      degree: t("education.elementary"),
      institution: "SDN KESAMBEN 02",
    },
  ];

  const experienceData = [
    {
      id: 1,
      period: "2024",
      title: t("experience.admin"),
      company: "Enryu Jockey",
      description: t("experience.adminDesc"),
    },
    {
      id: 2,
      period: "2024",
      title: t("experience.mua"),
      company: "Manzila MUA",
      description: t("experience.muaDesc"),
    },
    {
      id: 3,
      period: "2023",
      title: t("experience.retail"),
      company: "Minishop Lely",
      description: t("experience.retailDesc"),
    },
  ];

  const skillsData = [
    {
      category: t("cv.skills.teaching"),
      skills: [
        "Curriculum Development",
        "Classroom Management",
        "Student Assessment",
        "Lesson Planning",
      ],
    },
    {
      category: t("cv.skills.languages"),
      skills: ["Indonesian (Native)", "English (Fluent)", "Arabic (Basic)"],
    },
    {
      category: t("cv.skills.technical"),
      skills: [
        "Microsoft Office",
        "Google Workspace",
        "Basic Web Design",
        "Social Media Management",
      ],
    },
    {
      category: t("cv.skills.soft"),
      skills: [
        "Communication",
        "Leadership",
        "Time Management",
        "Adaptability",
        "Problem Solving",
      ],
    },
  ];

  // Determine if we need to use a more compact layout based on content length
  const useCompactLayout =
    educationData.length > 3 ||
    experienceData.length > 2 ||
    skillsData.length > 3;

  return (
    <div className="cv-template bg-zinc-900 text-white p-10 rounded-xl">
      {/* Header - Make it more compact if needed */}
      <div
        className={`flex flex-col md:flex-row gap-${
          useCompactLayout ? "4" : "8"
        } mb-${useCompactLayout ? "6" : "10"} pb-${
          useCompactLayout ? "6" : "10"
        } border-b border-pink-500/30`}
      >
        <div className="md:w-1/4">
          <div
            className={`w-${useCompactLayout ? "32" : "40"} h-${
              useCompactLayout ? "32" : "40"
            } rounded-full border-4 border-gradient-to-r from-pink-500 to-purple-500 overflow-hidden mx-auto md:mx-0`}
          >
            <img
              src="/images/rofi.jpg"
              alt="Qodimatur Rofiah"
              className="object-cover w-full h-full"
              crossOrigin="anonymous"
            />
          </div>
        </div>

        <div className="md:w-3/4">
          <h1
            className={`text-${
              useCompactLayout ? "3xl" : "4xl"
            } font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text`}
          >
            Qodimatur Rofiah Immamatu Imroiah
          </h1>

          <p
            className={`text-${
              useCompactLayout ? "lg" : "xl"
            } text-zinc-300 mb-${useCompactLayout ? "4" : "6"}`}
          >
            {t("about.statusValue")}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center mr-3">
                <span className="text-pink-500">📧</span>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Email</p>
                <p className="text-zinc-300">qodimaturrofiah@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center mr-3">
                <span className="text-pink-500">📱</span>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Phone</p>
                <p className="text-zinc-300">+62 889 9107 1779</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center mr-3">
                <span className="text-pink-500">📍</span>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Location</p>
                <p className="text-zinc-300">Malang, Indonesia</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center mr-3">
                <span className="text-pink-500">🎂</span>
              </div>
              <div>
                <p className="text-sm text-zinc-400">
                  {language === "en" ? "Birth Date" : "Tanggal Lahir"}
                </p>
                <p className="text-zinc-300">{t("about.birthDateValue")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Summary - More compact if needed */}
      <div className={`mb-${useCompactLayout ? "6" : "10"}`}>
        <h2
          className={`text-${useCompactLayout ? "xl" : "2xl"} font-bold mb-${
            useCompactLayout ? "3" : "4"
          } flex items-center text-pink-500`}
        >
          <span className="mr-2">🌐</span>
          {t("cv.professionalSummary")}
        </h2>

        <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
          <p className="text-zinc-300">{t("summary.p1")}</p>
          {!useCompactLayout && (
            <p className="text-zinc-300 mt-4">{t("summary.p3")}</p>
          )}
        </div>
      </div>

      {/* Two column layout for the rest - Adjust spacing based on content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div>
          {/* Education */}
          <div className={`mb-${useCompactLayout ? "6" : "10"}`}>
            <h2
              className={`text-${
                useCompactLayout ? "xl" : "2xl"
              } font-bold mb-${
                useCompactLayout ? "3" : "4"
              } flex items-center text-pink-500`}
            >
              <span className="mr-2">🎓</span>
              {t("cv.education")}
            </h2>

            <div className={`space-y-${useCompactLayout ? "3" : "6"}`}>
              {educationData.map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700"
                >
                  <span className="text-pink-500 font-medium">
                    {item.period}
                  </span>
                  <h3
                    className={`text-${
                      useCompactLayout ? "lg" : "xl"
                    } font-bold mt-1`}
                  >
                    {item.degree}
                  </h3>
                  <p className="text-zinc-400">{item.institution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2
              className={`text-${
                useCompactLayout ? "xl" : "2xl"
              } font-bold mb-${
                useCompactLayout ? "3" : "4"
              } flex items-center text-pink-500`}
            >
              <span className="mr-2">🏆</span>
              {t("cv.skills.title")}
            </h2>

            <div className={`space-y-${useCompactLayout ? "3" : "4"}`}>
              {skillsData.map((category, index) => (
                <div
                  key={index}
                  className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700"
                >
                  <h3 className="text-lg font-semibold mb-2 text-pink-500">
                    {category.category}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-zinc-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div>
          {/* Work Experience */}
          <div className={`mb-${useCompactLayout ? "6" : "10"}`}>
            <h2
              className={`text-${
                useCompactLayout ? "xl" : "2xl"
              } font-bold mb-${
                useCompactLayout ? "3" : "4"
              } flex items-center text-pink-500`}
            >
              <span className="mr-2">💼</span>
              {t("cv.workExperience")}
            </h2>

            <div className={`space-y-${useCompactLayout ? "3" : "6"}`}>
              {experienceData.map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700"
                >
                  <span className="text-pink-500 font-medium">
                    {item.period}
                  </span>
                  <h3
                    className={`text-${
                      useCompactLayout ? "lg" : "xl"
                    } font-bold mt-1`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 mb-2">{item.company}</p>
                  <p className="text-zinc-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2
              className={`text-${
                useCompactLayout ? "xl" : "2xl"
              } font-bold mb-${
                useCompactLayout ? "3" : "4"
              } flex items-center text-pink-500`}
            >
              <span className="mr-2">🗣️</span>
              {t("cv.languages")}
            </h2>

            <div className={`space-y-${useCompactLayout ? "3" : "4"}`}>
              <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
                <h3 className="font-semibold mb-2">Indonesian</h3>
                <div className="w-full bg-zinc-700 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <p className="text-right text-xs mt-1 text-zinc-400">Native</p>
              </div>

              <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
                <h3 className="font-semibold mb-2">English</h3>
                <div className="w-full bg-zinc-700 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <p className="text-right text-xs mt-1 text-zinc-400">Fluent</p>
              </div>

              <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
                <h3 className="font-semibold mb-2">Arabic</h3>
                <div className="w-full bg-zinc-700 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full"
                    style={{ width: "40%" }}
                  ></div>
                </div>
                <p className="text-right text-xs mt-1 text-zinc-400">Basic</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`mt-${useCompactLayout ? "6" : "10"} pt-${
          useCompactLayout ? "4" : "6"
        } border-t border-pink-500/30 text-center`}
      >
        <p className="text-zinc-400 text-sm">
          {language === "en"
            ? `Generated on ${new Date().toLocaleDateString()} • Qodimatur Rofiah Immamatu Imroiah CV`
            : `Dibuat pada ${new Date().toLocaleDateString()} • CV Qodimatur Rofiah Immamatu Imroiah`}
        </p>
      </div>
    </div>
  );
}
