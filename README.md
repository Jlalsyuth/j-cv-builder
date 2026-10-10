# J CV Builder (Interactive ATS Resume Maker & PDF Exporter)

Aplikasi Web Single-Page (SPA) interaktif pembuat dan penyunting CV berstandar ATS internasional dengan tata letak satu kolom (*single-column Harvard/Tech ATS standard*).

---

## 🚀 Fitur Utama

### 1. Kolom Kiri: Form Editor Interaktif (*Live Sync*)
- **1. Data Diri & Kontak**: Nama lengkap, jabatan/posisi incaran, nomor telepon/WhatsApp, email, domisili, profil LinkedIn, GitHub, dan website pribadi (dengan opsi toggle foto profil opsional).
- **2. Ringkasan Diri (*Profile Summary*)**: Ringkasan profesional 3-4 kalimat berbobot dengan metrik pencapaian.
- **3. Jenjang Pendidikan**: Nama institusi, lokasi kota, program studi/gelar, IPK/GPA, periode, serta poin-poin pencapaian akademik/beasiswa dinamis.
- **4. Pengalaman Kerja**: Nama perusahaan, posisi, lokasi, periode kerja, dan *dynamic bullet points* tanggung jawab & dampak berbasis metrik (*Action + Impact + Metrics*).
- **5. Pengalaman Organisasi**: Nama organisasi, jabatan, domisili, periode, serta poin-poin kontribusi kepemimpinan.
- **6. Keterampilan & Bahasa**: Hard skills teknis, metodologi agile, dan sertifikasi kecakapan bahasa.
- **7. Proyek Portofolio**: Nama proyek, peran, tahun, tautan repositori/demo, dan deskripsi hasil.
- **8. Prestasi & Penghargaan**: Kejuaraan lomba/hackathon, tahun, dan penyelenggara.
- **Fitur Item Dinamis**: Tambah item, hapus item, geser urutan (*Move Up / Move Down*), serta tambah/hapus bullet point per item.

### 2. Kolom Kanan: Pratinjau Dokumen A4 (*Live Preview*)
- **Dimensi Presisi A4**: 210mm x 297mm dengan marjin rapi 10-12mm standar ATS.
- **Tipografi & Desain Bersih**: Header nama besar kapital tebal, pembatas garis sub-header elegan, tanggal dan lokasi rata kanan (*flex justify-between*).
- **Kontrol Toolbar Preview**:
  - Pilihan Font (*Inter Sans* vs *Merriweather Serif*).
  - Pilihan Aksen Warna (*Kinobi Navy*, *Slate Black*, *Emerald*, *Ruby*).
  - Pilihan Spasi (*Kompak 1 Lembar* vs *Normal*).
  - Zoom In (+), Zoom Out (-), dan Reset Zoom (90% / Fit to Width).

### 3. Import & Export Data (JSON)
- **Import Data**: Unggah file `.json` dari komputer atau tempel kode JSON langsung melalui dialog modal.
- **Simpan Data (JSON)**: Unduh data CV saat ini sebagai file JSON untuk disimpan dan dilanjutkan kapan saja.
- **Salin JSON**: Salin struktur data ke clipboard dalam 1 klik.
- **Auto-Save**: Otomatis menyimpan progres perubahan ke `localStorage` browser.
- **Reset Template**: Kembalikan ke format data default kapan saja.

### 4. Export Dokumen ke PDF
- **Export to PDF (html2pdf.js)**: Render dokumen preview HTML ke file PDF berdimensi A4 portrait dengan skala ketajaman tinggi (scale 2.5x).
- **Native Print / Browser PDF Dialog**: Opsi alternatif untuk mencetak langsung atau simpan sebagai PDF vektor murni via dialog cetak browser (`@media print` teroptimasi).

---

## 🛠️ Tech Stack

- **Framework**: React 18 (Functional Components, Hooks: `useState`, `useEffect`, `useRef`)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React + Clean SVG Icons
- **PDF Generation**: `html2pdf.js` + CSS Print Engine

---

## 💻 Cara Menjalankan Secara Lokal

1. Buka terminal pada folder `cv-generate`:
   ```bash
   cd cv-generate
   ```

2. Jalankan server pengembangan (*Development Server*):
   ```bash
   npm run dev
   ```

3. Buka browser pada alamat:
   ```
   http://localhost:5173
   ```

4. Untuk membuat bundle produksi:
   ```bash
   npm run build
   ```