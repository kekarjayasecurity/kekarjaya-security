## ADDED Requirements

### Requirement: Dashboard Admin
Sistem SHALL menyediakan halaman dashboard admin yang menampilkan ringkasan data website.

#### Scenario: Admin mengakses dashboard
- **WHEN** admin mengunjungi URL "/admin"
- **THEN** sistem menampilkan dashboard dengan jumlah total artikel blog, foto galeri, pesan kontak yang belum dibaca, dan link kefitur manajemen konten

### Requirement: Editor Konten Halaman
Sistem SHALL menyediakan editor konten untuk setiap halaman publik agar admin dapat mengubah konten tanpa mengubah kode.

#### Scenario: Admin membuka editor halaman
- **WHEN** admin mengklik menu "Halaman" dan memilih salah satu halaman
- **THEN** sistem menampilkan form editor dengan konten saat ini yang dapat diedit menggunakan rich text editor

#### Scenario: Admin menyimpan perubahan konten halaman
- **WHEN** admin mengedit konten halaman dan menekan tombol "Simpan"
- **THEN** sistem menyimpan perubahan ke database dan menampilkan notifikasi berhasil

#### Scenario: Admin mempreview perubahan sebelum menyimpan
- **WHEN** admin menekan tombol "Preview"
- **THEN** sistem menampilkan pratinjau halaman dengan konten yang telah diedit

### Requirement: Manajemen Artikel Blog
Sistem SHALL menyediakan CRUD lengkap untuk mengelola artikel blog melalui panel admin.

#### Scenario: Admin membuat artikel baru
- **WHEN** admin mengisi form artikel baru dengan judul, konten, kategori, thumbnail, dan menekan "Publikasikan"
- **THEN** sistem menyimpan artikel ke database, generate slug dari judul, dan artikel langsung terlihat di website publik

#### Scenario: Admin menyimpan draft artikel
- **WHEN** admin mengisi form artikel dan menekan "Simpan Draft"
- **THEN** sistem menyimpan artikel dengan status draft yang tidak terlihat di website publik

#### Scenario: Admin mengedit artikel
- **WHEN** admin mengubah konten artikel yang sudah ada dan menekan "Simpan"
- **THEN** sistem memperbarui artikel di database dan perubahan terlihat di website publik

#### Scenario: Admin menghapus artikel
- **WHEN** admin menekan tombol "Hapus" pada artikel dan mengkonfirmasi
- **THEN** sistem menghapus artikel dari database dan artikel tidak lagi terlihat di website publik

### Requirement: Manajemen Kategori Blog
Sistem SHALL menyediakan CRUD untuk mengelola kategori blog.

#### Scenario: Admin membuat kategori baru
- **WHEN** admin mengisi nama kategori dan menekan "Simpan"
- **THEN** sistem menyimpan kategori baru dan tersedia untuk dipilih saat membuat artikel

#### Scenario: Admin menghapus kategori
- **WHEN** admin menghapus kategori yang masih memiliki artikel
- **THEN** sistem menampilkan peringatan bahwa kategori masih memiliki artikel dan meminta konfirmasi

### Requirement: Manajemen Galeri
Sistem SHALL menyediakan CRUD untuk mengelola foto galeri melalui panel admin.

#### Scenario: Admin mengupload foto ke galeri
- **WHEN** admin memilih file foto, mengisi judul dan kategori, lalu menekan "Upload"
- **THEN** sistem menyimpan foto ke storage dan menyimpan metadata ke database

#### Scenario: Admin mengupload multiple foto
- **WHEN** admin memilih beberapa file foto sekaligus dan menekan "Upload"
- **THEN** sistem menyimpan semua foto yang dipilih dengan kategori yang sama

#### Scenario: Admin menghapus foto galeri
- **WHEN** admin menghapus foto dari galeri
- **THEN** sistem menghapus file foto dari storage dan metadata dari database

#### Scenario: Admin mengubah informasi foto
- **WHEN** admin mengubah judul atau kategori foto
- **THEN** sistem memperbarui metadata foto di database

### Requirement: Manajemen Pesan Kontak
Sistem SHALL menyediakan halaman untuk melihat dan mengelola pesan yang masuk dari form kontak.

#### Scenario: Admin melihat daftar pesan
- **WHEN** admin mengunjungi halaman "Pesan Kontak" di panel admin
- **THEN** sistem menampilkan daftar pesan dengan nama pengirim, subjek, tanggal, dan status (dibaca/belum dibaca)

#### Scenario: Admin membaca pesan
- **WHEN** admin mengklik salah satu pesan
- **THEN** sistem menampilkan detail pesan lengkap dan menandai pesan sebagai "sudah dibaca"

#### Scenario: Admin menghapus pesan
- **WHEN** admin menghapus pesan
- **THEN** sistem menghapus pesan dari database

### Requirement: Manajemen FAQ
Sistem SHALL menyediakan CRUD untuk mengelola pertanyaan dan jawaban FAQ.

#### Scenario: Admin menambah pertanyaan FAQ baru
- **WHEN** admin mengisi pertanyaan dan jawaban baru lalu menekan "Simpan"
- **THEN** sistem menyimpan FAQ baru dan langsung terlihat di halaman FAQ publik

#### Scenario: Admin mengubah urutan FAQ
- **WHEN** admin mengubah nomor urutan FAQ
- **THEN** sistem memperbarui urutan tampilan di halaman FAQ publik sesuai urutan yang ditentukan

### Requirement: Manajemen Struktur Organisasi
Sistem SHALL menyediakan CRUD untuk mengelola anggota struktur organisasi.

#### Scenario: Admin menambah anggota organisasi
- **WHEN** admin mengisi nama, jabatan, upload foto, dan menekan "Simpan"
- **THEN** sistem menyimpan data anggota baru dan terlihat di halaman Struktur Organisasi

#### Scenario: Admin mengubah urutan anggota
- **WHEN** admin mengubah urutan tampilan anggota organisasi
- **THEN** sistem memperbarui urutan tampilan di halaman Struktur Organisasi publik

### Requirement: Manajemen Layanan
Sistem SHALL menyediakan CRUD untuk mengelola daftar layanan yang ditampilkan di halaman publik.

#### Scenario: Admin menambah layanan baru
- **WHEN** admin mengisi nama layanan, deskripsi, ikon, dan menekan "Simpan"
- **THEN** sistem menyimpan layanan baru dan terlihat di halaman Layanan publik

#### Scenario: Admin menghapus layanan
- **WHEN** admin menghapus layanan
- **THEN** sistem menghapus layanan dari database dan tidak lagi ditampilkan di halaman publik
