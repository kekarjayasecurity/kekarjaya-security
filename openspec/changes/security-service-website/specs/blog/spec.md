## ADDED Requirements

### Requirement: Daftar Artikel Blog
Sistem SHALL menyediakan halaman daftar artikel blog yang menampilkan seluruh artikel yang telah dipublikasikan.

#### Scenario: Pengguna mengakses halaman blog
- **WHEN** pengguna mengunjungi URL "/blog"
- **THEN** sistem menampilkan daftar artikel blog yang dipublikasikan dengan thumbnail, judul, ringkasan, tanggal publikasi, dan kategori

#### Scenario: Pagination daftar artikel
- **WHEN** jumlah artikel melebihi batas per halaman (9 artikel)
- **THEN** sistem menampilkan navigasi pagination untuk berpindah halaman

#### Scenario: Filter artikel berdasarkan kategori
- **WHEN** pengguna memilih kategori tertentu di halaman blog
- **THEN** sistem menampilkan hanya artikel yang termasuk dalam kategori tersebut

### Requirement: Detail Artikel Blog
Sistem SHALL menyediakan halaman detail artikel blog yang menampilkan konten lengkap artikel.

#### Scenario: Pengguna membaca artikel blog
- **WHEN** pengguna mengunjungi URL "/blog/[slug]"
- **THEN** sistem menampilkan judul, tanggal publikasi, kategori, konten lengkap artikel, dan penulis

#### Scenario: Artikel tidak ditemukan
- **WHEN** pengguna mengunjungi URL "/blog/[slug]" dengan slug yang tidak ada
- **THEN** sistem menampilkan halaman 404

#### Scenario: Navigasi ke artikel terkait
- **WHEN** pengguna berada di halaman detail artikel
- **THEN** sistem menampilkan daftar artikel terkait berdasarkan kategori yang sama di bagian bawah artikel

### Requirement: Kategori Blog
Sistem SHALL menyelenggarakan artikel blog dalam kategori-kategori yang dapat dikelola oleh admin.

#### Scenario: Menampilkan daftar kategori
- **WHEN** pengguna melihat sidebar atau section kategori di halaman blog
- **THEN** sistem menampilkan daftar kategori beserta jumlah artikel dalam setiap kategori
