## ADDED Requirements

### Requirement: Dropdown Layanan di Header
Header navigasi SHALL menampilkan dropdown menu pada item "Layanan" yang berisi daftar seluruh layanan yang tersedia saat di-hover oleh pengguna pada desktop.

#### Scenario: Pengguna hover pada menu Layanan di desktop
- **WHEN** pengguna mengarahkan kursor ke menu "Layanan" di header pada tampilan desktop
- **THEN** sistem menampilkan dropdown berisi daftar semua layanan aktif dengan judul dan link ke detail masing-masing layanan

#### Scenario: Pengguna klik item layanan dari dropdown
- **WHEN** pengguna mengklik salah satu layanan di dropdown
- **THEN** sistem mengarahkan pengguna ke halaman detail layanan `/layanan/[slug]`

#### Scenario: Dropdown menampilkan layanan terbaru
- **WHEN** admin menambahkan layanan baru melalui panel admin
- **THEN** layanan baru tersebut muncul di dropdown header tanpa perlu perubahan kode

#### Scenario: Tidak ada layanan tersedia
- **WHEN** belum ada layanan yang ditambahkan di database
- **THEN** dropdown menampilkan pesan "Belum ada layanan" atau tidak menampilkan dropdown

### Requirement: Layanan di Mobile Navigation
Pada tampilan mobile, menu "Layanan" pada hamburger menu SHALL menampilkan sub-daftar layanan yang bisa di-expand.

#### Scenario: Pengguna membuka menu Layanan di mobile
- **WHEN** pengguna membuka hamburger menu dan menekan "Layanan"
- **THEN** sistem menampilkan sub-daftar layanan di bawah item Layanan yang bisa diklik untuk navigasi ke detail
