import "dotenv/config";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "kekarjaya_security",
    multipleStatements: true,
  });

  // --- Admin Users ---
  const adminPassword = await bcrypt.hash("admin123", 10);
  const editorPassword = await bcrypt.hash("editor123", 10);

  await connection.query(
    `INSERT IGNORE INTO admin_users (username, password_hash) VALUES ?`,
    [
      [
        ["admin", adminPassword],
        ["editor", editorPassword],
      ],
    ]
  );
  console.log("✓ admin_users seeded");

  // --- Pages (with hero and image fields) ---
  const pages = [
    {
      slug: "beranda",
      title: "Beranda",
      content:
        '<h2>Selamat Datang di PT Kekar Jaya Security</h2><p>Kami menyediakan layanan keamanan profesional dan terpercaya untuk melindungi aset dan keselamatan Anda.</p><p>Dengan pengalaman lebih dari 15 tahun, kami telah melayani ratusan klien dari berbagai sektor industri.</p>',
      hero_image_url: "/images/hero-banner.svg",
      hero_title: "Solusi Keamanan Profesional & Terpercaya",
      hero_subtitle: "PT Kekar Jaya Security menyediakan layanan keamanan terpadu untuk melindungi aset dan keselamatan Anda dengan tenaga terlatih dan bersertifikat.",
      image_url: null,
      sections: JSON.stringify({
        why_choose_us: [
          { title: "Personel Terlatih", description: "Seluruh personel kami telah menjalani pelatihan intensif dan bersertifikat" },
          { title: "Layanan 24 Jam", description: "Kami siap melayani kebutuhan keamanan Anda 24 jam sehari, 7 hari seminggu" },
          { title: "Berizin Resmi", description: "Beroperasi secara legal dengan izin resmi dari pihak berwenang" },
        ],
      }),
    },
    {
      slug: "tentang-kami",
      title: "Tentang Kami",
      content:
        '<h2>Tentang PT Kekar Jaya Security</h2><p>PT Kekar Jaya Security adalah perusahaan jasa keamanan yang berdiri dengan visi menjadi penyedia layanan keamanan terdepan di Indonesia.</p><h3>Visi</h3><p>Menjadi perusahaan jasa keamanan terpercaya dan profesional yang menjadi pilihan utama di Indonesia.</p><h3>Misi</h3><ul><li>Menyediakan tenaga keamanan terlatih dan profesional</li><li>Mengutamakan kualitas layanan dan kepuasan pelanggan</li><li>Menerapkan standar keamanan nasional dan internasional</li><li>Mengembangkan SDM secara berkelanjutan</li></ul><h3>Nilai-Nilai Perusahaan</h3><ul><li><strong>Integritas</strong> - Jujur dan bertanggung jawab dalam setiap tindakan</li><li><strong>Profesionalisme</strong> - Memberikan layanan terbaik dengan standar tinggi</li><li><strong>Kepercayaan</strong> - Membangun hubungan yang terpercaya dengan klien</li><li><strong>Disiplin</strong> - Konsisten dan tepat waktu dalam setiap penugasan</li></ul>',
      hero_image_url: null,
      hero_title: null,
      hero_subtitle: null,
      image_url: "/images/about-image.svg",
      sections: JSON.stringify({
        vision: "Menjadi perusahaan jasa keamanan terpercaya dan profesional yang menjadi pilihan utama di Indonesia.",
        mission_items: [
          "Menyediakan tenaga keamanan terlatih dan profesional",
          "Mengutamakan kualitas layanan dan kepuasan pelanggan",
          "Menerapkan standar keamanan nasional dan internasional",
          "Mengembangkan SDM secara berkelanjutan",
        ],
        values: [
          { title: "Integritas", description: "Jujur dan bertanggung jawab dalam setiap tindakan", icon: "shield-check" },
          { title: "Profesionalisme", description: "Memberikan layanan terbaik dengan standar tinggi", icon: "flask" },
          { title: "Kepercayaan", description: "Membangun hubungan yang terpercaya dengan klien", icon: "users" },
          { title: "Disiplin", description: "Konsisten dan tepat waktu dalam setiap penugasan", icon: "clock" },
        ],
      }),
    },
    {
      slug: "legalitas",
      title: "Legalitas",
      content:
        '<h2>Legalitas Perusahaan</h2><p>PT Kekar Jaya Security beroperasi secara legal dan memiliki seluruh izin yang diperlukan untuk menyediakan layanan keamanan.</p>',
      hero_image_url: null,
      hero_title: null,
      hero_subtitle: null,
      image_url: null,
      sections: JSON.stringify({
        documents: [
          { title: "Akta Pendirian Perusahaan", description: "Nomor: 234/2020, Notaris: Budi Santoso, S.H.", icon: "document-text" },
          { title: "Surat Izin Usaha Jasa Keamanan (SIUJK)", description: "Nomor: SIUJK/2020/1234 — Diterbitkan oleh Kepolisian Republik Indonesia", icon: "shield-check" },
          { title: "SIUP (Surat Izin Usaha Perdagangan)", description: "Nomor: 503/1234/2020", icon: "building" },
          { title: "TDP (Tanda Daftar Perusahaan)", description: "Nomor: 1234567890", icon: "clipboard-list-alt" },
          { title: "NPWP (Nomor Pokok Wajib Pajak)", description: "01.234.567.8-123.000", icon: "identification" },
          { title: "Sertifikat Standar Keamanan SNI", description: "SNI 8509:2018 — Sertifikasi Standar Nasional Indonesia", icon: "badge-check" },
        ],
      }),
    },
    {
      slug: "struktur-organisasi",
      title: "Struktur Organisasi",
      content: "",
      hero_image_url: null,
      hero_title: null,
      hero_subtitle: null,
      image_url: null,
      sections: null,
    },
    {
      slug: "kontak",
      title: "Kontak",
      content:
        '<h2>Hubungi Kami</h2><p>Kami siap melayani Anda kapan saja. Silakan hubungi kami melalui informasi berikut:</p><ul><li><strong>Alamat:</strong> Jl. Keamanan No. 45, Jakarta Selatan 12345</li><li><strong>Telepon:</strong> (021) 555-1234</li><li><strong>Email:</strong> info@kekarjayasecurity.co.id</li><li><strong>Jam Operasional:</strong> Senin - Jumat, 08:00 - 17:00 WIB</li></ul>',
      hero_image_url: null,
      hero_title: null,
      hero_subtitle: null,
      image_url: null,
      sections: null,
    },
  ];

  for (const page of pages) {
    await connection.query(
      `INSERT INTO pages (slug, title, content, hero_image_url, hero_title, hero_subtitle, image_url, sections) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=VALUES(title), content=VALUES(content), hero_image_url=VALUES(hero_image_url), hero_title=VALUES(hero_title), hero_subtitle=VALUES(hero_subtitle), image_url=VALUES(image_url), sections=VALUES(sections)`,
      [page.slug, page.title, page.content, page.hero_image_url, page.hero_title, page.hero_subtitle, page.image_url, page.sections]
    );
  }
  console.log("✓ pages seeded");

  // --- Services (with image_url) ---
  const services = [
    {
      title: "Satpam / Security Guard",
      slug: "satpam-security-guard",
      description: "Layanan satpam profesional untuk menjaga keamanan area Anda",
      icon: "shield",
      image_url: "/images/services/satpam-security-guard.svg",
      content: '<h3>Layanan Satpam / Security Guard</h3><p>Kami menyediakan tenaga satpam terlatih dan bersertifikat untuk berbagai kebutuhan keamanan.</p><h4>Cakupan Layanan</h4><ul><li>Keamanan gedung perkantoran</li><li>Keamanan pabrik dan gudang</li><li>Keamanan perumahan</li><li>Keamanan pusat perbelanjaan</li><li>Keamanan acara</li></ul><h4>Keunggulan</h4><ul><li>Personel terlatih dan bersertifikat</li><li>Pengawasan 24/7</li><li>Pelaporan rutin dan terdokumentasi</li><li>Koordinasi dengan pihak berwajib</li></ul>',
      sort_order: 0,
    },
    {
      title: "Pengamanan VIP",
      slug: "pengamanan-vip",
      description: "Layanan pengamanan khusus untuk VIP dan eksekutif",
      icon: "user-shield",
      image_url: "/images/services/pengamanan-vip.svg",
      content: '<h3>Layanan Pengamanan VIP</h3><p>Tim pengamanan VIP kami terdiri dari personel terlatih khusus untuk memberikan proteksi maksimal.</p><h4>Cakupan Layanan</h4><ul><li>Bodyguard personal</li><li>Pengamanan perjalanan dinas</li><li>Escort keamanan</li><li>Perencanaan rute aman</li></ul>',
      sort_order: 1,
    },
    {
      title: "Keamanan Event",
      slug: "keamanan-event",
      description: "Layanan keamanan untuk acara dan event khusus",
      icon: "calendar-check",
      image_url: "/images/services/keamanan-event.svg",
      content: '<h3>Layanan Keamanan Event</h3><p>Pengamanan menyeluruh untuk berbagai jenis acara dan event.</p><h4>Jenis Acara</h4><ul><li>Konser dan pertunjukan</li><li>Pameran dan pameran dagang</li><li>Konferensi dan seminar</li><li>Acara olahraga</li><li>Pesta pernikahan</li></ul>',
      sort_order: 2,
    },
    {
      title: "Pengamanan Resiko",
      slug: "pengamanan-resiko",
      description: "Analisis dan pengelolaan risiko keamanan untuk bisnis Anda",
      icon: "exclamation-triangle",
      image_url: "/images/services/pengamanan-resiko.svg",
      content: '<h3>Layanan Pengamanan Resiko</h3><p>Kami membantu mengidentifikasi dan mengelola risiko keamanan yang mengancam bisnis Anda.</p><h4>Layanan</h4><ul><li>Assessment risiko keamanan</li><li>Perencanaan mitigasi</li><li>Audit keamanan berkala</li><li>Pelatihan keselamatan</li></ul>',
      sort_order: 3,
    },
    {
      title: "Konsultasi Keamanan",
      slug: "konsultasi-keamanan",
      description: "Konsultasi profesional untuk solusi keamanan terpadu",
      icon: "comments",
      image_url: "/images/services/konsultasi-keamanan.svg",
      content: '<h3>Layanan Konsultasi Keamanan</h3><p>Tim konsultan kami siap membantu merancang solusi keamanan yang tepat dan efektif untuk kebutuhan Anda.</p><h4>Lingkup Konsultasi</h4><ul><li>Perencanaan sistem keamanan</li><li>Evaluasi keamanan existing</li><li>Rekomendasi teknologi keamanan</li><li>Penyusunan SOP keamanan</li></ul>',
      sort_order: 4,
    },
    {
      title: "Keamanan Industrial",
      slug: "keamanan-industrial",
      description: "Solusi keamanan khusus untuk lingkungan industri dan pabrik",
      icon: "industry",
      image_url: "/images/services/keamanan-industrial.svg",
      content: '<h3>Layanan Keamanan Industrial</h3><p>Solusi keamanan terpadu untuk melindungi aset industri dan menjaga keselamatan pekerja.</p><h4>Cakupan</h4><ul><li>Pengamanan pabrik dan gudang</li><li>Kontrol akses area terbatas</li><li>Patroli perimeter</li><li>Prosedur darurat dan evakuasi</li></ul>',
      sort_order: 5,
    },
  ];

  for (const svc of services) {
    await connection.query(
      `INSERT INTO services (title, slug, description, icon, image_url, content, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description), icon=VALUES(icon), image_url=VALUES(image_url), content=VALUES(content), sort_order=VALUES(sort_order)`,
      [svc.title, svc.slug, svc.description, svc.icon, svc.image_url, svc.content, svc.sort_order]
    );
  }
  console.log("✓ services seeded");

  // --- Clients ---
  const clients = [
    { name: "PT Maju Jaya Sejahtera", logo_url: "/images/clients/client-1.svg", website_url: "https://majujaya.co.id", sort_order: 0, is_active: true },
    { name: "PT Sentosa Abadi Group", logo_url: "/images/clients/client-2.svg", website_url: "https://sentosaabadi.com", sort_order: 1, is_active: true },
    { name: "PT Global Indah Perkasa", logo_url: "/images/clients/client-3.svg", website_url: "https://globalindah.id", sort_order: 2, is_active: true },
    { name: "PT Karya Bersama Nusantara", logo_url: "/images/clients/client-4.svg", website_url: "", sort_order: 3, is_active: true },
    { name: "PT Prima Solusi Teknologi", logo_url: "/images/clients/client-5.svg", website_url: "https://primasolusiTech.id", sort_order: 4, is_active: true },
    { name: "PT Harmoni Mitra Utama", logo_url: "/images/clients/client-6.svg", website_url: "", sort_order: 5, is_active: true },
    { name: "PT Bintang Mandiri Property", logo_url: "/images/clients/client-7.svg", website_url: "https://bintangmandiri.co.id", sort_order: 6, is_active: true },
    { name: "PT Cipta Karya Bangun", logo_url: "/images/clients/client-8.svg", website_url: "https://ciptakarya.id", sort_order: 7, is_active: true },
  ];

  for (const client of clients) {
    await connection.query(
      `INSERT INTO clients (name, logo_url, website_url, sort_order, is_active) VALUES (?, ?, ?, ?, ?)`,
      [client.name, client.logo_url, client.website_url, client.sort_order, client.is_active]
    );
  }
  console.log("✓ clients seeded");

  // --- Blog Categories ---
  const blogCategories = [
    { name: "Tips Keamanan", slug: "tips-keamanan" },
    { name: "Berita Perusahaan", slug: "berita-perusahaan" },
    { name: "Regulasi", slug: "regulasi" },
    { name: "Pelatihan", slug: "pelatihan" },
  ];

  for (const cat of blogCategories) {
    await connection.query(
      `INSERT IGNORE INTO blog_categories (name, slug) VALUES (?, ?)`,
      [cat.name, cat.slug]
    );
  }
  console.log("✓ blog_categories seeded");

  // --- Blog Posts ---
  const blogPosts = [
    {
      title: "5 Tips Meningkatkan Keamanan Rumah Anda",
      slug: "5-tips-meningkatkan-keamanan-rumah",
      content: '<p>Keamanan rumah adalah prioritas utama bagi setiap keluarga. Berikut adalah 5 tips yang bisa Anda terapkan untuk meningkatkan keamanan rumah Anda:</p><h3>1. Pasang Sistem Keamanan</h3><p>Investasikan pada sistem keamanan yang lengkap meliputi CCTV, alarm, dan sensor gerak.</p><h3>2. Perkuat Pintu dan Jendela</h3><p>Pastikan pintu dan jendela menggunakan kunci berkualitas tinggi dan bahan yang kokoh.</p><h3>3. Pencahayaan yang Memadai</h3><p>Area yang terang akan mengurangi risiko pencurian. Pasang lampu sensor di area exterior.</p><h3>4. Kenali Tetangga Anda</h3><p>Hubungan baik dengan tetangga menciptakan pengawasan komunitas yang efektif.</p><h3>5. Gunakan Jasa Security Profesional</h3><p>Untuk perumahan atau area yang membutuhkan, jasa security profesional memberikan perlindungan 24/7.</p>',
      excerpt: "Pelajari 5 tips praktis untuk meningkatkan keamanan rumah Anda dari ancaman pencurian dan kejahatan.",
      thumbnail: "/images/blog/keamanan-rumah.svg",
      categoryId: 1,
      status: "published",
    },
    {
      title: "PT Kekar Jaya Security Meraih Sertifikasi ISO 9001",
      slug: "kekar-jaya-security-sertifikasi-iso-9001",
      content: '<p>Kami dengan bangga mengumumkan bahwa PT Kekar Jaya Security telah berhasil meraih sertifikasi ISO 9001:2015 untuk Sistem Manajemen Mutu.</p><p>Sertifikasi ini merupakan bukti komitmen kami dalam memberikan layanan keamanan dengan standar kualitas internasional.</p>',
      excerpt: "PT Kekar Jaya Security berhasil meraih sertifikasi ISO 9001:2015 sebagai bukti komitmen terhadap kualitas layanan.",
      thumbnail: "/images/blog/iso-9001.svg",
      categoryId: 2,
      status: "published",
    },
    {
      title: "Peraturan Baru tentang Jasa Keamanan 2024",
      slug: "peraturan-baru-jasa-keamanan-2024",
      content: '<p>Pemerintah telah mengeluarkan peraturan baru terkait industri jasa keamanan yang akan berlaku mulai tahun 2024.</p><p>Regulasi ini bertujuan untuk meningkatkan standar profesionalisme dan keselamatan dalam industri keamanan.</p><h3>Poin Penting Regulasi Baru</h3><ul><li>Wajib sertifikasi untuk seluruh personel keamanan</li><li>Standar pelatihan minimum yang lebih tinggi</li><li>Peningkatan transparasi dalam pelaporan insiden</li><li>Persyaratan asuransi yang lebih ketat</li></ul>',
      excerpt: "Ketahui peraturan baru tentang jasa keamanan yang berlaku mulai 2024 dan dampaknya bagi industri.",
      thumbnail: "/images/blog/regulasi-2024.svg",
      categoryId: 3,
      status: "published",
    },
    {
      title: "Program Pelatihan Security Guard Tingkat Lanjut",
      slug: "pelatihan-security-guard-tingkat-lanjut",
      content: '<p>PT Kekar Jaya Security meluncurkan program pelatihan tingkat lanjut untuk seluruh security guard yang bertujuan meningkatkan kompetensi dan kesiapsiagaan.</p><p>Program pelatihan ini mencakup teknik pertolongan pertama, penanganan situasi darurat, komunikasi krisis, dan penggunaan teknologi keamanan terkini.</p>',
      excerpt: "Program pelatihan tingkat lanjut untuk meningkatkan kompetensi security guard kami.",
      thumbnail: "/images/blog/pelatihan.svg",
      categoryId: 4,
      status: "draft",
    },
    {
      title: "Pentingnya Petugas Keamanan di Lingkungan Perkantoran",
      slug: "pentingnya-petugas-keamanan-perkantoran",
      content: '<p>Keberadaan petugas keamanan di lingkungan perkantoran bukan sekadar formalitas, melainkan kebutuhan mendasar untuk menjaga keselamatan dan ketertiban.</p><p>Petugas keamanan yang terlatih mampu memberikan rasa aman bagi seluruh penghuni gedung, mengelola akses masuk, serta merespons situasi darurat dengan cepat dan tepat.</p>',
      excerpt: "Mengapa keberadaan petugas keamanan profesional sangat penting di lingkungan perkantoran?",
      thumbnail: "/images/blog/keamanan-perkantoran.svg",
      categoryId: 1,
      status: "published",
    },
  ];

  for (const post of blogPosts) {
    await connection.query(
      `INSERT IGNORE INTO blog_posts (title, slug, content, excerpt, thumbnail, category_id, status, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        post.title,
        post.slug,
        post.content,
        post.excerpt,
        post.thumbnail,
        post.categoryId,
        post.status,
        post.status === "published" ? new Date() : null,
      ]
    );
  }
  console.log("✓ blog_posts seeded");

  // --- Gallery Categories ---
  const galleryCategories = [
    { name: "Kegiatan Operasional", slug: "kegiatan-operasional" },
    { name: "Pelatihan", slug: "pelatihan" },
    { name: "Event", slug: "event" },
    { name: "Kantor & Fasilitas", slug: "kantor-fasilitas" },
  ];

  for (const cat of galleryCategories) {
    await connection.query(
      `INSERT IGNORE INTO gallery_categories (name, slug) VALUES (?, ?)`,
      [cat.name, cat.slug]
    );
  }
  console.log("✓ gallery_categories seeded");

  // --- Gallery Photos (using SVG placeholders) ---
  const galleryPhotos = [
    { title: "Patroli Malam di Perumahan", filename: "/images/gallery/patroli-malam.svg", categoryId: 1, sort_order: 0 },
    { title: "Security Guard di Gedung Perkantoran", filename: "/images/gallery/guard-perkantoran.svg", categoryId: 1, sort_order: 1 },
    { title: "Pengamanan Area Parkir", filename: "/images/gallery/area-parkir.svg", categoryId: 1, sort_order: 2 },
    { title: "Pelatihan Bela Diri", filename: "/images/gallery/pelatihan-bela-diri.svg", categoryId: 2, sort_order: 0 },
    { title: "Simulasi Penanganan Darurat", filename: "/images/gallery/simulasi-darurat.svg", categoryId: 2, sort_order: 1 },
    { title: "Pelatihan Pertolongan Pertama", filename: "/images/gallery/pertolongan-pertama.svg", categoryId: 2, sort_order: 2 },
    { title: "Pengamanan Konser Musik", filename: "/images/gallery/konser-musik.svg", categoryId: 3, sort_order: 0 },
    { title: "Security Event Olahraga", filename: "/images/gallery/event-olahraga.svg", categoryId: 3, sort_order: 1 },
    { title: "Ruang Kontrol CCTV", filename: "/images/gallery/ruang-kontrol.svg", categoryId: 4, sort_order: 0 },
    { title: "Kantor Pusat PT Kekar Jaya Security", filename: "/images/gallery/kantor-pusat.svg", categoryId: 4, sort_order: 1 },
  ];

  for (const photo of galleryPhotos) {
    await connection.query(
      `INSERT INTO gallery_photos (title, filename, category_id, sort_order) VALUES (?, ?, ?, ?)`,
      [photo.title, photo.filename, photo.categoryId, photo.sort_order]
    );
  }
  console.log("✓ gallery_photos seeded");

  // --- FAQ ---
  const faqs = [
    { question: "Apa saja layanan keamanan yang disediakan PT Kekar Jaya Security?", answer: "Kami menyediakan berbagai layanan keamanan termasuk satpam/security guard, pengamanan VIP, keamanan event, pengamanan resiko, konsultasi keamanan, dan keamanan industrial.", sort_order: 0 },
    { question: "Apakah personel keamanan sudah terlatih dan bersertifikat?", answer: "Ya, seluruh personel kami telah menjalani pelatihan intensif dan memiliki sertifikasi resmi dari lembaga keamanan yang berwenang. Kami juga melakukan pelatihan berkala untuk menjaga kompetensi.", sort_order: 1 },
    { question: "Bagaimana cara menghubungi PT Kekar Jaya Security?", answer: "Anda dapat menghubungi kami melalui halaman Kontak di website ini, menelepon langsung di (021) 555-1234, atau mengirim email ke info@kekarjayasecurity.co.id. Tim kami siap melayani Anda.", sort_order: 2 },
    { question: "Apakah tersedia layanan keamanan 24 jam?", answer: "Ya, kami menyediakan layanan keamanan 24 jam penuh, 7 hari seminggu sesuai kebutuhan klien. Tim kami selalu siaga untuk memberikan perlindungan kapan saja.", sort_order: 3 },
    { question: "Berapa lama proses penempatan personel keamanan?", answer: "Proses penempatan personel keamanan biasanya membutuhkan waktu 3-7 hari kerja, tergantung jumlah personel yang dibutuhkan dan spesifikasi tugas. Untuk kebutuhan mendesak, kami dapat mempercepat proses ini.", sort_order: 4 },
    { question: "Apakah bisa meminta personel keamanan khusus untuk event tertentu?", answer: "Tentu saja. Kami menyediakan layanan keamanan event yang dapat disesuaikan dengan skala dan jenis acara Anda, mulai dari acara kecil hingga event besar dengan ribuan peserta.", sort_order: 5 },
    { question: "Bagaimana sistem pelaporan insiden dilakukan?", answer: "Kami menerapkan sistem pelaporan insiden yang terstruktur dan terdokumentasi. Setiap insiden dicatat, dianalisis, dan dilaporkan kepada klien secara berkala untuk memastikan transparansi dan perbaikan berkelanjutan.", sort_order: 6 },
  ];

  for (const faq of faqs) {
    await connection.query(
      `INSERT INTO faq (question, answer, sort_order) VALUES (?, ?, ?)`,
      [faq.question, faq.answer, faq.sort_order]
    );
  }
  console.log("✓ faq seeded");

  // --- Organization Members (with SVG portraits) ---
  const orgMembers = [
    { name: "Ir. Budi Hartono", position: "Direktur Utama", photo: "/images/team/budi-hartono.svg", sort_order: 0 },
    { name: "Dra. Siti Rahayu", position: "Wakil Direktur", photo: "/images/team/siti-rahayu.svg", sort_order: 1 },
    { name: "Agus Prasetyo, S.T.", position: "Kepala Divisi Operasional", photo: "/images/team/agus-prasetyo.svg", sort_order: 2 },
    { name: "Rina Wulandari, S.Psi.", position: "Kepala Divisi SDM & Pelatihan", photo: "/images/team/rina-wulandari.svg", sort_order: 3 },
    { name: "Hendra Wijaya", position: "Kepala Divisi Keuangan", photo: "/images/team/hendra-wijaya.svg", sort_order: 4 },
    { name: "Dewi Permata, S.Kom.", position: "Kepala Divisi Teknologi & Sistem", photo: "/images/team/dewi-permata.svg", sort_order: 5 },
  ];

  for (const member of orgMembers) {
    await connection.query(
      `INSERT INTO organization_members (name, position, photo, sort_order) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE photo=VALUES(photo), position=VALUES(position)`,
      [member.name, member.position, member.photo, member.sort_order]
    );
  }
  console.log("✓ organization_members seeded");

  // --- Contact Messages ---
  const contactMessages = [
    { name: "Ahmad Fauzi", email: "ahmad.fauzi@email.com", subject: "Penawaran Jasa Security untuk Perumahan", message: "Selamat pagi, saya mewakili pengelola Perumahan Griya Asri. Kami tertarik untuk menggunakan jasa security untuk perumahan kami. Mohon informasi lebih lanjut mengenai paket dan harga. Terima kasih.", is_read: true },
    { name: "Linda Susanto", email: "linda.s@company.co.id", subject: "Konsultasi Keamanan Gedung Perkantoran", message: "Halo, kami memiliki gedung perkantoran 12 lantai di Jakarta Selatan dan membutuhkan konsultasi mengenai sistem keamanan yang tepat. Apakah bisa dijadwalkan meeting untuk konsultasi? Terima kasih.", is_read: true },
    { name: "Rudi Hermawan", email: "rudi.h@gmail.com", subject: "Pertanyaan tentang Layanan VIP Protection", message: "Selamat siang, saya ingin menanyakan tentang layanan VIP protection untuk acara pernikahan. Berapa estimasi biaya dan berapa personel yang akan ditempatkan? Mohon info detailnya. Terima kasih.", is_read: false },
    { name: "PT Maju Bersama", email: "info@majubersama.co.id", subject: "Permintaan Penawaran Keamanan Pabrik", message: "Kepada Yth. PT Kekar Jaya Security, Kami dari PT Maju Bersama, memiliki pabrik di kawasan industri Cikarang. Saat ini kami membutuhkan jasa keamanan 24 jam untuk pabrik dan gudang kami. Mohon kirimkan penawaran terbaik. Hormat kami, Tim Procurement PT Maju Bersama.", is_read: false },
    { name: "Diana Putri", email: "diana.putri@email.com", subject: "Karir di PT Kekar Jaya Security", message: "Halo, saya lulusan S1 Ilmu Kepolisian dan tertarik untuk bergabung sebagai security professional di perusahaan Bapak/Ibu. Apakah ada lowongan yang tersedia saat ini? Mohon informasinya. Terima kasih.", is_read: false },
  ];

  for (const msg of contactMessages) {
    await connection.query(
      `INSERT INTO contact_messages (name, email, subject, message, is_read) VALUES (?, ?, ?, ?, ?)`,
      [msg.name, msg.email, msg.subject, msg.message, msg.is_read]
    );
  }
  console.log("✓ contact_messages seeded");

  console.log("\n🎉 Semua data seed berhasil dimasukkan!");
  await connection.end();
}

seed().catch((err) => {
  console.error("Seed gagal:", err);
  process.exit(1);
});