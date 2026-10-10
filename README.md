# J CV Builder (Interactive ATS Resume Maker & PDF Exporter)

Aplikasi Web SaaS Multi-User interaktif pembuat dan penyunting CV berstandar ATS internasional (*single-column Harvard/Tech ATS standard*) dengan database & autentikasi cloud **Supabase**, siap dideploy ke **Vercel**.

---

## 🚀 Fitur Utama

### 1. Autentikasi Multi-User (Supabase Auth)
- **Halaman & Modal Masuk (Login)** dan **Daftar Akun (Register)** yang elegan dengan penanganan pesan error jelas.
- Setiap pengguna memiliki data resume terisolasi dengan **Row Level Security (RLS)** PostgreSQL di Supabase.
- Pengguna dapat keluar (*Logout*) dan masuk kembali kapan saja.

### 2. Dashboard Multi-CV (Kelola Banyak CV per Akun)
- Pengguna dapat membuat dan mengelola **lebih dari 1 CV** (misal: "CV Frontend Engineer", "CV Data Analyst", dsb).
- Fitur **Buat CV Baru**, **Buka & Sunting CV**, **Duplikasi CV**, dan **Hapus CV**.
- Sinkronisasi otomatis (*Auto-Save*) ke cloud Supabase dengan indikator status real-time.

### 3. Kolom Kiri: Form Editor Interaktif (*Live Sync*)
- **1. Data Diri & Kontak**: Nama lengkap, jabatan incaran, telepon, email, domisili, profil LinkedIn, GitHub, website, dan toggle foto profil opsional.
- **2. Ringkasan Diri (*Profile Summary*)**: Ringkasan profesional terukur dengan tips penulisan kuantitatif.
- **3. Jenjang Pendidikan**: Nama institusi, lokasi, gelar/jurusan, IPK, periode, serta poin pencapaian akademik dinamis.
- **4. Pengalaman Kerja**: Posisi, perusahaan, lokasi, periode, dan bullet points pencapaian (*Action + Impact + Metrics*).
- **5. Pengalaman Organisasi**: Nama organisasi, jabatan, domisili, periode, dan kontribusi kepemimpinan.
- **6. Keterampilan & Bahasa**: Hard skills teknis, metodologi agile, dan sertifikasi bahasa.
- **7. Proyek Portofolio**: Nama proyek, tautan demo/repo, peran, dan detail hasil.
- **8. Prestasi & Penghargaan**: Kejuaraan dan apresiasi profesional.
- **Item Dinamis**: Tambah/hapus entri, atur urutan naik/turun (*Move Up / Move Down*), dan edit bullet points per item.

### 4. Kolom Kanan: Pratinjau Dokumen A4 (*Live Preview*)
- **Dimensi Presisi A4**: 210mm x 297mm dengan marjin rapi 10-12mm standar ATS.
- **Tipografi Bersih**: Header nama kapital tebal, pembatas garis sub-header elegan, tanggal dan lokasi rata kanan (*flex justify-between*).
- **Toolbar Pengaturan Pratinjau**:
  - Pilihan Font (*Inter Modern Sans* vs *Merriweather Classic Serif*).
  - Pilihan Aksen Warna (*Classic Navy*, *Slate Black*, *Emerald*, *Ruby*).
  - Pilihan Spasi (*Kompak 1 Lembar* vs *Normal*).
  - Zoom In (+), Zoom Out (-), dan Reset Zoom (90% / Fit to Width).

### 5. Ekspor Dokumen ke PDF & Cetak
- **Export to PDF (html2pdf.js)**: Render dokumen preview HTML ke file PDF A4 portrait dengan skala ketajaman tinggi (scale 2.5x).
- **Native Print / Browser PDF Dialog**: Opsi cetak langsung atau simpan sebagai PDF vektor murni via dialog cetak browser (`@media print` teroptimasi).

---

## 🛠️ Tech Stack

- **Frontend**: React 18 (Functional Components, Hooks: `useState`, `useEffect`, `useRef`, `useCallback`)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React + Clean SVG Icons
- **Database & Auth**: Supabase (PostgreSQL + Supabase Auth + RLS)
- **Deployment Platform**: Vercel (dengan `vercel.json` SPA routing)
- **PDF Generation**: `html2pdf.js` + CSS Print Engine

---

## ⚙️ Konfigurasi Supabase (Database & Auth)

1. Buat proyek baru di [Supabase](https://supabase.com/).
2. Buka menu **SQL Editor** di dashboard Supabase, lalu jalankan seluruh skrip dari berkas [`supabase_schema.sql`](./supabase_schema.sql).
3. Buka **Project Settings** -> **API**, lalu salin:
   - `Project URL`
   - `anon public key`
4. Buat file `.env` di direktori proyek berdasarkan [`.env.example`](./.env.example):
   ```env
   VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJh......
   ```

---

## 💻 Cara Menjalankan Secara Lokal

1. Buka terminal pada folder proyek:
   ```bash
   npm run dev
   ```

2. Buka browser pada alamat:
   ```
   http://localhost:5173
   ```

3. Untuk membuat bundle produksi:
   ```bash
   npm run build
   ```

---

## 🚀 Panduan Deploy ke Vercel

1. Pastikan kode sudah dipush ke repositori GitHub Anda.
2. Masuk ke [Vercel](https://vercel.com/) dan klik **Add New Project**.
3. Import repositori GitHub `j-cv-builder`.
4. Pada bagian **Environment Variables**, tambahkan:
   - `VITE_SUPABASE_URL`: URL proyek Supabase Anda
   - `VITE_SUPABASE_ANON_KEY`: Anon key proyek Supabase Anda
5. Klik **Deploy**. File `vercel.json` sudah otomatis menangani konfigurasi routing SPA.