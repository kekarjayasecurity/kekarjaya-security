# Panduan Penggunaan Admin Panel

Panduan ini menjelaskan cara menggunakan Admin Panel Kekar Jaya Security untuk mengelola konten website.

---

## Daftar Isi

1. [Cara Login](#cara-login)
2. [Dashboard](#dashboard)
3. [Halaman](#halaman)
4. [Layanan](#layanan)
5. [Blog](#blog)
6. [Galeri](#galeri)
7. [FAQ](#faq)
8. [Struktur Organisasi](#struktur-organisasi)
9. [Klien](#klien)
10. [Pesan Kontak](#pesan-kontak)
11. [Tips Umum](#tips-umum)

---

## Cara Login

1. Buka halaman `/admin/login` di browser
2. Masukkan **Username** dan **Password** admin
3. Klik tombol **Login**
4. Jika berhasil, Anda akan diarahkan ke halaman Dashboard

> **Catatan:** Jangan bagikan akun admin ke pihak lain. Klik **Keluar** di sidebar ketika selesai menggunakan panel admin.

---

## Dashboard

Dashboard adalah halaman utama admin yang menampilkan ringkasan data website:

- **Artikel Blog** — jumlah artikel yang telah dipublikasikan
- **Foto Galeri** — jumlah foto di galeri
- **Pesan Belum Dibaca** — jumlah pesan kontak yang belum dibaca
- **Layanan** — jumlah layanan yang terdaftar

---

## Halaman

Menu **Halaman** digunakan untuk mengedit konten halaman statis website.

### Halaman yang Tersedia

| Halaman | Slug | Keterangan |
|---------|------|------------|
| Beranda | `beranda` | Halaman utama website |
| Tentang Kami | `tentang-kami` | Halaman profil perusahaan |
| Legalitas | `legalitas` | Halaman dokumen legalitas |
| Kontak | `kontak` | Halaman informasi kontak |
| Struktur Organisasi | `struktur-organisasi` | Halaman struktur organisasi |

### Cara Edit Halaman

1. Klik menu **Halaman** di sidebar
2. Pilih halaman yang ingin diedit, lalu klik **Edit**
3. Isi atau ubah field yang tersedia:
   - **Judul** — judul halaman
   - **Konten** — isi halaman menggunakan editor teks kaya (rich text)
4. Klik **Simpan**
5. Anda juga bisa klik **Preview** untuk melihat tampilan sebelum menyimpan

### Khusus Halaman Beranda

Halaman Beranda memiliki field tambahan:

- **Hero Banner**
  - **Gambar Hero Banner** — upload gambar latar belakang banner utama
  - Konten hero menggunakan field **Konten** (editor teks kaya). Gunakan heading (H1, H2, atau H3) untuk judul besar dan paragraf untuk teks penjelasan.

- **Mengapa Memilih Kami**
  - Klik **Tambah Item** untuk menambahkan keunggulan perusahaan
  - Setiap item terdiri dari **Judul** dan **Deskripsi**
  - Gunakan tombol panah untuk mengubah urutan item
  - Klik ikon sampah untuk menghapus item

### Khusus Halaman Tentang Kami

- **Gambar Halaman** — upload gambar yang ditampilkan di halaman Tentang Kami
- **Visi & Misi**
  - **Visi** — tuliskan visi perusahaan
  - **Poin Misi** — klik **Tambah Item** untuk menambahkan poin-poin misi
- **Nilai-Nilai Perusahaan**
  - Klik **Tambah Item** untuk menambahkan nilai perusahaan
  - Setiap nilai terdiri dari **Judul**, **Deskripsi**, dan **Ikon**
  - Pilih ikon yang sesuai dari daftar ikon yang tersedia

### Khusus Halaman Legalitas

- **Dokumen Legalitas**
  - Klik **Tambah Item** untuk menambahkan dokumen legalitas
  - Setiap dokumen terdiri dari **Judul**, **Deskripsi**, dan **Ikon**
  - Contoh: Akta Pendirian, NPWP, SIUP, dst.

### Khusus Halaman Kontak

- **Informasi Kontak**
  - **Alamat** — alamat lengkap perusahaan
  - **Telepon** — nomor telepon yang dapat dihubungi
  - **Email** — alamat email perusahaan
  - **Google Map URL (Embed)** — URL embed Google Maps untuk menampilkan peta lokasi
  - Data ini akan ditampilkan di halaman Kontak dan Footer website

---

## Layanan

Menu **Layanan** digunakan untuk mengelola daftar layanan keamanan yang ditampilkan di website.

### Melihat Daftar Layanan

1. Klik menu **Layanan** di sidebar
2. Tabel akan menampilkan semua layanan dengan informasi:
   - Nama layanan
   - Slug (URL)
   - Urutan tampilan

### Menambah Layanan Baru

1. Klik tombol **Tambah Layanan**
2. Isi form:
   - **Judul** — nama layanan (contoh: "Security Guard")
   - **Slug** — akan otomatis terisi dari judul, bisa diubah manual
   - **Deskripsi Singkat** — deskripsi singkat yang muncul di card layanan
   - **Ikon** — pilih ikon yang sesuai dari daftar ikon
   - **Gambar Layanan** — upload gambar layanan (opsional)
   - **Urutan** — nomor urut tampilan
   - **Konten** — deskripsi lengkap layanan menggunakan editor teks kaya
3. Klik **Simpan**

### Mengedit Layanan

1. Klik **Edit** pada layanan yang ingin diubah
2. Ubah field yang diinginkan
3. Klik **Simpan**

### Menghapus Layanan

1. Klik **Hapus** pada layanan yang ingin dihapus
2. Konfirmasi penghapusan di dialog yang muncul

> **Perhatian:** Penghapusan tidak bisa dibatalkan.

---

## Blog

Menu **Blog** digunakan untuk mengelola artikel blog dan kategori.

### Melihat Daftar Artikel

1. Klik menu **Blog** di sidebar
2. Gunakan filter di atas tabel untuk menyaring artikel:
   - **Semua** — semua artikel
   - **Dipublikasi** — artikel yang sudah terbit
   - **Draft** — artikel yang masih disimpan sebagai draf
3. Tabel menampilkan informasi:
   - Judul artikel
   - Kategori
   - Status (Dipublikasi / Draft)
   - Tanggal pembuatan

### Menambah Artikel Baru

1. Klik tombol **Tambah Artikel**
2. Isi form:
   - **Judul** — judul artikel
   - **Slug** — akan otomatis terisi dari judul
   - **Kategori** — pilih kategori (opsional)
   - **Ringkasan** — cuplikan singkat artikel
   - **Tanggal Publikasi** — tanggal dan waktu publikasi
   - **Thumbnail** — upload gambar utama artikel
   - **Konten** — isi artikel lengkap menggunakan editor teks kaya
3. Pilih aksi:
   - **Publikasikan** — artikel langsung terbit
   - **Simpan Draft** — artikel disimpan sebagai draf

### Mengedit Artikel

1. Klik **Edit** pada artikel yang ingin diubah
2. Ubah field yang diinginkan
3. Klik **Publikasikan** atau **Simpan Draft**

### Menghapus Artikel

1. Klik **Hapus** pada artikel yang ingin dihapus
2. Konfirmasi penghapusan

### Mengelola Kategori Blog

1. Di halaman Blog, klik tombol **Kategori**
2. Untuk menambah kategori baru:
   - Klik **Tambah Kategori**
   - Isi **Nama** kategori
   - **Slug** akan otomatis terisi
   - Klik **Simpan**
3. Untuk mengedit kategori:
   - Klik **Edit** pada kategori
   - Ubah nama atau slug
   - Klik **Simpan**
4. Untuk menghapus kategori:
   - Klik **Hapus**
   - Konfirmasi penghapusan

---

## Galeri

Menu **Galeri** digunakan untuk mengelola foto-foto di website.

### Melihat Foto

1. Klik menu **Galeri** di sidebar
2. Foto ditampilkan dalam grid
3. Hover pada foto untuk melihat tombol **Hapus**

### Upload Foto Baru

1. Klik tombol **Upload Foto**
2. Pilih atau drag & drop foto ke area upload
3. Isi **Judul** foto (opsional)
4. Pilih **Kategori** (opsional)
5. Klik **Upload**

### Menghapus Foto

1. Hover pada foto yang ingin dihapus
2. Klik tombol **Hapus** yang muncul
3. Konfirmasi penghapusan

### Mengelola Kategori Galeri

1. Di halaman Galeri, klik tombol **Kategori**
2. Untuk menambah kategori:
   - Klik **Tambah Kategori**
   - Isi **Nama** dan **Slug**
   - Klik **Simpan**
3. Untuk mengedit atau menghapus kategori, gunakan tombol **Edit** atau **Hapus**

---

## FAQ

Menu **FAQ** digunakan untuk mengelola pertanyaan dan jawaban yang sering diajukan.

### Melihat Daftar FAQ

1. Klik menu **FAQ** di sidebar
2. Tabel menampilkan nomor, pertanyaan, jawaban, dan urutan

### Menambah FAQ Baru

1. Klik tombol **Tambah FAQ**
2. Isi form:
   - **Pertanyaan** — pertanyaan yang sering diajukan
   - **Jawaban** — jawaban dari pertanyaan
   - **Urutan** — nomor urut tampilan
3. Klik **Simpan**

### Mengedit FAQ

1. Klik **Edit** pada FAQ yang ingin diubah
2. Ubah pertanyaan, jawaban, atau urutan
3. Klik **Simpan**

### Menghapus FAQ

1. Klik **Hapus** pada FAQ yang ingin dihapus
2. Konfirmasi penghapusan

---

## Struktur Organisasi

Menu **Organisasi** digunakan untuk mengelola gambar struktur organisasi dan daftar tim kepemimpinan.

### Mengubah Gambar Struktur Organisasi

1. Klik menu **Organisasi** di sidebar
2. Di bagian **Gambar Struktur Organisasi**, upload gambar baru
3. Lihat pratinjau gambar yang diupload
4. Klik **Simpan Gambar**

### Mengelola Tim Kepemimpinan

1. Di bagian **Tim Kepemimpinan**, klik **Tambah Anggota**
2. Isi form:
   - **Nama** — nama anggota
   - **Jabatan** — jabatan dalam perusahaan
   - **Foto** — upload foto anggota (opsional)
   - **Urutan** — nomor urut tampilan
3. Klik **Simpan**

### Mengubah Urutan Anggota

- Gunakan tombol **↑** (atas) dan **↓** (bawah) untuk mengubah posisi anggota dalam daftar

### Mengedit atau Menghapus Anggota

- Klik **Edit** untuk mengubah data anggota
- Klik **Hapus** untuk menghapus anggota dari daftar

---

## Klien

Menu **Klien** digunakan untuk mengelola daftar klien yang ditampilkan di halaman Beranda.

### Melihat Daftar Klien

1. Klik menu **Klien** di sidebar
2. Tabel menampilkan:
   - Logo klien
   - Nama klien
   - Website
   - Urutan
   - Status aktif/nonaktif

### Menambah Klien Baru

1. Klik tombol **Tambah Klien**
2. Isi form:
   - **Nama Klien** — nama perusahaan klien
   - **Logo Klien** — upload logo perusahaan
   - **Website URL** — alamat website klien (opsional, contoh: `https://example.com`)
   - **Urutan** — nomor urut tampilan
   - **Aktif** — centang untuk menampilkan klien di website
3. Klik **Simpan**

### Mengedit Klien

1. Klik **Edit** pada klien yang ingin diubah
2. Ubah field yang diinginkan
3. Klik **Simpan**

### Menghapus Klien

1. Klik **Hapus** pada klien yang ingin dihapus
2. Konfirmasi penghapusan

---

## Pesan Kontak

Menu **Pesan** digunakan untuk melihat dan mengelola pesan yang dikirim oleh pengunjung melalui form kontak.

### Melihat Daftar Pesan

1. Klik menu **Pesan** di sidebar
2. Tabel menampilkan:
   - **Status** — Baru (biru) atau Dibaca (abu-abu)
   - Nama pengirim
   - Subjek pesan
   - Tanggal pengiriman

### Membaca Pesan

1. Klik **Baca** pada pesan yang ingin dibaca
2. Halaman detail akan menampilkan:
   - Nama pengirim
   - Email
   - Subjek
   - Tanggal
   - Isi pesan lengkap
3. Status pesan akan otomatis berubah menjadi **Dibaca**

### Menghapus Pesan

1. Di halaman detail pesan, klik **Hapus Pesan**
2. Konfirmasi penghapusan

> **Tips:** Pantau jumlah **Pesan Belum Dibaca** di Dashboard untuk memastikan tidak ada pesan yang terlewat.

---

## Tips Umum

### Editor Teks Kaya (Rich Text Editor)

Editor teks kaya digunakan di beberapa halaman (Halaman, Layanan, Blog). Fitur yang tersedia:

- **Bold** — teks tebal
- **Italic** — teks miring
- **Heading** — judul (H1, H2, H3)
- **List** — daftar bullet atau nomor
- **Link** — tautan ke halaman lain
- **Gambar** — sisipkan gambar dalam konten

### Upload Gambar

- Klik area upload atau drag & drop file gambar
- Format yang didukung: JPG, PNG, GIF
- Gambar akan otomatis diupload ke server

### Slug

Slug adalah bagian URL yang unik untuk setiap konten. Contoh:
- Judul: "Security Guard Profesional"
- Slug otomatis: `security-guard-profesional`
- URL: `/layanan/security-guard-profesional`

> **Catatan:** Slug sebaiknya tidak diubah setelah konten dipublikasikan agar URL tetap valid.

### Urutan (Sort Order)

Field **Urutan** menentukan posisi tampilan item. Semakin kecil angkanya, semakin awal item ditampilkan.

### Preview

Saat mengedit halaman, klik tombol **Preview** untuk melihat tampilan website sebelum menyimpan perubahan.

---

## Navigasi Sidebar

| Menu | Ikon | Fungsi |
|------|------|--------|
| Dashboard | 🏠 | Ringkasan data website |
| Halaman | 📄 | Edit halaman statis |
| Layanan | 🛡️ | Kelola daftar layanan |
| Blog | 📰 | Kelola artikel blog |
| Galeri | 🖼️ | Kelola foto galeri |
| FAQ | ❓ | Kelola pertanyaan umum |
| Organisasi | 👥 | Kelola struktur organisasi |
| Klien | 🏢 | Kelola daftar klien |
| Pesan | ✉️ | Lihat pesan kontak |
| Keluar | 🚪 | Logout dari admin panel |

---

*Panduan ini akan diperbarui seiring dengan pengembangan fitur-fitur baru.*
