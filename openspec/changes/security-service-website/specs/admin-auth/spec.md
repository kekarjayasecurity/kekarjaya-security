## ADDED Requirements

### Requirement: Halaman Login Admin
Sistem SHALL menyediakan halaman login untuk admin yang memerlukan username dan password.

#### Scenario: Admin mengakses halaman login
- **WHEN** pengguna mengunjungi URL "/admin/login"
- **THEN** sistem menampilkan form login dengan field username dan password

#### Scenario: Admin berhasil login
- **WHEN** admin memasukkan username dan password yang benar lalu menekan tombol "Masuk"
- **THEN** sistem mengautentikasi admin, membuat sesi JWT, dan mengarahkan ke halaman dashboard admin "/admin"

#### Scenario: Admin gagal login
- **WHEN** admin memasukkan username atau password yang salah
- **THEN** sistem menampilkan pesan error "Username atau password salah" dan tidak membuat sesi

#### Scenario: Admin mengakses halaman admin tanpa login
- **WHEN** pengguna yang belum terautentikasi mengunjungi URL "/admin/*"
- **THEN** sistem mengarahkan pengguna ke halaman login "/admin/login"

### Requirement: Logout Admin
Sistem SHALL menyediakan fungsi logout yang menghapus sesi admin.

#### Scenario: Admin logout
- **WHEN** admin menekan tombol "Keluar" di panel admin
- **THEN** sistem menghapus sesi JWT dan mengarahkan ke halaman login

### Requirement: Proteksi Rute Admin
Sistem SHALL memproteksi seluruh rute admin sehingga hanya dapat diakses oleh admin yang terautentikasi.

#### Scenario: Akses API admin tanpa autentikasi
- **WHEN** request ke API endpoint admin dilakukan tanpa token JWT yang valid
- **THEN** sistem mengembalikan response 401 Unauthorized

#### Scenario: Token JWT expired
- **WHEN** admin dengan token JWT yang sudah expired mengakses halaman admin
- **THEN** sistem menghapus token, mengarahkan ke halaman login dengan pesan "Sesi telah berakhir, silakan login kembali"
