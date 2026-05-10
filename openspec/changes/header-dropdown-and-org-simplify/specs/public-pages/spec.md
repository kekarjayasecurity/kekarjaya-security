## MODIFIED Requirements

### Requirement: Halaman Struktur Organisasi
Sistem SHALL menyediakan halaman "Struktur Organisasi" yang menampilkan satu judul dan satu gambar bagan struktur organisasi perusahaan.

#### Scenario: Pengguna mengakses halaman Struktur Organisasi
- **WHEN** pengguna mengunjungi URL "/struktur-organisasi"
- **THEN** sistem menampilkan halaman dengan judul "Struktur Organisasi" dan satu gambar bagan organisasi perusahaan

#### Scenario: Gambar belum diupload admin
- **WHEN** admin belum mengupload gambar struktur organisasi
- **THEN** sistem menampilkan pesan "Gambar struktur organisasi belum tersedia"

#### Scenario: Admin mengupload gambar struktur organisasi
- **WHEN** admin mengupload gambar baru melalui halaman manajemen organisasi
- **THEN** gambar tersebut langsung terlihat di halaman Struktur Organisasi publik

## REMOVED Requirements

### Requirement: CRUD Anggota Organisasi Individual
**Reason**: Struktur organisasi sekarang ditampilkan sebagai satu gambar yang dikelola di luar aplikasi, bukan daftar anggota individual
**Migration**: Data di tabel `organization_members` tidak lagi digunakan. Admin cukup mengupload satu gambar struktur organisasi.
