## Why

PT Kekar Jaya Security membutuhkan website profesional untuk menampilkan profil perusahaan, layanan keamanan, legalitas, dan informasi kontak kepada calon klien. Saat ini belum ada platform online yang merepresentasikan perusahaan secara digital. Website ini juga perlu dilengkapi panel admin agar tim internal dapat mengelola seluruh konten secara mandiri tanpa bantuan developer.

## What Changes

- Membuat website publik dengan 9 halaman: Beranda, Tentang Kami, Layanan, Legalitas, Struktur Organisasi, FAQ, Galeri, Blog, dan Kontak
- Membuat sistem blog dengan halaman daftar artikel dan detail artikel
- Membuat halaman galeri untuk menampilkan foto kegiatan dan dokumentasi perusahaan
- Membuat halaman kontak dengan form pesan dan informasi lokasi perusahaan
- Membuat halaman login admin untuk autentikasi
- Membuat panel admin dengan editor konten untuk mengelola seluruh halaman publik
- Membuat panel admin untuk mengelola artikel blog dan galeri foto
- Seluruh konten dan konfigurasi menggunakan Bahasa Indonesia

## Capabilities

### New Capabilities
- `public-pages`: Halaman-halaman publik statis termasuk Beranda, Tentang Kami, Layanan, Legalitas, Struktur Organisasi, FAQ, Galeri, dan Kontak
- `blog`: Sistem blog dengan daftar artikel, detail artikel, dan kategori
- `admin-auth`: Autentikasi admin dengan halaman login dan manajemen sesi
- `content-management`: Panel admin CMS untuk mengelola konten seluruh halaman, blog, galeri, dan pesan kontak

### Modified Capabilities
(Tidak ada - ini adalah project baru)

## Impact

- **Tech Stack**: Next.js (App Router) sebagai framework fullstack untuk frontend dan backend, MySQL sebagai database, Tailwind CSS untuk styling
- **Database**: Skema baru untuk menyimpan konten halaman, artikel blog, galeri, pesan kontak, dan akun admin
- **API Routes**: Next.js API routes untuk CRUD konten, autentikasi, dan upload media
- **Deployment**: Aplikasi perlu di-deploy ke environment yang mendukung Node.js dan MySQL
- **Dependencies**: next, react, mysql2, bcrypt/jsonwebtoken untuk autentikasi, tailwindcss, dan library untuk upload file
