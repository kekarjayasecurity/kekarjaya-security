## Context

Website PT Kekar Jaya Security sudah berjalan dengan header navigasi standar dan halaman Struktur Organisasi berbasis daftar anggota. Perubahan ini mencakup dua area: komponen Header dan halaman Struktur Organisasi.

Kondisi saat ini:
- Header menampilkan "Layanan" sebagai link biasa ke `/layanan`
- Halaman Struktur Organisasi menampilkan grid anggota (nama, jabatan, foto) dari tabel `organization_members`

## Goals / Non-Goals

**Goals:**
- Memudahkan pengunjung melihat daftar layanan langsung dari header tanpa harus navigasi ke halaman terpisah
- Menyederhanakan halaman Struktur Organisasi menjadi satu gambar yang dikelola admin

**Non-Goals:**
- Mega menu atau dropdown kompleks dengan sub-kategori
- Animasi atau transisi yang rumit pada dropdown
- Perubahan pada struktur data layanan di database

## Decisions

### 1. Dropdown Layanan dengan CSS Hover + Client State
**Pilihan**: Dropdown yang muncul saat hover (desktop) menggunakan CSS + state management sederhana di React
**Alasan**: Sederhana, performa baik, tidak perlu library tambahan. Desktop hover, mobile tetap menggunakan navigasi ke halaman layanan.
**Alternatif**: Library dropdown external (overkill), pure CSS tanpa JS (tidak bisa fetch data dinamis).

### 2. Fetch Layanan di Header secara Dynamic
**Pilihan**: Header menjadi client component yang fetch data layanan dari API saat mount
**Alasan**: Data layanan bisa berubah melalui admin, sehingga perlu di-fetch secara dinamis. Jumlah layanan sedikit sehingga tidak membebani performa.
**Alternatif**: Server component dengan cache (kompleksitas tambahan tidak sebanding).

### 3. Struktur Organisasi sebagai Halaman dengan Single Image
**Pilihan**: Gunakan tabel `pages` yang sudah ada dengan slug `struktur-organisasi`, tambahkan field image di konten atau gunakan field terpisah
**Alasan**: Menggunakan infrastruktur yang sudah ada (tabel pages + admin page editor), tidak perlu tabel baru.
**Implementasi**: Simpan path gambar di field `content` halaman `struktur-organisasi`, atau tambahkan kolom `image` di tabel pages.

### 4. Admin Organisasi Menjadi Upload Gambar Tunggal
**Pilihan**: Ganti halaman admin Organisasi dari CRUD anggota menjadi form upload satu gambar
**Alasan**: Sesuai kebutuhan bahwa desain struktur organisasi dihandle di luar aplikasi. Cukup upload gambar yang sudah jadi.

## Risks / Trade-offs

- **[Data anggota organisasi yang sudah ada]** → Jika ada data di tabel `organization_members`, akan diabaikan. Tabel tidak dihapus tapi tidak lagi digunakan.
- **[Dropdown di mobile]** → Pada mobile, dropdown tidak cocok untuk hover. Mitigasi: di mobile tetap gunakan link biasa ke halaman layanan.
