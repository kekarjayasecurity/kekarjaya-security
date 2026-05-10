## Context

PT Kekar Jaya Security adalah perusahaan jasa keamanan yang belum memiliki kehadiran online. Proyek ini membangun website perusahaan dari nol menggunakan Next.js sebagai framework fullstack (frontend + backend), MySQL sebagai database, dan Tailwind CSS untuk styling. Seluruh konten dan antarmuka menggunakan Bahasa Indonesia.

Stakeholder utama adalah tim internal perusahaan yang akan mengelola konten melalui panel admin, dan calon klien yang akan mengunjungi website publik.

## Goals / Non-Goals

**Goals:**
- Menyediakan website publik profesional yang menampilkan profil perusahaan, layanan, legalitas, dan informasi kontak
- Menyediakan sistem blog untuk publikasi artikel terkait keamanan
- Menyediakan galeri foto kegiatan dan dokumentasi perusahaan
- Menyediakan panel admin yang mudah digunakan untuk mengelola seluruh konten
- Menyediakan autentikasi admin yang aman
- Seluruh konten dapat diperbarui melalui panel admin tanpa memerlukan perubahan kode

**Non-Goals:**
- Multi-bahasa (hanya Bahasa Indonesia)
- Sistem pendaftaran/pembayaran online
- Integrasi dengan sistem keamanan atau CCTV
- Mobile app
- SEO optimization tingkat lanjut (basic SEO saja)
- Sistem multi-user/role (hanya satu admin role)

## Decisions

### 1. Next.js App Router sebagai Fullstack Framework
**Pilihan**: Next.js App Router dengan Server Components dan API Routes
**Alasan**: Memungkinkan satu codebase untuk frontend dan backend, Server Components untuk performa optimal, API Routes untuk endpoint backend. App Router adalah pendekatan modern yang direkomendasikan.
**Alternatif**: Pages Router (legacy), Express + React SPA (memerlukan dua server terpisah).

### 2. MySQL sebagai Database
**Pilihan**: MySQL dengan mysql2 driver
**Alasan**: Sesuai permintaan, MySQL adalah RDBMS yang matang dan cocok untuk data terstruktur seperti konten halaman, artikel blog, dan galeri.
**Alternatif**: PostgreSQL (lebih banyak fitur tapi tidak diminta), SQLite (terlalu sederhana untuk production).

### 3. Autentikasi dengan JWT + bcrypt
**Pilihan**: JSON Web Token (JWT) untuk sesi, bcrypt untuk hashing password
**Alasan**: Stateless, mudah diimplementasikan di Next.js API routes, cocok untuk single-role admin. Token disimpan di httpOnly cookie untuk keamanan.
**Alternatif**: NextAuth.js (overkill untuk single admin role), session-based (memerlukan state server).

### 4. Tailwind CSS untuk Styling
**Pilihan**: Tailwind CSS dengan konfigurasi kustom
**Alasan**: Utility-first CSS yang cepat untuk development, konsisten, dan menghasilkan bundle kecil. Sesuai permintaan.
**Alternatif**: CSS Modules, styled-components (runtime overhead).

### 5. Konten Halaman Disimpan di Database
**Pilihan**: Konten halaman statis disimpan di MySQL sebagai rich text/HTML
**Alasan**: Memungkinkan admin mengedit konten tanpa deploy ulang. Setiap halaman memiliki record di tabel `pages` dengan field konten.
**Alternatif**: Markdown files (memerlukan rebuild untuk update), Headless CMS seperti Strapi (kompleksitas tambahan yang tidak diperlukan).

### 6. File Upload untuk Galeri dan Blog
**Pilihan**: Upload ke direktori lokal `public/uploads/` dengan serving melalui Next.js static files
**Alasan**: Sederhana, tidak memerlukan layanan eksternal. Untuk skala awal ini cukup memadai.
**Alternatif**: Cloud storage seperti S3/R2 (biaya tambahan dan kompleksitas), database BLOB (performa buruk).

### 7. Rich Text Editor untuk Admin
**Pilihan**: React Quill atau TipTap sebagai rich text editor
**Alasan**: Memudahkan admin mengedit konten halaman dan artikel blog dengan format visual tanpa mengetahui HTML.
**Alternatif**: Plain textarea (terlalu sederhana), Markdown editor (kurva belajar untuk non-teknis).

## Risks / Trade-offs

- **[Keamanan file upload]** → Validasi tipe file, batas ukuran, dan sanitasi nama file untuk mencegah upload berbahaya
- **[Skalabilitas storage]** → File upload lokal tidak skala horizontal. Mitigasi: dapat migrasi ke cloud storage di masa depan tanpa mengubah API
- **[Single admin role]** → Tidak ada granularitas permission. Jika butuh multi-role di masa depan, perlu refactoring autentikasi
- **[SEO]** → Next.js SSR/SSG memberikan SEO dasar yang baik, tapi tidak dioptimalkan secara mendalam (non-goal)
- **[Backup database]** → Perlu setup backup rutin MySQL secara terpisah, tidak ditangani oleh aplikasi
