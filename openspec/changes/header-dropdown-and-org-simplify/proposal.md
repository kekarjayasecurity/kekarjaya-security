## Why

Navigasi header saat ini menampilkan "Layanan" sebagai link biasa tanpa menampilkan daftar layanan yang tersedia. Pengunjung harus klik dan masuk ke halaman layanan dulu untuk melihat pilihan. Selain itu, halaman Struktur Organisasi saat ini menampilkan daftar anggota individual (nama, jabatan, foto) padahal desain struktur organisasi sebaiknya dihandle sebagai satu gambar yang dikelola di luar aplikasi.

## What Changes

- Mengubah link "Layanan" di header menjadi dropdown menu yang menampilkan daftar seluruh layanan saat di-hover (desktop) atau diklik (mobile)
- Mengubah halaman Struktur Organisasi dari daftar anggota individu menjadi menampilkan satu judul dan satu gambar struktur organisasi
- Mengubah manajemen Struktur Organisasi di admin dari CRUD anggota menjadi upload satu gambar
- Menghapus tabel `organization_members` dan menggantinya dengan penyimpanan gambar di tabel `pages` atau konfigurasi terpisah

## Capabilities

### New Capabilities
- `layanan-dropdown`: Dropdown menu layanan di header navigasi yang menampilkan daftar layanan dari database secara dinamis

### Modified Capabilities
- `public-pages`: Perubahan pada halaman Struktur Organisasi dari daftar anggota menjadi single image

## Impact

- **Komponen Header**: Perlu diubah dari link biasa menjadi dropdown dengan hover state
- **Halaman Struktur Organisasi**: Perubahan signifikan dari grid anggota menjadi tampilan gambar tunggal
- **Admin Organisasi**: Dari CRUD anggota menjadi upload/edit satu gambar
- **Database**: Tabel `organization_members` tidak lagi digunakan, data gambar struktur disimpan di tabel `pages` atau konfigurasi
