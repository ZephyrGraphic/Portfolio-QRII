"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "id"

type Translations = {
  [key: string]: {
    en: string
    id: string
  }
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Translations = {
  // General
  back: {
    en: "Back",
    id: "Kembali",
  },

  // Navbar
  "nav.home": {
    en: "Home",
    id: "Beranda",
  },
  "nav.about": {
    en: "About",
    id: "Tentang",
  },
  "nav.education": {
    en: "Education",
    id: "Pendidikan",
  },
  "nav.experience": {
    en: "Experience",
    id: "Pengalaman",
  },
  "nav.skills": {
    en: "Skills",
    id: "Keahlian",
  },
  "nav.stats": {
    en: "Stats",
    id: "Statistik",
  },
  "nav.summary": {
    en: "Summary",
    id: "Ringkasan",
  },
  "nav.contact": {
    en: "Contact",
    id: "Kontak",
  },
  "nav.cv": {
    en: "CV",
    id: "CV",
  },

  // Hero Section
  "hero.subtitle": {
    en: "Educator & Student with a passion for teaching and continuous learning",
    id: "Pendidik & Mahasiswa dengan semangat mengajar dan pembelajaran berkelanjutan",
  },
  "hero.cta.contact": {
    en: "Get in Touch",
    id: "Hubungi Saya",
  },
  "hero.cta.learnMore": {
    en: "Learn More",
    id: "Pelajari Lebih Lanjut",
  },

  // About Section
  "about.title": {
    en: "About Me",
    id: "Tentang Saya",
  },
  "about.intro": {
    en: "Hello! I'm Qodimatur Rofiah Immamatu Imroiah, an educator and student passionate about teaching and continuous learning.",
    id: "Halo! Saya Qodimatur Rofiah Immamatu Imroiah, seorang pendidik dan mahasiswa yang bersemangat tentang mengajar dan pembelajaran berkelanjutan.",
  },
  "about.personalInfo": {
    en: "Personal Info",
    id: "Informasi Pribadi",
  },
  "about.fullName": {
    en: "Full Name:",
    id: "Nama Lengkap:",
  },
  "about.status": {
    en: "Status:",
    id: "Status:",
  },
  "about.statusValue": {
    en: "Student & Educator",
    id: "Mahasiswa & Pendidik",
  },
  "about.location": {
    en: "Location & Birth",
    id: "Lokasi & Kelahiran",
  },
  "about.birthPlace": {
    en: "Birth Place:",
    id: "Tempat Lahir:",
  },
  "about.birthDate": {
    en: "Birth Date:",
    id: "Tanggal Lahir:",
  },
  "about.birthDateValue": {
    en: "July 8, 2004",
    id: "8 Juli 2004",
  },
  "about.description": {
    en: "I'm currently pursuing my Bachelor's degree in English Education while also working as an educator. I'm passionate about teaching young students and helping them develop their skills in reading and writing, particularly in Quranic studies.",
    id: "Saat ini saya sedang menempuh gelar Sarjana Pendidikan Bahasa Inggris sambil bekerja sebagai pendidik. Saya bersemangat mengajar siswa muda dan membantu mereka mengembangkan keterampilan membaca dan menulis, khususnya dalam studi Al-Quran.",
  },
  "about.readMore": {
    en: "Read More",
    id: "Baca Selengkapnya",
  },
  "about.biography": {
    en: "Biography",
    id: "Biografi",
  },
  "about.bio.p1": {
    en: "I was born in Malang on July 8, 2004. From an early age, I developed a passion for education and helping others learn.",
    id: "Saya lahir di Malang pada 8 Juli 2004. Sejak usia dini, saya mengembangkan minat untuk pendidikan dan membantu orang lain belajar.",
  },
  "about.bio.p2": {
    en: "My educational journey has equipped me with the knowledge and skills needed to be an effective educator, particularly in teaching elementary school students and Quranic studies.",
    id: "Perjalanan pendidikan saya telah membekali saya dengan pengetahuan dan keterampilan yang diperlukan untuk menjadi pendidik yang efektif, khususnya dalam mengajar siswa sekolah dasar dan studi Al-Quran.",
  },
  "about.bio.p3": {
    en: "I believe in the power of education to transform lives and am committed to making a positive impact through my teaching.",
    id: "Saya percaya pada kekuatan pendidikan untuk mengubah kehidupan dan berkomitmen untuk memberikan dampak positif melalui pengajaran saya.",
  },
  "about.interests": {
    en: "Interests",
    id: "Minat",
  },

  // Education Section
  "education.title": {
    en: "Education",
    id: "Pendidikan",
  },
  "education.description": {
    en: "My educational journey has provided me with a strong foundation in teaching and learning methodologies.",
    id: "Perjalanan pendidikan saya telah memberikan fondasi yang kuat dalam metodologi pengajaran dan pembelajaran.",
  },
  "education.viewAll": {
    en: "View All Education",
    id: "Lihat Semua Pendidikan",
  },
  "education.bachelor": {
    en: "Bachelor's Degree in English Education",
    id: "Sarjana Pendidikan Bahasa Inggris",
  },
  "education.highSchool": {
    en: "High School",
    id: "Sekolah Menengah Atas",
  },
  "education.juniorHigh": {
    en: "Junior High School",
    id: "Sekolah Menengah Pertama",
  },
  "education.elementary": {
    en: "Elementary School",
    id: "Sekolah Dasar",
  },
  "education.bachelorDesc": {
    en: "Studied English Education with a focus on teaching methodologies and language acquisition.",
    id: "Mempelajari Pendidikan Bahasa Inggris dengan fokus pada metodologi pengajaran dan pemerolehan bahasa.",
  },
  "education.highSchoolDesc": {
    en: "Completed high school education with a focus on language and humanities.",
    id: "Menyelesaikan pendidikan sekolah menengah atas dengan fokus pada bahasa dan humaniora.",
  },
  "education.juniorHighDesc": {
    en: "Completed junior high school education with excellent academic standing.",
    id: "Menyelesaikan pendidikan sekolah menengah pertama dengan prestasi akademik yang sangat baik.",
  },
  "education.elementaryDesc": {
    en: "Completed elementary education, developing a strong foundation for future learning.",
    id: "Menyelesaikan pendidikan dasar, mengembangkan fondasi yang kuat untuk pembelajaran di masa depan.",
  },
  "education.achievements": {
    en: "Achievements",
    id: "Prestasi",
  },
  "education.bachelor.achievement1": {
    en: "Maintained high academic standing throughout the program",
    id: "Mempertahankan prestasi akademik tinggi sepanjang program",
  },
  "education.bachelor.achievement2": {
    en: "Participated in teaching practicum with excellent feedback",
    id: "Berpartisipasi dalam praktikum mengajar dengan umpan balik yang sangat baik",
  },
  "education.bachelor.achievement3": {
    en: "Developed innovative teaching methodologies for language learning",
    id: "Mengembangkan metodologi pengajaran inovatif untuk pembelajaran bahasa",
  },
  "education.highSchool.achievement1": {
    en: "Graduated with honors",
    id: "Lulus dengan predikat kehormatan",
  },
  "education.highSchool.achievement2": {
    en: "Active in extracurricular activities",
    id: "Aktif dalam kegiatan ekstrakurikuler",
  },
  "education.juniorHigh.achievement1": {
    en: "Consistently ranked in the top of the class",
    id: "Secara konsisten berada di peringkat atas kelas",
  },
  "education.elementary.achievement1": {
    en: "Received recognition for academic excellence",
    id: "Menerima penghargaan untuk keunggulan akademik",
  },

  // Experience Section
  "experience.title": {
    en: "Experience",
    id: "Pengalaman",
  },
  "experience.description": {
    en: "My professional experiences have equipped me with valuable skills in various domains.",
    id: "Pengalaman profesional saya telah membekali saya dengan keterampilan berharga di berbagai bidang.",
  },
  "experience.viewAll": {
    en: "View All Experience",
    id: "Lihat Semua Pengalaman",
  },
  "experience.admin": {
    en: "Admin",
    id: "Admin",
  },
  "experience.adminDesc": {
    en: "Worked as an admin for an online game jockey service platform.",
    id: "Bekerja sebagai admin untuk platform layanan joki game online.",
  },
  "experience.mua": {
    en: "Assistant Make Up Artist",
    id: "Asisten Penata Rias",
  },
  "experience.muaDesc": {
    en: "Assisted with makeup application and client management.",
    id: "Membantu aplikasi tata rias dan manajemen klien.",
  },
  "experience.retail": {
    en: "Retail Staff",
    id: "Staf Toko",
  },
  "experience.retailDesc": {
    en: "Worked as a retail staff member at a private store.",
    id: "Bekerja sebagai anggota staf toko di toko swasta.",
  },
  "experience.responsibilities": {
    en: "Responsibilities",
    id: "Tanggung Jawab",
  },
  "experience.admin.responsibility1": {
    en: "Managed customer inquiries and service requests",
    id: "Mengelola pertanyaan pelanggan dan permintaan layanan",
  },
  "experience.admin.responsibility2": {
    en: "Coordinated between clients and service providers",
    id: "Mengkoordinasikan antara klien dan penyedia layanan",
  },
  "experience.admin.responsibility3": {
    en: "Maintained records and handled administrative tasks",
    id: "Memelihara catatan dan menangani tugas administratif",
  },
  "experience.mua.responsibility1": {
    en: "Assisted with makeup application for various clients",
    id: "Membantu aplikasi tata rias untuk berbagai klien",
  },
  "experience.mua.responsibility2": {
    en: "Prepared equipment and supplies for makeup sessions",
    id: "Menyiapkan peralatan dan perlengkapan untuk sesi tata rias",
  },
  "experience.mua.responsibility3": {
    en: "Helped with client scheduling and management",
    id: "Membantu dengan penjadwalan dan manajemen klien",
  },
  "experience.retail.responsibility1": {
    en: "Provided customer service and product information",
    id: "Memberikan layanan pelanggan dan informasi produk",
  },
  "experience.retail.responsibility2": {
    en: "Managed inventory and restocked merchandise",
    id: "Mengelola inventaris dan mengisi ulang barang dagangan",
  },
  "experience.retail.responsibility3": {
    en: "Processed sales transactions and handled cash",
    id: "Memproses transaksi penjualan dan menangani uang tunai",
  },

  // Skills Section
  "skills.title": {
    en: "Skills",
    id: "Keahlian",
  },
  "skills.description": {
    en: "I have developed a range of skills that enable me to be an effective educator and professional.",
    id: "Saya telah mengembangkan berbagai keterampilan yang memungkinkan saya menjadi pendidik dan profesional yang efektif.",
  },
  "skills.viewAll": {
    en: "View All Skills",
    id: "Lihat Semua Keahlian",
  },
  "skills.teaching": {
    en: "Elementary School Teaching",
    id: "Pengajaran Sekolah Dasar",
  },
  "skills.teachingDesc": {
    en: "Experienced in teaching elementary school students with effective pedagogical methods.",
    id: "Berpengalaman mengajar siswa sekolah dasar dengan metode pedagogis yang efektif.",
  },
  "skills.quran": {
    en: "Quranic Reading & Writing",
    id: "Membaca & Menulis Al-Quran",
  },
  "skills.quranDesc": {
    en: "Specialized in teaching Quranic reading and writing to students of various ages.",
    id: "Mengkhususkan diri dalam mengajar membaca dan menulis Al-Quran kepada siswa berbagai usia.",
  },
  "skills.engagement": {
    en: "Student Engagement",
    id: "Keterlibatan Siswa",
  },
  "skills.engagementDesc": {
    en: "Skilled in creating engaging learning environments that motivate young learners.",
    id: "Terampil dalam menciptakan lingkungan belajar yang menarik yang memotivasi pelajar muda.",
  },
  "skills.adaptive": {
    en: "Adaptive Teaching",
    id: "Pengajaran Adaptif",
  },
  "skills.adaptiveDesc": {
    en: "Able to adapt teaching methods to accommodate different learning styles and needs.",
    id: "Mampu menyesuaikan metode pengajaran untuk mengakomodasi gaya dan kebutuhan belajar yang berbeda.",
  },
  "skills.keyAspects": {
    en: "Key Aspects",
    id: "Aspek Utama",
  },
  "skills.teaching.detail1": {
    en: "Curriculum development and lesson planning",
    id: "Pengembangan kurikulum dan perencanaan pelajaran",
  },
  "skills.teaching.detail2": {
    en: "Classroom management and student assessment",
    id: "Manajemen kelas dan penilaian siswa",
  },
  "skills.teaching.detail3": {
    en: "Creating engaging educational materials",
    id: "Membuat materi pendidikan yang menarik",
  },
  "skills.quran.detail1": {
    en: "Tajweed rules and proper pronunciation",
    id: "Aturan tajwid dan pengucapan yang benar",
  },
  "skills.quran.detail2": {
    en: "Arabic script writing and reading",
    id: "Menulis dan membaca tulisan Arab",
  },
  "skills.quran.detail3": {
    en: "Memorization techniques and practice methods",
    id: "Teknik menghafal dan metode latihan",
  },
  "skills.engagement.detail1": {
    en: "Interactive teaching methods and activities",
    id: "Metode dan aktivitas pengajaran interaktif",
  },
  "skills.engagement.detail2": {
    en: "Building rapport and positive relationships with students",
    id: "Membangun hubungan dan hubungan positif dengan siswa",
  },
  "skills.engagement.detail3": {
    en: "Creating a supportive and motivating learning environment",
    id: "Menciptakan lingkungan belajar yang mendukung dan memotivasi",
  },
  "skills.adaptive.detail1": {
    en: "Identifying different learning styles and needs",
    id: "Mengidentifikasi gaya dan kebutuhan belajar yang berbeda",
  },
  "skills.adaptive.detail2": {
    en: "Modifying teaching approaches for individual students",
    id: "Memodifikasi pendekatan pengajaran untuk siswa individu",
  },
  "skills.adaptive.detail3": {
    en: "Implementing differentiated instruction techniques",
    id: "Menerapkan teknik instruksi yang berbeda",
  },

  // Stats Section
  "stats.title": {
    en: "Statistics",
    id: "Statistik",
  },
  "stats.students": {
    en: "Students Taught",
    id: "Siswa yang Diajar",
  },
  "stats.experience": {
    en: "Years Experience",
    id: "Tahun Pengalaman",
  },
  "stats.specialties": {
    en: "Teaching Specialties",
    id: "Spesialisasi Mengajar",
  },
  "stats.education": {
    en: "Education Milestones",
    id: "Pencapaian Pendidikan",
  },

  // Summary Section
  "summary.title": {
    en: "Professional Summary",
    id: "Ringkasan Profesional",
  },
  "summary.readMore": {
    en: "Read Full Summary",
    id: "Baca Ringkasan Lengkap",
  },
  "summary.p1": {
    en: "I am a dedicated educator with a passion for teaching elementary school students and Quranic reading and writing. Currently pursuing my Bachelor's degree in English Education, I balance my academic pursuits with my teaching responsibilities.",
    id: "Saya adalah pendidik yang berdedikasi dengan semangat untuk mengajar siswa sekolah dasar dan membaca serta menulis Al-Quran. Saat ini sedang menempuh gelar Sarjana Pendidikan Bahasa Inggris, saya menyeimbangkan kegiatan akademis dengan tanggung jawab mengajar.",
  },
  "summary.p2": {
    en: "My experience spans across different roles, from retail to administrative work, which has equipped me with versatile skills in communication, organization, and adaptability. I am committed to continuous learning and growth, both as an educator and as a student.",
    id: "Pengalaman saya mencakup berbagai peran, dari retail hingga pekerjaan administratif, yang telah membekali saya dengan keterampilan serbaguna dalam komunikasi, organisasi, dan adaptasi. Saya berkomitmen untuk pembelajaran dan pertumbuhan berkelanjutan, baik sebagai pendidik maupun sebagai mahasiswa.",
  },
  "summary.p3": {
    en: "My goal is to inspire and empower young learners, helping them build a strong foundation for their educational journey while nurturing their curiosity and love for learning.",
    id: "Tujuan saya adalah menginspirasi dan memberdayakan pelajar muda, membantu mereka membangun fondasi yang kuat untuk perjalanan pendidikan mereka sambil memupuk rasa ingin tahu dan cinta belajar.",
  },
  "summary.professionalOverview": {
    en: "Professional Overview",
    id: "Ikhtisar Profesional",
  },
  "summary.philosophy": {
    en: "Teaching Philosophy",
    id: "Filosofi Mengajar",
  },
  "summary.philosophy.p1": {
    en: "I believe that every student has unique potential and learning styles. My teaching approach focuses on creating an inclusive environment where all students can thrive.",
    id: "Saya percaya bahwa setiap siswa memiliki potensi dan gaya belajar yang unik. Pendekatan pengajaran saya berfokus pada menciptakan lingkungan inklusif di mana semua siswa dapat berkembang.",
  },
  "summary.philosophy.p2": {
    en: "I emphasize active learning, critical thinking, and practical application of knowledge. I strive to make learning enjoyable and meaningful for my students.",
    id: "Saya menekankan pembelajaran aktif, pemikiran kritis, dan aplikasi praktis pengetahuan. Saya berusaha untuk membuat pembelajaran menyenangkan dan bermakna bagi siswa saya.",
  },
  "summary.goals": {
    en: "Professional Goals",
    id: "Tujuan Profesional",
  },
  "summary.goals.p1": {
    en: "My short-term goal is to complete my Bachelor's degree in English Education and expand my teaching expertise in both elementary education and Quranic studies.",
    id: "Tujuan jangka pendek saya adalah menyelesaikan gelar Sarjana Pendidikan Bahasa Inggris dan memperluas keahlian mengajar saya baik dalam pendidikan dasar maupun studi Al-Quran.",
  },
  "summary.goals.p2": {
    en: "In the long term, I aspire to develop innovative teaching methodologies that can help more students access quality education, particularly in religious studies and language learning.",
    id: "Dalam jangka panjang, saya bercita-cita untuk mengembangkan metodologi pengajaran inovatif yang dapat membantu lebih banyak siswa mengakses pendidikan berkualitas, khususnya dalam studi agama dan pembelajaran bahasa.",
  },

  // Contact Section
  "contact.title": {
    en: "Get In Touch",
    id: "Hubungi Saya",
  },
  "contact.description": {
    en: "Feel free to reach out through any of these channels. I'm always open to new opportunities and connections.",
    id: "Jangan ragu untuk menghubungi melalui salah satu saluran ini. Saya selalu terbuka untuk peluang dan koneksi baru.",
  },
  "contact.connect": {
    en: "Connect",
    id: "Hubungkan",
  },
  "contact.workTogether": {
    en: "Let's Work Together",
    id: "Mari Bekerja Sama",
  },
  "contact.reachOut": {
    en: "Feel free to reach out if you're interested in collaborating or have any questions about my work.",
    id: "Jangan ragu untuk menghubungi jika Anda tertarik untuk berkolaborasi atau memiliki pertanyaan tentang pekerjaan saya.",
  },
  "contact.sendMessage": {
    en: "Send Message",
    id: "Kirim Pesan",
  },

  // CV Section
  "cv.title": {
    en: "Curriculum Vitae",
    id: "Daftar Riwayat Hidup",
  },
  "cv.downloadTitle": {
    en: "Download My CV",
    id: "Unduh CV Saya",
  },
  "cv.description": {
    en: "Get a comprehensive overview of my education, experience, and skills. You can download my CV in PDF format or view it online.",
    id: "Dapatkan gambaran komprehensif tentang pendidikan, pengalaman, dan keterampilan saya. Anda dapat mengunduh CV saya dalam format PDF atau melihatnya secara online.",
  },
  "cv.download": {
    en: "Download CV",
    id: "Unduh CV",
  },
  "cv.viewOnline": {
    en: "View Online",
    id: "Lihat Online",
  },
  "cv.professionalSummary": {
    en: "Professional Summary",
    id: "Ringkasan Profesional",
  },
  "cv.workExperience": {
    en: "Work Experience",
    id: "Pengalaman Kerja",
  },
  "cv.education": {
    en: "Education",
    id: "Pendidikan",
  },
  "cv.skills.title": {
    en: "Skills",
    id: "Keahlian",
  },
  "cv.skills.teaching": {
    en: "Teaching Skills",
    id: "Keahlian Mengajar",
  },
  "cv.skills.languages": {
    en: "Language Skills",
    id: "Keahlian Bahasa",
  },
  "cv.skills.technical": {
    en: "Technical Skills",
    id: "Keahlian Teknis",
  },
  "cv.skills.soft": {
    en: "Soft Skills",
    id: "Keahlian Lunak",
  },
  "cv.languages": {
    en: "Languages",
    id: "Bahasa",
  },

  // Footer
  "footer.copyright": {
    en: "© 2024 Qodimatur Rofiah Immamatu Imroiah. All rights reserved.",
    id: "© 2024 Qodimatur Rofiah Immamatu Imroiah. Hak cipta dilindungi undang-undang.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "id")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language]
    }
    console.warn(`Translation key not found: ${key}`)
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

