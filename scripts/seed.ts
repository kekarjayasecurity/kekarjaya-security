import "dotenv/config";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import * as path from "path";

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "kekarjaya_security",
    multipleStatements: true,
  });

  const passwordHash = await bcrypt.hash("admin123", 10);

  await connection.query(
    `INSERT IGNORE INTO admin_users (username, password_hash) VALUES (?, ?)`,
    ["admin", passwordHash]
  );

  const pages = [
    {
      slug: "beranda",
      title: "Beranda",
      content:
        '<h2>Selamat Datang di PT Kekar Jaya Security</h2><p>Kami menyediakan layanan keamanan profesional dan terpercaya untuk melindungi aset dan keselamatan Anda.</p>',
    },
    {
      slug: "tentang-kami",
      title: "Tentang Kami",
      content:
        '<h2>Tentang PT Kekar Jaya Security</h2><p>PT Kekar Jaya Security adalah perusahaan jasa keamanan yang berdiri dengan visi menjadi penyedia layanan keamanan terdepan di Indonesia.</p><h3>Visi</h3><p>Menjadi perusahaan jasa keamanan terpercaya dan profesional yang menjadi pilihan utama di Indonesia.</p><h3>Misi</h3><ul><li>Menyediakan tenaga keamanan terlatih dan profesional</li><li>Mengutamakan kualitas layanan dan kepuasan pelanggan</li><li>Menerapkan standar keamanan nasional dan internasional</li><li>Mengembangkan SDM secara berkelanjutan</li></ul><h3>Nilai-Nilai Perusahaan</h3><ul><li><strong>Integritas</strong> - Jujur dan bertanggung jawab dalam setiap tindakan</li><li><strong>Profesionalisme</strong> - Memberikan layanan terbaik dengan standar tinggi</li><li><strong>Kepercayaan</strong> - Membangun hubungan yang terpercaya dengan klien</li><li><strong>Disiplin</strong> - Konsisten dan tepat waktu dalam setiap penugasan</li></ul>',
    },
    {
      slug: "legalitas",
      title: "Legalitas",
      content:
        '<h2>Legalitas Perusahaan</h2><p>PT Kekar Jaya Security beroperasi secara legal dan memiliki seluruh izin yang diperlukan untuk menyediakan layanan keamanan.</p><h3>Dokumen Legalitas</h3><ul><li><strong>Akta Pendirian Perusahaan</strong> - Nomor: XXX, Notaris: XXX</li><li><strong>Surat Izin Usaha Jasa Keamanan (SIUJK)</strong> - Diterbitkan oleh Kepolisian Republik Indonesia</li><li><strong>SIUP (Surat Izin Usaha Perdagangan)</strong></li><li><strong>TDP (Tanda Daftar Perusahaan)</strong></li><li><strong>NPWP (Nomor Pokok Wajib Pajak)</strong></li><li><strong>Sertifikat Standar Keamanan</strong></li></ul>',
    },
  ];

  for (const page of pages) {
    await connection.query(
      `INSERT IGNORE INTO pages (slug, title, content) VALUES (?, ?, ?)`,
      [page.slug, page.title, page.content]
    );
  }

  const services = [
    {
      title: "Satpam / Security Guard",
      slug: "satpam-security-guard",
      description: "Layanan satpam profesional untuk menjaga keamanan area Anda",
      icon: "shield",
      content:
        '<h3>Layanan Satpam / Security Guard</h3><p>Kami menyediakan tenaga satpam terlatih dan bersertifikat untuk berbagai kebutuhan keamanan.</p><h4>Cakupan Layanan</h4><ul><li>Keamanan gedung perkantoran</li><li>Keamanan pabrik dan gudang</li><li>Keamanan perumahan</li><li>Keamanan pusat perbelanjaan</li><li>Keamanan acara</li></ul>',
    },
    {
      title: "Pengamanan VIP",
      slug: "pengamanan-vip",
      description: "Layanan pengamanan khusus untuk VIP dan eksekutif",
      icon: "user-shield",
      content:
        '<h3>Layanan Pengamanan VIP</h3><p>Tim pengamanan VIP kami terdiri dari personel terlatih khusus untuk memberikan proteksi maksimal.</p>',
    },
    {
      title: "Keamanan Event",
      slug: "keamanan-event",
      description: "Layanan keamanan untuk acara dan event khusus",
      icon: "calendar-check",
      content:
        '<h3>Layanan Keamanan Event</h3><p>Pengamanan menyeluruh untuk berbagai jenis acara dan event.</p>',
    },
  ];

  for (const svc of services) {
    await connection.query(
      `INSERT IGNORE INTO services (title, slug, description, icon, content, sort_order) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        svc.title,
        svc.slug,
        svc.description,
        svc.icon,
        svc.content,
        services.indexOf(svc),
      ]
    );
  }

  const faqs = [
    {
      question: "Apa saja layanan keamanan yang disediakan PT Kekar Jaya Security?",
      answer:
        "Kami menyediakan berbagai layanan keamanan termasuk satpam/security guard, pengamanan VIP, keamanan event, pengamanan resiko, dan konsultasi keamanan.",
    },
    {
      question: "Apakah personel keamanan sudah terlatih dan bersertifikat?",
      answer:
        "Ya, seluruh personel kami telah menjalani pelatihan intensif dan memiliki sertifikasi resmi dari lembaga keamanan yang berwenang.",
    },
    {
      question: "Bagaimana cara menghubungi PT Kekar Jaya Security?",
      answer:
        "Anda dapat menghubungi kami melalui halaman Kontak di website ini, menelepon langsung, atau mengirim email. Tim kami siap melayani Anda.",
    },
    {
      question: "Apakah tersedia layanan keamanan 24 jam?",
      answer:
        "Ya, kami menyediakan layanan keamanan 24 jam penuh, 7 hari seminggu sesuai kebutuhan klien.",
    },
  ];

  for (const faq of faqs) {
    await connection.query(
      `INSERT INTO faq (question, answer, sort_order) VALUES (?, ?, ?)`,
      [faq.question, faq.answer, faqs.indexOf(faq)]
    );
  }

  console.log("Seed data berhasil dimasukkan!");
  await connection.end();
}

seed().catch((err) => {
  console.error("Seed gagal:", err);
  process.exit(1);
});
