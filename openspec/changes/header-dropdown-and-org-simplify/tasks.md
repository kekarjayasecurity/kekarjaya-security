## 1. Header Dropdown Layanan

- [x] 1.1 Ubah komponen Header (`components/public/Header.tsx`) menjadi client component yang fetch daftar layanan dari `/api/admin/services` saat mount
- [x] 1.2 Tambahkan dropdown menu pada item "Layanan" yang muncul saat hover (desktop) dengan menampilkan daftar layanan (judul + link ke `/layanan/[slug]`)
- [x] 1.3 Tambahkan sub-daftar layanan pada hamburger menu mobile di bawah item "Layanan" yang bisa di-expand

## 2. Halaman Struktur Organisasi Publik

- [x] 2.1 Ubah halaman `app/(public)/struktur-organisasi/page.tsx` dari grid anggota menjadi menampilkan satu judul dan satu gambar
- [x] 2.2 Tambahkan penanganan jika gambar belum diupload (tampilkan pesan "Gambar struktur organisasi belum tersedia")

## 3. Admin Struktur Organisasi

- [x] 3.1 Ubah halaman admin `app/admin/(dashboard)/organization/page.tsx` dari CRUD anggota menjadi form upload satu gambar dengan preview
- [x] 3.2 Buat API endpoint untuk menyimpan dan mengambil gambar struktur organisasi (bisa menggunakan tabel `pages` dengan slug `struktur-organisasi` atau endpoint terpisah)
- [x] 3.3 Update seed data untuk menambahkan entry halaman `struktur-organisasi` di tabel `pages` jika belum ada

## 4. Verifikasi

- [x] 4.1 Verifikasi dropdown layanan berfungsi di desktop (hover) dan mobile (expand)
- [x] 4.2 Verifikasi halaman Struktur Organisasi menampilkan gambar yang diupload admin
- [x] 4.3 Verifikasi admin dapat mengupload dan mengubah gambar struktur organisasi
