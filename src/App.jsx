import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Download,
  Upload,
  RefreshCw,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  User,
  GraduationCap,
  Briefcase,
  Users,
  Award,
  Sparkles,
  Printer,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Globe,
  Settings,
  X,
  Code
} from 'lucide-react';

const LinkedinIcon = ({ className = "w-3 h-3" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.85 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
  </svg>
);

const GithubIcon = ({ className = "w-3 h-3" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
  </svg>
);

// ============================================================================
// DUMMY DATA DEFAULT (STRUKTUR ATS LENGKAP J CV STYLE)
// ============================================================================
const DEFAULT_CV_DATA = {
  personalInfo: {
    fullName: "MUHAMMAD ARYA PRATAMA",
    jobTitle: "Software Engineer | Full-Stack & Frontend Specialist",
    email: "arya.pratama@email.com",
    phone: "+62 812-3456-7890",
    location: "Jakarta, Indonesia",
    linkedin: "linkedin.com/in/aryapratama",
    github: "github.com/aryapratama",
    website: "aryapratama.dev",
    showPhoto: false,
    photoUrl: ""
  },
  summary: "Lulusan Ilmu Komputer Universitas Indonesia (IPK 3.88) dengan spesialisasi Rekayasa Perangkat Lunak dan Pengembangan Web Skala Besar. Memiliki pengalaman 2+ tahun membangun aplikasi berbasis React, TypeScript, dan Node.js dengan rekam jejak sukses mengoptimalkan performa Core Web Vitals hingga 28% serta memenangkan kompetisi Hackathon tingkat nasional. Terbiasa dengan metodologi Agile, kolaborasi lintas divisi, dan penulisan kode teruji yang bersih.",
  education: [
    {
      id: "edu-1",
      institution: "Universitas Indonesia",
      city: "Depok, Jawa Barat",
      degree: "Sarjana Komputer (S.Kom) - Ilmu Komputer",
      gpa: "3.88 / 4.00 (Cum Laude)",
      startDate: "Agu 2020",
      endDate: "Jul 2024",
      bullets: [
        "Penerima Beasiswa Prestasi Unggulan Kemendikbudristek selama 4 semester berturut-turut atas pencapaian akademik.",
        "Menyelesaikan tugas akhir bertajuk 'Optimasi Sistem Rekomendasi E-Commerce Menggunakan Graph Neural Network' dengan nilai A.",
        "Asisten Dosen untuk mata kuliah Struktur Data & Algoritma dan Pemrograman Web (membimbing 140+ mahasiswa)."
      ]
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "PT GoTo Gojek Tokopedia Tbk",
      role: "Software Engineer Intern (Frontend)",
      location: "Jakarta Selatan, Indonesia",
      startDate: "Feb 2024",
      endDate: "Agu 2024",
      bullets: [
        "Mengembangkan 12+ komponen UI reusable berstandar aksesibilitas tinggi menggunakan React, TypeScript, dan Tailwind CSS untuk portal Merchant Partner.",
        "Meningkatkan skor Largest Contentful Paint (LCP) sebesar 28% melalui implementasi dynamic code-splitting dan image optimization.",
        "Berkolaborasi aktif dengan Product Manager, UI/UX Designer, dan Backend Engineer dalam siklus sprint agile 2-mingguan."
      ]
    },
    {
      id: "exp-2",
      company: "Traveloka",
      role: "Junior Web Developer (Contract)",
      location: "Tangerang, Banten",
      startDate: "Sep 2023",
      endDate: "Jan 2024",
      bullets: [
        "Memodernisasi antarmuka checkout flow pemesanan tiket dengan penanganan state asynchronous yang melayani 40.000+ sesi harian.",
        "Memangkas waktu latensi client-side query hingga 35% dengan arsitektur TanStack Query dan intelligent caching.",
        "Mengimplementasikan automated unit & end-to-end tests menggunakan Jest dan Cypress dengan code coverage mencapai 85%."
      ]
    }
  ],
  organization: [
    {
      id: "org-1",
      name: "BEM Fakultas Ilmu Komputer UI",
      role: "Kepala Departemen Teknologi Informasi",
      location: "Depok, Indonesia",
      startDate: "Jan 2023",
      endDate: "Des 2023",
      bullets: [
        "Memimpin tim beranggotakan 14 mahasiswa dalam merancang, membangun, dan merilis portal informasi terpadu yang diakses 2.500+ mahasiswa aktif.",
        "Menginisiasi program Tech Mentorship & Web Development Bootcamp yang melatih 120 peserta siap magang.",
        "Mengelola infrastruktur server cloud fakultas dengan pencapaian zero unplanned downtime sepanjang kepengurusan."
      ]
    },
    {
      id: "org-2",
      name: "Google Developer Student Clubs (GDSC) UI",
      role: "Core Team Lead - Web Development",
      location: "Depok, Indonesia",
      startDate: "Agu 2022",
      endDate: "Jul 2023",
      bullets: [
        "Menyelenggarakan 6 seminar teknis dan hands-on workshop web development dengan total 750+ peserta.",
        "Membimbing 4 proyek open-source mahasiswa untuk kompetisi global Google Solution Challenge."
      ]
    }
  ],
  skills: {
    hardSkills: "React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5/CSS3, Tailwind CSS, Node.js, Express, PostgreSQL, RESTful APIs, Git, Docker, Jest",
    softSkills: "Problem Solving, Agile/Scrum, Kepemimpinan Tim, Komunikasi Efektif, Cross-functional Collaboration",
    languages: "Bahasa Indonesia (Native), English (Professional Working Proficiency - TOEFL ITP 610)"
  },
  achievements: [
    {
      id: "ach-1",
      title: "Juara 1 - National Hackathon BCA Finhacks 2023",
      year: "2023",
      description: "Membangun prototipe aplikasi asisten keuangan mikro untuk UMKM berbasis AI dari seleksi 350+ tim se-Indonesia."
    },
    {
      id: "ach-2",
      title: "Finalis Top 5 - Arkavidia Informatics Festival ITB",
      year: "2022",
      description: "Kompetisi Competitive Programming dan Inovasi Aplikasi Web tingkat nasional."
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "CareerPath - AI-Powered Resume & Job Matcher",
      role: "Lead Fullstack Developer",
      year: "2024",
      link: "github.com/aryapratama/careerpath",
      bullets: [
        "Mengembangkan platform web analisis kecocokan resume ATS terhadap deskripsi lowongan kerja secara real-time.",
        "Membangun arsitektur frontend cepat menggunakan Next.js App Router dan Tailwind CSS dengan 1.500+ monthly active users."
      ]
    },
    {
      id: "proj-2",
      name: "SaaS Analytics Dashboard UI Kit",
      role: "Creator & Maintainer",
      year: "2023",
      link: "github.com/aryapratama/saas-dashboard",
      bullets: [
        "Membangun library open-source template dashboard admin interaktif yang meraih 450+ bintang di GitHub."
      ]
    }
  ]
};

// ============================================================================
// MAIN COMPONENT: APP / RESUME BUILDER
// ============================================================================
export default function App() {
  const [cvData, setCvData] = useState(() => {
    const saved = localStorage.getItem('j_cv_data') || localStorage.getItem('kinobi_cv_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved CV data:', e);
      }
    }
    return DEFAULT_CV_DATA;
  });

  // Settings & Theme
  const [zoomLevel, setZoomLevel] = useState(90);
  const [fontFamily, setFontFamily] = useState('font-sans'); // font-sans | font-serif
  const [themeColor, setThemeColor] = useState('#1e3a8a'); // #1e3a8a (Kinobi Navy), #0f172a (Slate Black), #047857 (Emerald), #7c2d12 (Auburn)
  const [lineSpacing, setLineSpacing] = useState('normal'); // compact | normal

  // Accordion Section States
  const [openSections, setOpenSections] = useState({
    personal: true,
    summary: true,
    education: true,
    experience: true,
    organization: true,
    skills: true,
    achievements: false,
    projects: true
  });

  // Modals & Export States
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [jsonInputText, setJsonInputText] = useState('');
  const [importError, setImportError] = useState('');
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const previewRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('j_cv_data', JSON.stringify(cvData));
  }, [cvData]);

  // Section toggle handler
  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Helper for deep updates
  const handlePersonalInfoChange = (field, value) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleSkillsChange = (field, value) => {
    setCvData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [field]: value
      }
    }));
  };

  // Generic Array Item Handlers (Education, Experience, Organization, Achievements, Projects)
  const handleArrayItemChange = (section, index, field, value) => {
    setCvData(prev => {
      const updatedList = [...prev[section]];
      updatedList[index] = {
        ...updatedList[index],
        [field]: value
      };
      return { ...prev, [section]: updatedList };
    });
  };

  const handleAddArrayItem = (section, defaultObj) => {
    setCvData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...defaultObj, id: `${section}-${Date.now()}` }]
    }));
  };

  const handleRemoveArrayItem = (section, index) => {
    setCvData(prev => {
      const updatedList = prev[section].filter((_, i) => i !== index);
      return { ...prev, [section]: updatedList };
    });
  };

  const handleMoveArrayItem = (section, index, direction) => {
    setCvData(prev => {
      const list = [...prev[section]];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;
      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;
      return { ...prev, [section]: list };
    });
  };

  // Bullets Handlers
  const handleBulletChange = (section, itemIndex, bulletIndex, value) => {
    setCvData(prev => {
      const updatedList = [...prev[section]];
      const updatedBullets = [...updatedList[itemIndex].bullets];
      updatedBullets[bulletIndex] = value;
      updatedList[itemIndex] = {
        ...updatedList[itemIndex],
        bullets: updatedBullets
      };
      return { ...prev, [section]: updatedList };
    });
  };

  const handleAddBullet = (section, itemIndex) => {
    setCvData(prev => {
      const updatedList = [...prev[section]];
      const updatedBullets = [...(updatedList[itemIndex].bullets || []), ""];
      updatedList[itemIndex] = {
        ...updatedList[itemIndex],
        bullets: updatedBullets
      };
      return { ...prev, [section]: updatedList };
    });
  };

  const handleRemoveBullet = (section, itemIndex, bulletIndex) => {
    setCvData(prev => {
      const updatedList = [...prev[section]];
      const updatedBullets = updatedList[itemIndex].bullets.filter((_, i) => i !== bulletIndex);
      updatedList[itemIndex] = {
        ...updatedList[itemIndex],
        bullets: updatedBullets
      };
      return { ...prev, [section]: updatedList };
    });
  };

  // Reset to default
  const handleResetData = () => {
    if (window.confirm("Apakah Anda yakin ingin mengatur ulang data ke template default J CV?")) {
      setCvData(DEFAULT_CV_DATA);
    }
  };

  // Export JSON file
  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cvData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    const fileName = `${(cvData.personalInfo.fullName || 'resume').replace(/\s+/g, '_')}_data.json`;
    downloadAnchor.setAttribute("download", fileName);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Copy JSON
  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(cvData, null, 2));
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  // Import JSON text or file
  const handleImportJson = () => {
    setImportError('');
    try {
      if (!jsonInputText.trim()) {
        setImportError('Harap tempel teks JSON terlebih dahulu.');
        return;
      }
      const parsed = JSON.parse(jsonInputText);
      if (!parsed.personalInfo) {
        setImportError('Format JSON tidak valid: Properti personalInfo diperlukan.');
        return;
      }
      setCvData(parsed);
      setIsImportModalOpen(false);
      setJsonInputText('');
    } catch (err) {
      setImportError('Format JSON salah atau korup: ' + err.message);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        setCvData(parsed);
        setIsImportModalOpen(false);
      } catch (err) {
        alert('File JSON tidak valid: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  // ============================================================================
  // EXPORT TO PDF VIA HTML2PDF.JS & NATIVE PRINT
  // ============================================================================
  const handleExportPdf = async () => {
    if (!previewRef.current) return;
    setIsExportingPdf(true);

    try {
      // Dynamic import html2pdf.js
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;

      const element = previewRef.current;
      const cleanName = (cvData.personalInfo.fullName || 'Resume').replace(/[^a-zA-Z0-9]/g, '_');
      const opt = {
        margin: [10, 10, 10, 10], // 10mm margins standard
        filename: `${cleanName}_CV_ATS.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2.5, // High resolution rendering
          useCORS: true,
          letterRendering: true,
          logging: false
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('html2pdf error:', err);
      // Fallback to window.print() if html2pdf fails
      alert('Mengalihkan ke jendela Cetak/Simpan PDF browser untuk hasil dokumen beresolusi vektor maksimal.');
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleNativePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* ==================================================================== */}
      {/* TOP HEADER / NAVBAR (KINOBI SAAS STYLE) */}
      {/* ==================================================================== */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Status */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">J <span className="text-blue-600">CV Builder</span></span>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-semibold border border-blue-200">
                  ATS Verified
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Pembuat & Editor CV Interaktif Format A4 Standar Internasional</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-300"
              title="Import JSON / Upload Resume"
            >
              <Upload className="w-4 h-4 text-slate-600" />
              <span>Import / JSON</span>
            </button>

            <button
              onClick={handleDownloadJson}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-300"
              title="Download Data JSON"
            >
              <Copy className="w-4 h-4 text-slate-600" />
              <span className="hidden md:inline">Simpan JSON</span>
            </button>

            <button
              onClick={handleResetData}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
              title="Reset ke Template Default"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden lg:inline">Reset</span>
            </button>

            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <button
              onClick={handleNativePrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors border border-slate-300 shadow-sm"
              title="Print atau Save PDF via browser dialog"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all shadow-md shadow-blue-500/25 disabled:opacity-50"
            >
              {isExportingPdf ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Merender PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Export to PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* 2-COLUMN MAIN CONTENT WORKSPACE */}
      {/* ==================================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================================================================== */}
        {/* KOLOM KIRI: FORM EDITOR INTERAKTIF (5 / 12 col) */}
        {/* ================================================================== */}
        <section className="lg:col-span-5 flex flex-col space-y-4 no-print">
          
          {/* Header Card Form */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900 text-base flex items-center space-x-2">
                <span>Form Editor Interaktif</span>
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-medium">Live Sync</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Semua perubahan langsung diperbarui di pratinjau A4</p>
            </div>
            <button
              onClick={() => {
                const allOpen = Object.values(openSections).every(Boolean);
                const newState = {};
                Object.keys(openSections).forEach(k => newState[k] = !allOpen);
                setOpenSections(newState);
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              {Object.values(openSections).every(Boolean) ? 'Tutup Semua' : 'Buka Semua'}
            </button>
          </div>

          {/* 1. SEKSI DATA DIRI & KONTAK */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all">
            <button
              onClick={() => toggleSection('personal')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left border-b border-slate-200 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-sm text-slate-900">1. Data Diri & Kontak</span>
                  <span className="text-xs text-slate-500 block">Nama, email, telepon, domisili, link profil</span>
                </div>
              </div>
              {openSections.personal ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.personal && (
              <div className="p-4 space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap (Sesuai Ijazah/Identitas) *</label>
                  <input
                    type="text"
                    value={cvData.personalInfo.fullName}
                    onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                    placeholder="Contoh: MUHAMMAD ARYA PRATAMA"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gelar / Sub-Judul Posisi (Opsional)</label>
                  <input
                    type="text"
                    value={cvData.personalInfo.jobTitle}
                    onChange={(e) => handlePersonalInfoChange('jobTitle', e.target.value)}
                    placeholder="Contoh: Software Engineer | Fullstack Specialist"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Aktif *</label>
                    <input
                      type="email"
                      value={cvData.personalInfo.email}
                      onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor WhatsApp / HP *</label>
                    <input
                      type="text"
                      value={cvData.personalInfo.phone}
                      onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                      placeholder="+62 812-xxxx-xxxx"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Kota & Negara Domisili</label>
                    <input
                      type="text"
                      value={cvData.personalInfo.location}
                      onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                      placeholder="Jakarta, Indonesia"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn URL / Username</label>
                    <input
                      type="text"
                      value={cvData.personalInfo.linkedin}
                      onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                      placeholder="linkedin.com/in/username"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub / Portofolio URL</label>
                    <input
                      type="text"
                      value={cvData.personalInfo.github}
                      onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                      placeholder="github.com/username"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Website / Blog (Opsional)</label>
                    <input
                      type="text"
                      value={cvData.personalInfo.website}
                      onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                      placeholder="portofolio.com"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Optional Photo Toggle */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="togglePhoto"
                      checked={cvData.personalInfo.showPhoto}
                      onChange={(e) => handlePersonalInfoChange('showPhoto', e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <label htmlFor="togglePhoto" className="text-xs text-slate-700 font-medium cursor-pointer">
                      Tampilkan Foto Profil (Catatan: Standar ATS murni umumnya tanpa foto)
                    </label>
                  </div>
                </div>

                {cvData.personalInfo.showPhoto && (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">URL Foto Profil</label>
                    <input
                      type="text"
                      value={cvData.personalInfo.photoUrl}
                      onChange={(e) => handlePersonalInfoChange('photoUrl', e.target.value)}
                      placeholder="https://example.com/foto.jpg"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. SEKSI RINGKASAN DIRI / PROFILE SUMMARY */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSection('summary')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left border-b border-slate-200 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-sm text-slate-900">2. Ringkasan Diri (Summary)</span>
                  <span className="text-xs text-slate-500 block">3-4 kalimat ringkasan pencapaian dan keahlian</span>
                </div>
              </div>
              {openSections.summary ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.summary && (
              <div className="p-4 space-y-2">
                <textarea
                  rows={4}
                  value={cvData.summary}
                  onChange={(e) => setCvData(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Tuliskan ringkasan diri yang kuat, menyebutkan latar belakang pendidikan, spesialisasi teknis, dan pencapaian terukur..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 leading-relaxed"
                />
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Tips J CV: Gunakan kata kerja aktif dan angka kuantitatif (%)</span>
                  <span>{cvData.summary ? cvData.summary.length : 0} karakter</span>
                </div>
              </div>
            )}
          </div>

          {/* 3. SEKSI PENDIDIKAN */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSection('education')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left border-b border-slate-200 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-sm text-slate-900">3. Jenjang Pendidikan</span>
                  <span className="text-xs text-slate-500 block">{cvData.education.length} Riwayat Terdaftar</span>
                </div>
              </div>
              {openSections.education ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.education && (
              <div className="p-4 space-y-4">
                {cvData.education.map((edu, index) => (
                  <div key={edu.id || index} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 relative group space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        #{index + 1} {edu.institution || 'Pendidikan Baru'}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleMoveArrayItem('education', index, -1)}
                          disabled={index === 0}
                          className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 text-slate-600"
                          title="Geser ke atas"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveArrayItem('education', index, 1)}
                          disabled={index === cvData.education.length - 1}
                          className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 text-slate-600"
                          title="Geser ke bawah"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleRemoveArrayItem('education', index)}
                          className="p-1 hover:bg-red-100 text-red-600 rounded ml-1 transition-colors"
                          title="Hapus Pendidikan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Nama Kampus / Universitas</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => handleArrayItemChange('education', index, 'institution', e.target.value)}
                          placeholder="Universitas Indonesia"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Kota / Lokasi Kampus</label>
                        <input
                          type="text"
                          value={edu.city}
                          onChange={(e) => handleArrayItemChange('education', index, 'city', e.target.value)}
                          placeholder="Depok, Jawa Barat"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Gelar & Program Studi</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleArrayItemChange('education', index, 'degree', e.target.value)}
                          placeholder="S.Kom - Ilmu Komputer"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">IPK / GPA</label>
                        <input
                          type="text"
                          value={edu.gpa}
                          onChange={(e) => handleArrayItemChange('education', index, 'gpa', e.target.value)}
                          placeholder="3.88 / 4.00"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Mulai (Bulan/Tahun)</label>
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={(e) => handleArrayItemChange('education', index, 'startDate', e.target.value)}
                          placeholder="Agu 2020"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Selesai (Bulan/Tahun)</label>
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={(e) => handleArrayItemChange('education', index, 'endDate', e.target.value)}
                          placeholder="Jul 2024 / Sekarang"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Bullets */}
                    <div className="pt-2 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11px] font-semibold text-slate-700">Poin Prestasi / Kegiatan Akademik</label>
                        <button
                          type="button"
                          onClick={() => handleAddBullet('education', index)}
                          className="text-[11px] text-blue-600 hover:text-blue-800 font-medium inline-flex items-center space-x-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Tambah Poin</span>
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {(edu.bullets || []).map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-center space-x-1.5">
                            <span className="text-slate-400 text-xs">•</span>
                            <input
                              type="text"
                              value={bullet}
                              onChange={(e) => handleBulletChange('education', index, bIdx, e.target.value)}
                              placeholder="Deskripsi kegiatan atau pencapaian..."
                              className="flex-1 px-2.5 py-1 text-xs border border-slate-300 rounded bg-white focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveBullet('education', index, bIdx)}
                              className="p-1 text-slate-400 hover:text-red-600"
                              title="Hapus poin"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddArrayItem('education', {
                    institution: "",
                    city: "",
                    degree: "",
                    gpa: "",
                    startDate: "",
                    endDate: "",
                    bullets: [""]
                  })}
                  className="w-full py-2 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Jenjang Pendidikan</span>
                </button>
              </div>
            )}
          </div>

          {/* 4. SEKSI PENGALAMAN KERJA */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSection('experience')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left border-b border-slate-200 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-sm text-slate-900">4. Pengalaman Kerja</span>
                  <span className="text-xs text-slate-500 block">{cvData.experience.length} Posisi Karir</span>
                </div>
              </div>
              {openSections.experience ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.experience && (
              <div className="p-4 space-y-4">
                {cvData.experience.map((exp, index) => (
                  <div key={exp.id || index} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 relative group space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        #{index + 1} {exp.company || 'Pengalaman Kerja Baru'}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleMoveArrayItem('experience', index, -1)}
                          disabled={index === 0}
                          className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 text-slate-600"
                          title="Geser ke atas"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveArrayItem('experience', index, 1)}
                          disabled={index === cvData.experience.length - 1}
                          className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 text-slate-600"
                          title="Geser ke bawah"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleRemoveArrayItem('experience', index)}
                          className="p-1 hover:bg-red-100 text-red-600 rounded ml-1 transition-colors"
                          title="Hapus Pengalaman"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Nama Perusahaan / Organisasi Bisnis</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleArrayItemChange('experience', index, 'company', e.target.value)}
                          placeholder="PT GoTo Gojek Tokopedia Tbk"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Posisi / Jabatan</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => handleArrayItemChange('experience', index, 'role', e.target.value)}
                          placeholder="Software Engineer Intern"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Lokasi Kantor</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => handleArrayItemChange('experience', index, 'location', e.target.value)}
                          placeholder="Jakarta / Remote"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Mulai</label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => handleArrayItemChange('experience', index, 'startDate', e.target.value)}
                          placeholder="Feb 2024"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Selesai</label>
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => handleArrayItemChange('experience', index, 'endDate', e.target.value)}
                          placeholder="Sekarang / Agu 2024"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Bullets */}
                    <div className="pt-2 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11px] font-semibold text-slate-700">Tanggung Jawab & Pencapaian (Action + Impact + Metrics)</label>
                        <button
                          type="button"
                          onClick={() => handleAddBullet('experience', index)}
                          className="text-[11px] text-blue-600 hover:text-blue-800 font-medium inline-flex items-center space-x-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Tambah Poin</span>
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {(exp.bullets || []).map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-center space-x-1.5">
                            <span className="text-slate-400 text-xs">•</span>
                            <textarea
                              rows={2}
                              value={bullet}
                              onChange={(e) => handleBulletChange('experience', index, bIdx, e.target.value)}
                              placeholder="Deskripsi terukur, misal: 'Mengembangkan fitur X yang meningkatkan konversi sebesar 20%'..."
                              className="flex-1 px-2.5 py-1 text-xs border border-slate-300 rounded bg-white focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveBullet('experience', index, bIdx)}
                              className="p-1 text-slate-400 hover:text-red-600"
                              title="Hapus poin"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddArrayItem('experience', {
                    company: "",
                    role: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    bullets: [""]
                  })}
                  className="w-full py-2 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Pengalaman Kerja</span>
                </button>
              </div>
            )}
          </div>

          {/* 5. SEKSI PENGALAMAN ORGANISASI */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSection('organization')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left border-b border-slate-200 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-sm text-slate-900">5. Pengalaman Organisasi</span>
                  <span className="text-xs text-slate-500 block">{cvData.organization.length} Kegiatan Organisasi</span>
                </div>
              </div>
              {openSections.organization ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.organization && (
              <div className="p-4 space-y-4">
                {cvData.organization.map((org, index) => (
                  <div key={org.id || index} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 relative group space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        #{index + 1} {org.name || 'Organisasi Baru'}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleMoveArrayItem('organization', index, -1)}
                          disabled={index === 0}
                          className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 text-slate-600"
                          title="Geser ke atas"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveArrayItem('organization', index, 1)}
                          disabled={index === cvData.organization.length - 1}
                          className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 text-slate-600"
                          title="Geser ke bawah"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleRemoveArrayItem('organization', index)}
                          className="p-1 hover:bg-red-100 text-red-600 rounded ml-1 transition-colors"
                          title="Hapus Organisasi"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Nama Organisasi / Komunitas</label>
                        <input
                          type="text"
                          value={org.name}
                          onChange={(e) => handleArrayItemChange('organization', index, 'name', e.target.value)}
                          placeholder="BEM Fakultas Ilmu Komputer UI"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Jabatan / Posisi</label>
                        <input
                          type="text"
                          value={org.role}
                          onChange={(e) => handleArrayItemChange('organization', index, 'role', e.target.value)}
                          placeholder="Kepala Departemen IT"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Lokasi</label>
                        <input
                          type="text"
                          value={org.location}
                          onChange={(e) => handleArrayItemChange('organization', index, 'location', e.target.value)}
                          placeholder="Depok, Indonesia"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Mulai</label>
                        <input
                          type="text"
                          value={org.startDate}
                          onChange={(e) => handleArrayItemChange('organization', index, 'startDate', e.target.value)}
                          placeholder="Jan 2023"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Selesai</label>
                        <input
                          type="text"
                          value={org.endDate}
                          onChange={(e) => handleArrayItemChange('organization', index, 'endDate', e.target.value)}
                          placeholder="Des 2023"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Bullets */}
                    <div className="pt-2 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11px] font-semibold text-slate-700">Kontribusi & Dampak Program Kerja</label>
                        <button
                          type="button"
                          onClick={() => handleAddBullet('organization', index)}
                          className="text-[11px] text-blue-600 hover:text-blue-800 font-medium inline-flex items-center space-x-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Tambah Poin</span>
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {(org.bullets || []).map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-center space-x-1.5">
                            <span className="text-slate-400 text-xs">•</span>
                            <textarea
                              rows={2}
                              value={bullet}
                              onChange={(e) => handleBulletChange('organization', index, bIdx, e.target.value)}
                              placeholder="Deskripsi kontribusi kepemimpinan..."
                              className="flex-1 px-2.5 py-1 text-xs border border-slate-300 rounded bg-white focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveBullet('organization', index, bIdx)}
                              className="p-1 text-slate-400 hover:text-red-600"
                              title="Hapus poin"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddArrayItem('organization', {
                    name: "",
                    role: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    bullets: [""]
                  })}
                  className="w-full py-2 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Pengalaman Organisasi</span>
                </button>
              </div>
            )}
          </div>

          {/* 6. SEKSI KETERAMPILAN & BAHASA */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSection('skills')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left border-b border-slate-200 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Code className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-sm text-slate-900">6. Keterampilan & Bahasa</span>
                  <span className="text-xs text-slate-500 block">Hard skills, metodologi, dan sertifikasi bahasa</span>
                </div>
              </div>
              {openSections.skills ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.skills && (
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Keahlian Teknis / Hard Skills (Pisahkan dengan koma)
                  </label>
                  <textarea
                    rows={2}
                    value={cvData.skills?.hardSkills || ''}
                    onChange={(e) => handleSkillsChange('hardSkills', e.target.value)}
                    placeholder="React.js, Next.js, TypeScript, Node.js, Tailwind CSS, PostgreSQL, Docker..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Metodologi & Soft Skills
                  </label>
                  <input
                    type="text"
                    value={cvData.skills?.softSkills || ''}
                    onChange={(e) => handleSkillsChange('softSkills', e.target.value)}
                    placeholder="Agile/Scrum, Problem Solving, Cross-functional Collaboration..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kemampuan Bahasa & Skor Kemahiran
                  </label>
                  <input
                    type="text"
                    value={cvData.skills?.languages || ''}
                    onChange={(e) => handleSkillsChange('languages', e.target.value)}
                    placeholder="Bahasa Indonesia (Native), English (Professional - TOEFL 610)..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 7. SEKSI PROYEK & PORTOFOLIO */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSection('projects')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left border-b border-slate-200 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-sm text-slate-900">7. Proyek Unggulan / Portofolio</span>
                  <span className="text-xs text-slate-500 block">{cvData.projects?.length || 0} Proyek Portofolio</span>
                </div>
              </div>
              {openSections.projects ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.projects && (
              <div className="p-4 space-y-4">
                {(cvData.projects || []).map((proj, index) => (
                  <div key={proj.id || index} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 relative group space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        #{index + 1} {proj.name || 'Proyek Baru'}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleMoveArrayItem('projects', index, -1)}
                          disabled={index === 0}
                          className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 text-slate-600"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveArrayItem('projects', index, 1)}
                          disabled={index === (cvData.projects || []).length - 1}
                          className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 text-slate-600"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleRemoveArrayItem('projects', index)}
                          className="p-1 hover:bg-red-100 text-red-600 rounded ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Nama Proyek</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => handleArrayItemChange('projects', index, 'name', e.target.value)}
                          placeholder="CareerPath - AI Resume Matcher"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Peran Anda</label>
                        <input
                          type="text"
                          value={proj.role}
                          onChange={(e) => handleArrayItemChange('projects', index, 'role', e.target.value)}
                          placeholder="Lead Fullstack Developer"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Tahun / Periode</label>
                        <input
                          type="text"
                          value={proj.year}
                          onChange={(e) => handleArrayItemChange('projects', index, 'year', e.target.value)}
                          placeholder="2024"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Link Repository / Demo</label>
                        <input
                          type="text"
                          value={proj.link}
                          onChange={(e) => handleArrayItemChange('projects', index, 'link', e.target.value)}
                          placeholder="github.com/username/project"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Bullets */}
                    <div className="pt-2 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11px] font-semibold text-slate-700">Poin Deskripsi & Hasil Proyek</label>
                        <button
                          type="button"
                          onClick={() => handleAddBullet('projects', index)}
                          className="text-[11px] text-blue-600 hover:text-blue-800 font-medium inline-flex items-center space-x-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Tambah Poin</span>
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {(proj.bullets || []).map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-center space-x-1.5">
                            <span className="text-slate-400 text-xs">•</span>
                            <textarea
                              rows={2}
                              value={bullet}
                              onChange={(e) => handleBulletChange('projects', index, bIdx, e.target.value)}
                              placeholder="Deskripsi fitur dan hasil proyek..."
                              className="flex-1 px-2.5 py-1 text-xs border border-slate-300 rounded bg-white focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveBullet('projects', index, bIdx)}
                              className="p-1 text-slate-400 hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddArrayItem('projects', {
                    name: "",
                    role: "",
                    year: "",
                    link: "",
                    bullets: [""]
                  })}
                  className="w-full py-2 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Proyek Portofolio</span>
                </button>
              </div>
            )}
          </div>

          {/* 8. SEKSI PRESTASI & PENGHARGAAN */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSection('achievements')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left border-b border-slate-200 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-yellow-100 text-yellow-700 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-sm text-slate-900">8. Prestasi & Penghargaan (Opsional)</span>
                  <span className="text-xs text-slate-500 block">{cvData.achievements?.length || 0} Penghargaan</span>
                </div>
              </div>
              {openSections.achievements ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.achievements && (
              <div className="p-4 space-y-4">
                {(cvData.achievements || []).map((ach, index) => (
                  <div key={ach.id || index} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 relative group space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        #{index + 1} {ach.title || 'Penghargaan Baru'}
                      </span>
                      <button
                        onClick={() => handleRemoveArrayItem('achievements', index)}
                        className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600">Judul Prestasi / Kejuaraan</label>
                        <input
                          type="text"
                          value={ach.title}
                          onChange={(e) => handleArrayItemChange('achievements', index, 'title', e.target.value)}
                          placeholder="Juara 1 - National Hackathon 2023"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600">Tahun</label>
                        <input
                          type="text"
                          value={ach.year}
                          onChange={(e) => handleArrayItemChange('achievements', index, 'year', e.target.value)}
                          placeholder="2023"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600">Deskripsi Singkat / Lembaga Pemberi</label>
                      <input
                        type="text"
                        value={ach.description}
                        onChange={(e) => handleArrayItemChange('achievements', index, 'description', e.target.value)}
                        placeholder="Deskripsi pencapaian atau jumlah peserta..."
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddArrayItem('achievements', {
                    title: "",
                    year: "",
                    description: ""
                  })}
                  className="w-full py-2 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Prestasi</span>
                </button>
              </div>
            )}
          </div>
        </section>


        {/* ================================================================== */}
        {/* KOLOM KANAN: PRATINJAU REAL-TIME A4 (7 / 12 col) */}
        {/* ================================================================== */}
        <section className="lg:col-span-7 flex flex-col items-center">
          
          {/* Toolbar Pengaturan Preview */}
          <div className="w-full bg-white p-3 rounded-xl border border-slate-200 shadow-sm mb-4 flex flex-wrap items-center justify-between gap-3 no-print">
            
            {/* Font & Color Presets */}
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1">
                <span className="text-slate-500 font-medium">Font:</span>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="bg-slate-50 border border-slate-300 text-slate-700 py-1 px-2 rounded-lg text-xs font-medium focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="font-sans">Inter (Modern Clean)</option>
                  <option value="font-serif">Merriweather (Classic Serif)</option>
                </select>
              </div>

              <div className="flex items-center space-x-1.5">
                <span className="text-slate-500 font-medium">Warna:</span>
                <div className="flex items-center space-x-1">
                  {[
                    { color: '#1e3a8a', label: 'Classic Navy' },
                    { color: '#0f172a', label: 'Slate Black' },
                    { color: '#047857', label: 'Emerald' },
                    { color: '#831843', label: 'Ruby' },
                  ].map((item) => (
                    <button
                      key={item.color}
                      onClick={() => setThemeColor(item.color)}
                      className={`w-5 h-5 rounded-full border-2 transition-transform ${
                        themeColor === item.color ? 'scale-110 border-blue-500' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: item.color }}
                      title={item.label}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <span className="text-slate-500 font-medium">Spasi:</span>
                <button
                  onClick={() => setLineSpacing(prev => prev === 'compact' ? 'normal' : 'compact')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                    lineSpacing === 'compact' ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                  title="Gunakan Compact agar pas di 1 lembar A4"
                >
                  {lineSpacing === 'compact' ? 'Kompak (1 Lembar)' : 'Normal'}
                </button>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
                className="p-1 hover:bg-white rounded text-slate-600 transition-colors"
                title="Perkecil (-10%)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-semibold text-slate-700 w-10 text-center">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
                className="p-1 hover:bg-white rounded text-slate-600 transition-colors"
                title="Perbesar (+10%)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel(90)}
                className="p-1 hover:bg-white rounded text-slate-600 transition-colors ml-1"
                title="Reset Zoom (90%)"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Preview Container Wrapper with Overflow scroll */}
          <div className="w-full flex justify-center overflow-x-auto pb-10">
            <div
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                transition: 'transform 0.15s ease-out'
              }}
              className="transition-all"
            >
              {/* ========================================================== */}
              {/* LEMBAR KERJA A4 (210mm x 297mm) KINOBI ATS STANDARD        */}
              {/* ========================================================== */}
              <div
                ref={previewRef}
                id="resume-document-a4"
                className={`a4-page print-only-container ${fontFamily} text-slate-900 bg-white relative p-[12mm_15mm] text-[11px] leading-normal`}
                style={{
                  width: '210mm',
                  minHeight: '297mm',
                  boxSizing: 'border-box',
                }}
              >
                {/* -------------------------------------------------------- */}
                {/* 1. HEADER ATAS: NAMA & KONTAK (ATS STANDARD)            */}
                {/* -------------------------------------------------------- */}
                <div className={`text-center pb-2.5 mb-3 border-b-2`} style={{ borderColor: themeColor }}>
                  <div className="flex items-center justify-center gap-4">
                    {/* Optional Photo */}
                    {cvData.personalInfo?.showPhoto && cvData.personalInfo?.photoUrl && (
                      <img
                        src={cvData.personalInfo.photoUrl}
                        alt="Foto Profil"
                        className="w-16 h-16 rounded-full object-cover border border-slate-300 shadow-sm"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    )}
                    <div>
                      <h1
                        className="text-2xl font-black tracking-wider uppercase"
                        style={{ color: themeColor }}
                      >
                        {cvData.personalInfo?.fullName || 'NAMA LENGKAP'}
                      </h1>
                      {cvData.personalInfo?.jobTitle && (
                        <p className="text-xs font-semibold text-slate-700 mt-0.5 tracking-wide">
                          {cvData.personalInfo.jobTitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Baris Kontak Rata Tengah */}
                  <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10.5px] text-slate-700 mt-2 font-medium">
                    {cvData.personalInfo?.location && (
                      <span className="inline-flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-slate-500 inline mr-0.5" />
                        <span>{cvData.personalInfo.location}</span>
                      </span>
                    )}
                    {cvData.personalInfo?.phone && (
                      <>
                        <span className="text-slate-400">•</span>
                        <span className="inline-flex items-center space-x-1">
                          <Phone className="w-3 h-3 text-slate-500 inline mr-0.5" />
                          <span>{cvData.personalInfo.phone}</span>
                        </span>
                      </>
                    )}
                    {cvData.personalInfo?.email && (
                      <>
                        <span className="text-slate-400">•</span>
                        <span className="inline-flex items-center space-x-1">
                          <Mail className="w-3 h-3 text-slate-500 inline mr-0.5" />
                          <span className="text-slate-900 font-semibold">{cvData.personalInfo.email}</span>
                        </span>
                      </>
                    )}
                    {cvData.personalInfo?.linkedin && (
                      <>
                        <span className="text-slate-400">•</span>
                        <span className="inline-flex items-center space-x-1">
                          <LinkedinIcon className="w-3 h-3 text-slate-500 inline mr-0.5" />
                          <span>{cvData.personalInfo.linkedin}</span>
                        </span>
                      </>
                    )}
                    {cvData.personalInfo?.github && (
                      <>
                        <span className="text-slate-400">•</span>
                        <span className="inline-flex items-center space-x-1">
                          <GithubIcon className="w-3 h-3 text-slate-500 inline mr-0.5" />
                          <span>{cvData.personalInfo.github}</span>
                        </span>
                      </>
                    )}
                    {cvData.personalInfo?.website && (
                      <>
                        <span className="text-slate-400">•</span>
                        <span className="inline-flex items-center space-x-1">
                          <Globe className="w-3 h-3 text-slate-500 inline mr-0.5" />
                          <span>{cvData.personalInfo.website}</span>
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* -------------------------------------------------------- */}
                {/* 2. RINGKASAN DIRI (SUMMARY)                              */}
                {/* -------------------------------------------------------- */}
                {cvData.summary && (
                  <div className={`mb-3 ${lineSpacing === 'compact' ? 'space-y-0.5' : 'space-y-1'}`}>
                    <h2
                      className="text-[12px] font-bold tracking-wider uppercase border-b pb-0.5 flex items-center justify-between"
                      style={{ color: themeColor, borderColor: '#cbd5e1' }}
                    >
                      <span>Ringkasan Profesional</span>
                    </h2>
                    <p className="text-[10.5px] text-justify text-slate-800 leading-relaxed pt-0.5">
                      {cvData.summary}
                    </p>
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* 3. JENJANG PENDIDIKAN                                    */}
                {/* -------------------------------------------------------- */}
                {cvData.education && cvData.education.length > 0 && (
                  <div className={`mb-3.5 ${lineSpacing === 'compact' ? 'space-y-1.5' : 'space-y-2'}`}>
                    <h2
                      className="text-[12px] font-bold tracking-wider uppercase border-b pb-0.5"
                      style={{ color: themeColor, borderColor: '#cbd5e1' }}
                    >
                      Pendidikan
                    </h2>

                    {cvData.education.map((edu, idx) => (
                      <div key={edu.id || idx} className="space-y-0.5">
                        <div className="flex justify-between items-baseline font-bold text-slate-900">
                          <span className="text-[11.5px]">{edu.institution}</span>
                          <span className="text-[10.5px] font-medium text-slate-700">{edu.city}</span>
                        </div>
                        <div className="flex justify-between items-baseline text-[10.5px] text-slate-800 italic">
                          <span>
                            {edu.degree} {edu.gpa ? <span className="font-semibold not-italic text-slate-900">• IPK: {edu.gpa}</span> : null}
                          </span>
                          <span className="not-italic font-medium text-slate-700">
                            {edu.startDate} – {edu.endDate}
                          </span>
                        </div>

                        {edu.bullets && edu.bullets.length > 0 && (
                          <ul className="list-disc list-outside pl-4 space-y-0.5 text-[10px] text-slate-800 leading-normal pt-0.5">
                            {edu.bullets.filter(Boolean).map((bullet, bIdx) => (
                              <li key={bIdx} className="text-justify">{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* 4. PENGALAMAN KERJA                                      */}
                {/* -------------------------------------------------------- */}
                {cvData.experience && cvData.experience.length > 0 && (
                  <div className={`mb-3.5 ${lineSpacing === 'compact' ? 'space-y-2' : 'space-y-2.5'}`}>
                    <h2
                      className="text-[12px] font-bold tracking-wider uppercase border-b pb-0.5"
                      style={{ color: themeColor, borderColor: '#cbd5e1' }}
                    >
                      Pengalaman Kerja
                    </h2>

                    {cvData.experience.map((exp, idx) => (
                      <div key={exp.id || idx} className="space-y-0.5">
                        <div className="flex justify-between items-baseline font-bold text-slate-900">
                          <span className="text-[11.5px]">{exp.company}</span>
                          <span className="text-[10.5px] font-medium text-slate-700">{exp.location}</span>
                        </div>
                        <div className="flex justify-between items-baseline text-[10.5px] text-slate-800 italic">
                          <span className="font-semibold text-slate-850 not-italic">{exp.role}</span>
                          <span className="not-italic font-medium text-slate-700">
                            {exp.startDate} – {exp.endDate}
                          </span>
                        </div>

                        {exp.bullets && exp.bullets.length > 0 && (
                          <ul className="list-disc list-outside pl-4 space-y-0.5 text-[10px] text-slate-800 leading-normal pt-0.5">
                            {exp.bullets.filter(Boolean).map((bullet, bIdx) => (
                              <li key={bIdx} className="text-justify">{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* 5. PENGALAMAN ORGANISASI                                 */}
                {/* -------------------------------------------------------- */}
                {cvData.organization && cvData.organization.length > 0 && (
                  <div className={`mb-3.5 ${lineSpacing === 'compact' ? 'space-y-2' : 'space-y-2.5'}`}>
                    <h2
                      className="text-[12px] font-bold tracking-wider uppercase border-b pb-0.5"
                      style={{ color: themeColor, borderColor: '#cbd5e1' }}
                    >
                      Pengalaman Organisasi & Kepemimpinan
                    </h2>

                    {cvData.organization.map((org, idx) => (
                      <div key={org.id || idx} className="space-y-0.5">
                        <div className="flex justify-between items-baseline font-bold text-slate-900">
                          <span className="text-[11.5px]">{org.name}</span>
                          <span className="text-[10.5px] font-medium text-slate-700">{org.location}</span>
                        </div>
                        <div className="flex justify-between items-baseline text-[10.5px] text-slate-800 italic">
                          <span className="font-semibold text-slate-850 not-italic">{org.role}</span>
                          <span className="not-italic font-medium text-slate-700">
                            {org.startDate} – {org.endDate}
                          </span>
                        </div>

                        {org.bullets && org.bullets.length > 0 && (
                          <ul className="list-disc list-outside pl-4 space-y-0.5 text-[10px] text-slate-800 leading-normal pt-0.5">
                            {org.bullets.filter(Boolean).map((bullet, bIdx) => (
                              <li key={bIdx} className="text-justify">{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* 6. PROYEK / PORTOFOLIO                                   */}
                {/* -------------------------------------------------------- */}
                {cvData.projects && cvData.projects.length > 0 && (
                  <div className={`mb-3.5 ${lineSpacing === 'compact' ? 'space-y-2' : 'space-y-2.5'}`}>
                    <h2
                      className="text-[12px] font-bold tracking-wider uppercase border-b pb-0.5"
                      style={{ color: themeColor, borderColor: '#cbd5e1' }}
                    >
                      Proyek & Portofolio Unggulan
                    </h2>

                    {cvData.projects.map((proj, idx) => (
                      <div key={proj.id || idx} className="space-y-0.5">
                        <div className="flex justify-between items-baseline font-bold text-slate-900">
                          <span className="text-[11.5px]">
                            {proj.name}
                            {proj.link && (
                              <span className="font-normal text-[10px] text-blue-700 ml-1.5 underline">
                                ({proj.link})
                              </span>
                            )}
                          </span>
                          <span className="text-[10.5px] font-medium text-slate-700">{proj.year}</span>
                        </div>
                        {proj.role && (
                          <div className="text-[10.5px] text-slate-700 italic">
                            Peran: {proj.role}
                          </div>
                        )}

                        {proj.bullets && proj.bullets.length > 0 && (
                          <ul className="list-disc list-outside pl-4 space-y-0.5 text-[10px] text-slate-800 leading-normal pt-0.5">
                            {proj.bullets.filter(Boolean).map((bullet, bIdx) => (
                              <li key={bIdx} className="text-justify">{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* 7. PRESTASI & PENGHARGAAN (OPSIONAL)                     */}
                {/* -------------------------------------------------------- */}
                {cvData.achievements && cvData.achievements.length > 0 && (
                  <div className={`mb-3 ${lineSpacing === 'compact' ? 'space-y-1' : 'space-y-1.5'}`}>
                    <h2
                      className="text-[12px] font-bold tracking-wider uppercase border-b pb-0.5"
                      style={{ color: themeColor, borderColor: '#cbd5e1' }}
                    >
                      Prestasi & Penghargaan
                    </h2>

                    <ul className="list-disc list-outside pl-4 space-y-0.5 text-[10px] text-slate-800 leading-normal pt-0.5">
                      {cvData.achievements.map((ach, idx) => (
                        <li key={ach.id || idx} className="text-justify">
                          <span className="font-bold text-slate-900">{ach.title}</span> ({ach.year})
                          {ach.description ? ` – ${ach.description}` : ''}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* 8. KETERAMPILAN & KEMAMPUAN LAIN                         */}
                {/* -------------------------------------------------------- */}
                {(cvData.skills?.hardSkills || cvData.skills?.softSkills || cvData.skills?.languages) && (
                  <div className={`mb-2 ${lineSpacing === 'compact' ? 'space-y-1' : 'space-y-1.5'}`}>
                    <h2
                      className="text-[12px] font-bold tracking-wider uppercase border-b pb-0.5"
                      style={{ color: themeColor, borderColor: '#cbd5e1' }}
                    >
                      Keahlian & Informasi Tambahan
                    </h2>

                    <div className="text-[10px] space-y-1 pt-0.5 leading-relaxed text-slate-800">
                      {cvData.skills?.hardSkills && (
                        <p>
                          <strong className="text-slate-900">Keahlian Teknis (Hard Skills):</strong> {cvData.skills.hardSkills}
                        </p>
                      )}
                      {cvData.skills?.softSkills && (
                        <p>
                          <strong className="text-slate-900">Metodologi & Karakter:</strong> {cvData.skills.softSkills}
                        </p>
                      )}
                      {cvData.skills?.languages && (
                        <p>
                          <strong className="text-slate-900">Kemampuan Bahasa:</strong> {cvData.skills.languages}
                        </p>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==================================================================== */}
      {/* MODAL: IMPORT / EXPORT JSON & RESTORE PRESET                        */}
      {/* ==================================================================== */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Import & Export Data CV (JSON)</h3>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600">
                Anda dapat mengunggah file data resume <code>.json</code> yang sudah pernah disimpan, atau menempelkan struktur data JSON langsung ke area teks di bawah.
              </p>

              {/* Upload file button */}
              <div className="flex items-center space-x-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Pilih File .JSON dari Komputer</span>
                </button>
                <span className="text-xs text-slate-400">atau tempel teks di bawah:</span>
              </div>

              {/* Textarea for JSON input */}
              <div>
                <textarea
                  rows={8}
                  value={jsonInputText}
                  onChange={(e) => setJsonInputText(e.target.value)}
                  placeholder={`{\n  "personalInfo": { "fullName": "..." },\n  "education": [...],\n  ...\n}`}
                  className="w-full font-mono text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-slate-900 text-slate-100 placeholder:text-slate-500"
                />
                {importError && (
                  <p className="text-xs text-red-600 font-medium mt-1">{importError}</p>
                )}
              </div>

              {/* Actions Footer inside modal */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 flex items-center space-x-1.5"
                  >
                    {copiedNotification ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedNotification ? 'Tersalin!' : 'Salin JSON Saat Ini'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setJsonInputText(JSON.stringify(DEFAULT_CV_DATA, null, 2));
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200"
                  >
                    Muat Template Default
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsImportModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleImportJson}
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                  >
                    Terapkan Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* FOOTER BRANDING                                                      */}
      {/* ==================================================================== */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 no-print mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 J CV Builder SPA — Single Column Harvard/Tech ATS Standard Layout</p>
          <p className="text-slate-400">Dirancang khusus untuk ekspor presisi dokumen format A4</p>
        </div>
      </footer>
    </div>
  );
}
