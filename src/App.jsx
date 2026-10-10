import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  FileText,
  Download,
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
  ZoomIn,
  ZoomOut,
  Maximize2,
  Mail,
  Phone,
  MapPin,
  Globe,
  X,
  Code,
  FolderOpen,
  Cloud,
  CloudCheck,
  Check,
  LogOut,
  LogIn,
  AlertCircle,
  Edit2
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from './lib/supabaseClient';
import AuthModal from './components/AuthModal';
import DashboardModal from './components/DashboardModal';

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
// MAIN COMPONENT: APP / J CV BUILDER
// ============================================================================
export default function App() {
  // Current Active Resume Document
  const [cvData, setCvData] = useState(() => {
    const saved = localStorage.getItem('j_cv_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved CV data:', e);
      }
    }
    return DEFAULT_CV_DATA;
  });

  const [currentResumeId, setCurrentResumeId] = useState(() => {
    return localStorage.getItem('j_cv_active_id') || null;
  });

  const [resumeTitle, setResumeTitle] = useState(() => {
    return localStorage.getItem('j_cv_active_title') || 'Resume Software Engineer';
  });

  // Supabase Auth & Multi-CV State
  const [currentUser, setCurrentUser] = useState(null);
  const [userResumes, setUserResumes] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);
  const [isLoadingResumes, setIsLoadingResumes] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'saving' | 'unsaved'

  // Settings & Theme
  const [zoomLevel, setZoomLevel] = useState(90);
  const [fontFamily, setFontFamily] = useState('font-sans');
  const [themeColor, setThemeColor] = useState('#1e3a8a');
  const [lineSpacing, setLineSpacing] = useState('normal');

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

  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const previewRef = useRef(null);

  // 1. Inisialisasi Supabase Auth Listener
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    // Ambil sesi awal
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser(session.user);
        fetchUserResumes(session.user.id);
      }
    });

    // Pasang listener perubahan auth (login, logout, refresh token)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user || null;
      setCurrentUser(user);
      if (user) {
        fetchUserResumes(user.id);
      } else {
        setUserResumes([]);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // 2. Mengambil daftar resume pengguna dari Supabase
  const fetchUserResumes = async (userId) => {
    if (!isSupabaseConfigured || !supabase) return;
    setIsLoadingResumes(true);
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setUserResumes(data);
        // Jika belum ada resume yang dibuka, buka yang paling baru
        if (!currentResumeId) {
          const active = data[0];
          setCurrentResumeId(active.id);
          setResumeTitle(active.title);
          if (active.content && Object.keys(active.content).length > 0) {
            setCvData(active.content);
          }
        }
      } else {
        // Jika pengguna baru belum punya resume di cloud, simpan resume default awal
        saveInitialResumeToCloud(userId);
      }
    } catch (err) {
      console.error('Error fetching user resumes:', err);
    } finally {
      setIsLoadingResumes(false);
    }
  };

  // Simpan resume awal untuk pengguna baru
  const saveInitialResumeToCloud = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .insert([
          {
            user_id: userId,
            title: resumeTitle || 'Resume Utama ATS',
            content: cvData,
          },
        ])
        .select();

      if (error) throw error;
      if (data && data.length > 0) {
        setUserResumes(data);
        setCurrentResumeId(data[0].id);
      }
    } catch (err) {
      console.error('Error saving initial resume:', err);
    }
  };

  // 3. Simpan perubahan ke Cloud (Supabase) dan LocalStorage
  const handleSaveToCloud = async () => {
    // Selalu simpan ke local storage sebagai backup offline
    localStorage.setItem('j_cv_data', JSON.stringify(cvData));
    localStorage.setItem('j_cv_active_title', resumeTitle);
    if (currentResumeId) localStorage.setItem('j_cv_active_id', currentResumeId);

    if (!currentUser || !isSupabaseConfigured || !supabase) {
      setSaveStatus('saved');
      return;
    }

    setSaveStatus('saving');
    try {
      if (currentResumeId) {
        // Update resume yang sedang aktif
        const { error } = await supabase
          .from('resumes')
          .update({
            title: resumeTitle,
            content: cvData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', currentResumeId);

        if (error) throw error;
      } else {
        // Buat baru jika belum ada ID
        const { data, error } = await supabase
          .from('resumes')
          .insert([
            {
              user_id: currentUser.id,
              title: resumeTitle,
              content: cvData,
            },
          ])
          .select();

        if (error) throw error;
        if (data && data.length > 0) {
          setCurrentResumeId(data[0].id);
        }
      }

      setSaveStatus('saved');
      // Perbarui daftar di memori
      fetchUserResumes(currentUser.id);
    } catch (err) {
      console.error('Failed to save to cloud:', err);
      setSaveStatus('unsaved');
    }
  };

  // Auto-Save debounced ke LocalStorage & Cloud
  useEffect(() => {
    setSaveStatus('unsaved');
    const timer = setTimeout(() => {
      handleSaveToCloud();
    }, 1500);

    return () => clearTimeout(timer);
  }, [cvData, resumeTitle]);

  // Fungsi Buat Resume Baru
  const handleCreateNewResume = async () => {
    const newTitle = prompt('Masukkan Judul Resume Baru:', 'Resume Baru ATS');
    if (!newTitle) return;

    if (currentUser && isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('resumes')
          .insert([
            {
              user_id: currentUser.id,
              title: newTitle.trim(),
              content: DEFAULT_CV_DATA,
            },
          ])
          .select();

        if (error) throw error;
        if (data && data.length > 0) {
          setUserResumes(prev => [data[0], ...prev]);
          setCurrentResumeId(data[0].id);
          setResumeTitle(data[0].title);
          setCvData(DEFAULT_CV_DATA);
          setIsDashboardModalOpen(false);
        }
      } catch (err) {
        alert('Gagal membuat resume di cloud: ' + err.message);
      }
    } else {
      // Guest mode
      setResumeTitle(newTitle.trim());
      setCvData(DEFAULT_CV_DATA);
      setCurrentResumeId(null);
      setIsDashboardModalOpen(false);
    }
  };

  // Fungsi Duplikasi Resume
  const handleDuplicateResume = async (targetResume) => {
    const newTitle = `Salinan - ${targetResume.title}`;
    if (currentUser && isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('resumes')
          .insert([
            {
              user_id: currentUser.id,
              title: newTitle,
              content: targetResume.content,
            },
          ])
          .select();

        if (error) throw error;
        if (data && data.length > 0) {
          setUserResumes(prev => [data[0], ...prev]);
          alert(`Resume "${newTitle}" berhasil diduplikasi!`);
        }
      } catch (err) {
        alert('Gagal menduplikasi resume: ' + err.message);
      }
    } else {
      alert('Silakan masuk (login) untuk menduplikasi resume ke cloud.');
    }
  };

  // Fungsi Hapus Resume
  const handleDeleteResume = async (resumeId) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus dokumen resume ini? Tindakan ini tidak dapat dibatalkan.')) {
      return;
    }

    if (currentUser && isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('resumes')
          .delete()
          .eq('id', resumeId);

        if (error) throw error;

        const updated = userResumes.filter(r => r.id !== resumeId);
        setUserResumes(updated);

        // Jika resume yang dihapus adalah yang sedang dibuka, ganti ke resume lain
        if (currentResumeId === resumeId) {
          if (updated.length > 0) {
            setCurrentResumeId(updated[0].id);
            setResumeTitle(updated[0].title);
            setCvData(updated[0].content);
          } else {
            handleCreateNewResume();
          }
        }
      } catch (err) {
        alert('Gagal menghapus resume: ' + err.message);
      }
    }
  };

  // Fungsi Buka / Ganti Resume
  const handleSelectResume = (resume) => {
    setCurrentResumeId(resume.id);
    setResumeTitle(resume.title);
    setCvData(resume.content || DEFAULT_CV_DATA);
  };

  // Fungsi Logout
  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setCurrentUser(null);
    setUserResumes([]);
    setCurrentResumeId(null);
  };

  // Section toggle handler
  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Helper form updates
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

  const handleResetData = () => {
    if (window.confirm("Apakah Anda yakin ingin mengatur ulang konten resume ini ke template standar?")) {
      setCvData(DEFAULT_CV_DATA);
    }
  };

  // Export to PDF via html2pdf.js
  const handleExportPdf = async () => {
    if (!previewRef.current) return;
    setIsExportingPdf(true);

    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;

      const element = previewRef.current;
      const cleanName = (cvData.personalInfo?.fullName || resumeTitle || 'Resume').replace(/[^a-zA-Z0-9]/g, '_');
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${cleanName}_CV_ATS.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2.5,
          useCORS: true,
          letterRendering: true,
          logging: false
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('html2pdf error:', err);
      alert('Mengalihkan ke dialog Cetak browser untuk hasil PDF resolusi tinggi.');
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
      {/* TOP HEADER / NAVBAR (J CV BUILDER SAAS MULTI-USER)                   */}
      {/* ==================================================================== */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Document Title */}
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <FileText className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight whitespace-nowrap">
                  J <span className="text-blue-600">CV Builder</span>
                </span>
                <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold border border-blue-200 hidden md:inline">
                  ATS Verified
                </span>
              </div>

              {/* Editable Resume Title */}
              <div className="flex items-center space-x-1.5 mt-0.5">
                <input
                  type="text"
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  className="text-xs text-slate-600 font-medium bg-transparent hover:bg-slate-100 focus:bg-white focus:ring-1 focus:ring-blue-500 px-1.5 py-0.5 rounded border border-transparent hover:border-slate-300 focus:border-blue-400 max-w-[200px] truncate"
                  placeholder="Beri nama resume..."
                  title="Klik untuk mengubah judul dokumen CV ini"
                />
                <Edit2 className="w-3 h-3 text-slate-400 hidden sm:inline" />
              </div>
            </div>
          </div>

          {/* Center Cloud Status */}
          <div className="hidden lg:flex items-center space-x-2 text-xs">
            {saveStatus === 'saving' ? (
              <span className="flex items-center space-x-1 text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                <span>Menyimpan ke Cloud...</span>
              </span>
            ) : saveStatus === 'saved' ? (
              <span className="flex items-center space-x-1 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tersimpan {currentUser ? 'di Cloud' : 'Lokal'}</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1 text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Perubahan Belum Disimpan</span>
              </span>
            )}
          </div>

          {/* Quick Actions & Auth Controls */}
          <div className="flex items-center space-x-2">
            
            {/* Multi-CV Dashboard button */}
            <button
              onClick={() => {
                if (currentUser) {
                  setIsDashboardModalOpen(true);
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-300 shadow-sm"
              title="Buka daftar CV Anda"
            >
              <FolderOpen className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">CV Saya</span>
              {currentUser && userResumes.length > 0 && (
                <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1">
                  {userResumes.length}
                </span>
              )}
            </button>

            {/* Tombol Simpan Manual */}
            <button
              onClick={handleSaveToCloud}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors border border-slate-300 shadow-sm"
              title="Simpan dokumen saat ini"
            >
              <Cloud className="w-4 h-4 text-slate-600" />
              <span className="hidden md:inline">Simpan</span>
            </button>

            {/* Print Native */}
            <button
              onClick={handleNativePrint}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors border border-slate-300 shadow-sm hidden md:inline-flex"
              title="Cetak langsung dokumen"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print</span>
            </button>

            {/* Export to PDF */}
            <button
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all shadow-md shadow-blue-500/25 disabled:opacity-50"
            >
              {isExportingPdf ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Rendering...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Export PDF</span>
                </>
              )}
            </button>

            <div className="h-6 w-px bg-slate-200 mx-1"></div>

            {/* User Profile / Auth Button */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <div
                  onClick={() => setIsDashboardModalOpen(true)}
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 transition-transform"
                  title={`Login sebagai: ${currentUser.email}`}
                >
                  {currentUser.email ? currentUser.email.charAt(0).toUpperCase() : 'U'}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Keluar / Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk / Daftar</span>
              </button>
            )}
          </div>
        </div>

        {/* Guest Warning Banner if not logged in */}
        {!currentUser && (
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-t border-b border-blue-100 px-4 py-1.5 text-center text-xs text-blue-900 flex items-center justify-center space-x-2">
            <span>✨ Masuk untuk menyimpan banyak versi CV Anda ke database cloud Supabase secara gratis.</span>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="font-bold underline hover:text-blue-700 ml-1"
            >
              Masuk Sekarang
            </button>
          </div>
        )}
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
            <div className="flex items-center space-x-3">
              <button
                onClick={handleResetData}
                className="text-xs text-slate-500 hover:text-amber-700 font-medium"
                title="Reset isi ke template standar"
              >
                Reset Template
              </button>
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
                    value={cvData.personalInfo?.fullName || ''}
                    onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                    placeholder="Contoh: MUHAMMAD ARYA PRATAMA"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gelar / Sub-Judul Posisi (Opsional)</label>
                  <input
                    type="text"
                    value={cvData.personalInfo?.jobTitle || ''}
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
                      value={cvData.personalInfo?.email || ''}
                      onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor WhatsApp / HP *</label>
                    <input
                      type="text"
                      value={cvData.personalInfo?.phone || ''}
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
                      value={cvData.personalInfo?.location || ''}
                      onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                      placeholder="Jakarta, Indonesia"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn URL / Username</label>
                    <input
                      type="text"
                      value={cvData.personalInfo?.linkedin || ''}
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
                      value={cvData.personalInfo?.github || ''}
                      onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                      placeholder="github.com/username"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Website / Blog (Opsional)</label>
                    <input
                      type="text"
                      value={cvData.personalInfo?.website || ''}
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
                      checked={cvData.personalInfo?.showPhoto || false}
                      onChange={(e) => handlePersonalInfoChange('showPhoto', e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <label htmlFor="togglePhoto" className="text-xs text-slate-700 font-medium cursor-pointer">
                      Tampilkan Foto Profil (Catatan: Standar ATS murni umumnya tanpa foto)
                    </label>
                  </div>
                </div>

                {cvData.personalInfo?.showPhoto && (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">URL Foto Profil</label>
                    <input
                      type="text"
                      value={cvData.personalInfo?.photoUrl || ''}
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
                  value={cvData.summary || ''}
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
                  <span className="text-xs text-slate-500 block">{(cvData.education || []).length} Riwayat Terdaftar</span>
                </div>
              </div>
              {openSections.education ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.education && (
              <div className="p-4 space-y-4">
                {(cvData.education || []).map((edu, index) => (
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
                  <span className="text-xs text-slate-500 block">{(cvData.experience || []).length} Posisi Karir</span>
                </div>
              </div>
              {openSections.experience ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.experience && (
              <div className="p-4 space-y-4">
                {(cvData.experience || []).map((exp, index) => (
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
                        <label className="block text-[11px] font-semibold text-slate-600">Nama Perusahaan / Bisnis</label>
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
                              placeholder="Deskripsi terukur..."
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
                  <span className="text-xs text-slate-500 block">{(cvData.organization || []).length} Kegiatan Organisasi</span>
                </div>
              </div>
              {openSections.organization ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.organization && (
              <div className="p-4 space-y-4">
                {(cvData.organization || []).map((org, index) => (
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
                        <label className="text-[11px] font-semibold text-slate-700">Kontribusi & Program Kerja</label>
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
                              placeholder="Deskripsi kontribusi..."
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
                  <span className="text-xs text-slate-500 block">{(cvData.projects || []).length} Proyek Portofolio</span>
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
                  <span className="text-xs text-slate-500 block">{(cvData.achievements || []).length} Penghargaan</span>
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
                        placeholder="Deskripsi pencapaian..."
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
              {/* LEMBAR KERJA A4 (210mm x 297mm) J CV ATS STANDARD */}
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
                {/* 1. HEADER ATAS: NAMA & KONTAK (ATS STANDARD) */}
                <div className={`text-center pb-2.5 mb-3 border-b-2`} style={{ borderColor: themeColor }}>
                  <div className="flex items-center justify-center gap-4">
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

                {/* 2. RINGKASAN DIRI (SUMMARY) */}
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

                {/* 3. JENJANG PENDIDIKAN */}
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

                {/* 4. PENGALAMAN KERJA */}
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

                {/* 5. PENGALAMAN ORGANISASI */}
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

                {/* 6. PROYEK / PORTOFOLIO */}
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

                {/* 7. PRESTASI & PENGHARGAAN */}
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

                {/* 8. KETERAMPILAN & KEMAMPUAN LAIN */}
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
      {/* MODALS: AUTH & MULTI-CV DASHBOARD                                    */}
      {/* ==================================================================== */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          fetchUserResumes(user.id);
        }}
      />

      <DashboardModal
        isOpen={isDashboardModalOpen}
        onClose={() => setIsDashboardModalOpen(false)}
        resumes={userResumes}
        currentResumeId={currentResumeId}
        onSelectResume={handleSelectResume}
        onCreateNewResume={handleCreateNewResume}
        onDuplicateResume={handleDuplicateResume}
        onDeleteResume={handleDeleteResume}
        isLoading={isLoadingResumes}
      />

      {/* ==================================================================== */}
      {/* FOOTER BRANDING                                                      */}
      {/* ==================================================================== */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 no-print mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 J CV Builder SPA — Single Column Harvard/Tech ATS Standard Layout with Supabase Cloud & Vercel</p>
          <p className="text-slate-400">Dirancang khusus untuk ekspor presisi dokumen format A4</p>
        </div>
      </footer>
    </div>
  );
}
