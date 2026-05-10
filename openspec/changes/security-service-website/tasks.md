## 1. Setup Proyek

- [x] 1.1 Inisialisasi proyek Next.js dengan App Router dan TypeScript
- [x] 1.2 Konfigurasi Tailwind CSS dengan tema kustom (warna brand Kekar Jaya Security)
- [x] 1.3 Setup koneksi MySQL dengan mysql2 dan konfigurasi environment variables
- [x] 1.4 Buat struktur folder: app/, components/, lib/, types/
- [x] 1.5 Buat file `.env.example` dengan template konfigurasi (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET)

## 2. Database Schema & Migrasi

- [x] 2.1 Buat script migrasi untuk tabel `admin_users` (id, username, password_hash, created_at, updated_at)
- [x] 2.2 Buat script migrasi untuk tabel `pages` (id, slug, title, content, updated_at)
- [x] 2.3 Buat script migrasi untuk tabel `services` (id, title, description, icon, content, sort_order, created_at, updated_at)
- [x] 2.4 Buat script migrasi untuk tabel `blog_categories` (id, name, slug, created_at)
- [x] 2.5 Buat script migrasi untuk tabel `blog_posts` (id, title, slug, content, excerpt, thumbnail, category_id, status, published_at, created_at, updated_at)
- [x] 2.6 Buat script migrasi untuk tabel `gallery_categories` (id, name, slug, created_at)
- [x] 2.7 Buat script migrasi untuk tabel `gallery_photos` (id, title, filename, category_id, sort_order, created_at)
- [x] 2.8 Buat script migrasi untuk tabel `faq` (id, question, answer, sort_order, created_at, updated_at)
- [x] 2.9 Buat script migrasi untuk tabel `organization_members` (id, name, position, photo, sort_order, created_at, updated_at)
- [x] 2.10 Buat script migrasi untuk tabel `contact_messages` (id, name, email, subject, message, is_read, created_at)
- [x] 2.11 Buat script seeder untuk data awal: akun admin default dan konten halaman default
- [x] 2.12 Buat utility `lib/db.ts` untuk koneksi database pool dan query helper

## 3. Autentikasi Admin

- [x] 3.1 Buat utility `lib/auth.ts` untuk hash password (bcrypt), generate JWT, dan verify JWT
- [x] 3.2 Buat middleware untuk proteksi rute admin (cek JWT di httpOnly cookie)
- [x] 3.3 Buat API route `POST /api/admin/auth/login` untuk autentikasi admin
- [x] 3.4 Buat API route `POST /api/admin/auth/logout` untuk menghapus sesi
- [x] 3.5 Buat halaman login admin di `app/admin/login/page.tsx` dengan form username dan password
- [x] 3.6 Implementasi redirect ke `/admin/login` jika belum autentikasi saat mengakses `/admin/*`

## 4. Layout & Komponen Bersama

- [x] 4.1 Buat layout publik `app/(public)/layout.tsx` dengan Header dan Footer
- [x] 4.2 Buat komponen Header dengan navigasi desktop dan hamburger menu mobile
- [x] 4.3 Buat komponen Footer dengan informasi kontak, link navigasi, dan copyright
- [x] 4.4 Buat layout admin `app/admin/layout.tsx` dengan sidebar dan topbar
- [x] 4.5 Buat komponen Sidebar admin dengan menu navigasi ke semua fitur manajemen
- [x] 4.6 Buat komponen reusable: Button, Input, Textarea, Card, Table, Modal, Pagination
- [x] 4.7 Buat komponen RichTextEditor untuk editing konten halaman dan blog
- [x] 4.8 Buat komponen ImageUpload untuk upload foto (galeri, thumbnail blog, foto anggota)

## 5. Halaman Publik

- [x] 5.1 Buat halaman Beranda `app/(public)/page.tsx` dengan hero section, ringkasan layanan, profil singkat, dan CTA
- [x] 5.2 Buat halaman Tentang Kami `app/(public)/tentang-kami/page.tsx` dengan sejarah, visi, misi, dan nilai
- [x] 5.3 Buat halaman Layanan `app/(public)/layanan/page.tsx` dengan daftar layanan
- [x] 5.4 Buat halaman detail Layanan `app/(public)/layanan/[slug]/page.tsx`
- [x] 5.5 Buat halaman Legalitas `app/(public)/legalitas/page.tsx` dengan daftar dokumen legal
- [x] 5.6 Buat halaman Struktur Organisasi `app/(public)/struktur-organisasi/page.tsx` dengan bagan organisasi
- [x] 5.7 Buat halaman FAQ `app/(public)/faq/page.tsx` dengan accordion dan pencarian
- [x] 5.8 Buat halaman 404 kustom dalam Bahasa Indonesia

## 6. Halaman Blog Publik

- [x] 6.1 Buat halaman daftar blog `app/(public)/blog/page.tsx` dengan pagination dan filter kategori
- [x] 6.2 Buat halaman detail blog `app/(public)/blog/[slug]/page.tsx` dengan artikel terkait
- [x] 6.3 Buat komponen BlogCard untuk menampilkan preview artikel di daftar blog

## 7. Halaman Galeri Publik

- [x] 7.1 Buat halaman galeri `app/(public)/galeri/page.tsx` dengan grid foto, filter kategori, dan pagination
- [x] 7.2 Buat komponen Lightbox untuk menampilkan foto dalam ukuran besar dengan navigasi

## 8. Halaman Kontak Publik

- [x] 8.1 Buat API route `POST /api/contact` untuk menerima pesan kontak dengan validasi
- [x] 8.2 Buat halaman kontak `app/(public)/kontak/page.tsx` dengan form pesan, informasi kontak, dan embed peta

## 9. Dashboard Admin

- [x] 9.1 Buat halaman dashboard admin `app/admin/page.tsx` dengan statistik ringkasan (jumlah artikel, galeri, pesan belum dibaca)

## 10. Manajemen Konten Halaman (Admin)

- [x] 10.1 Buat API route `GET /api/admin/pages` untuk daftar halaman
- [x] 10.2 Buat API route `PUT /api/admin/pages/[id]` untuk update konten halaman
- [x] 10.3 Buat halaman daftar halaman `app/admin/pages/page.tsx`
- [x] 10.4 Buat halaman editor halaman `app/admin/pages/[id]/page.tsx` dengan rich text editor dan preview

## 11. Manajemen Layanan (Admin)

- [x] 11.1 Buat API routes CRUD `/api/admin/services` (GET, POST, PUT, DELETE)
- [x] 11.2 Buat halaman daftar layanan `app/admin/services/page.tsx`
- [x] 11.3 Buat halaman form layanan `app/admin/services/[id]/page.tsx` untuk create/edit

## 12. Manajemen Blog (Admin)

- [x] 12.1 Buat API routes CRUD `/api/admin/blog/posts` (GET, POST, PUT, DELETE) dengan upload thumbnail
- [x] 12.2 Buat API routes CRUD `/api/admin/blog/categories` (GET, POST, PUT, DELETE)
- [x] 12.3 Buat halaman daftar artikel blog `app/admin/blog/page.tsx` dengan filter status (published/draft)
- [x] 12.4 Buat halaman form artikel `app/admin/blog/[id]/page.tsx` dengan rich text editor dan upload thumbnail
- [x] 12.5 Buat halaman manajemen kategori `app/admin/blog/categories/page.tsx`

## 13. Manajemen Galeri (Admin)

- [x] 13.1 Buat API routes CRUD `/api/admin/gallery/photos` (GET, POST, PUT, DELETE) dengan upload file
- [x] 13.2 Buat API routes CRUD `/api/admin/gallery/categories` (GET, POST, PUT, DELETE)
- [x] 13.3 Buat halaman daftar foto galeri `app/admin/gallery/page.tsx` dengan upload multiple foto
- [x] 13.4 Buat halaman manajemen kategori galeri `app/admin/gallery/categories/page.tsx`

## 14. Manajemen FAQ (Admin)

- [x] 14.1 Buat API routes CRUD `/api/admin/faq` (GET, POST, PUT, DELETE)
- [x] 14.2 Buat halaman manajemen FAQ `app/admin/faq/page.tsx` dengan drag-and-drop reorder

## 15. Manajemen Struktur Organisasi (Admin)

- [x] 15.1 Buat API routes CRUD `/api/admin/organization` (GET, POST, PUT, DELETE) dengan upload foto
- [x] 15.2 Buat halaman manajemen struktur organisasi `app/admin/organization/page.tsx` dengan reorder

## 16. Manajemen Pesan Kontak (Admin)

- [x] 16.1 Buat API route `GET /api/admin/messages` untuk daftar pesan dengan pagination
- [x] 16.2 Buat API route `PUT /api/admin/messages/[id]/read` untuk menandai pesan sebagai dibaca
- [x] 16.3 Buat API route `DELETE /api/admin/messages/[id]` untuk menghapus pesan
- [x] 16.4 Buat halaman daftar pesan `app/admin/messages/page.tsx` dengan indikator belum dibaca
- [x] 16.5 Buat halaman detail pesan `app/admin/messages/[id]/page.tsx`

## 17. Testing & Finalisasi

- [x] 17.1 Test seluruh halaman publik dan pastikan tampilan responsif (mobile, tablet, desktop)
- [x] 17.2 Test seluruh fitur admin CRUD dan pastikan validasi berjalan
- [x] 17.3 Test autentikasi: login, logout, proteksi rute, token expired
- [x] 17.4 Test upload file: validasi tipe, ukuran, dan penyimpanan
- [x] 17.5 Verifikasi seluruh konten dalam Bahasa Indonesia
