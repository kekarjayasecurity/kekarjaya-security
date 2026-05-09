import { queryOne } from "@/lib/db";
import type { Page } from "@/types";

async function getPage() {
  try {
    return await queryOne<Page>("SELECT * FROM pages WHERE slug = 'legalitas'");
  } catch {
    return null;
  }
}

export default async function LegalitasPage() {
  const page = await getPage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-primary-700 mb-8">Legalitas</h1>
      <p className="text-gray-600 mb-8">
        PT Kekar Jaya Security beroperasi secara legal dan memiliki seluruh izin
        yang diperlukan.
      </p>
      {page?.content ? (
        <div
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      ) : (
        <div className="prose max-w-none text-gray-700">
          <h3>Dokumen Legalitas</h3>
          <ul>
            <li><strong>Akta Pendirian Perusahaan</strong></li>
            <li><strong>Surat Izin Usaha Jasa Keamanan (SIUJK)</strong> - Diterbitkan oleh Kepolisian Republik Indonesia</li>
            <li><strong>SIUP (Surat Izin Usaha Perdagangan)</strong></li>
            <li><strong>TDP (Tanda Daftar Perusahaan)</strong></li>
            <li><strong>NPWP (Nomor Pokok Wajib Pajak)</strong></li>
          </ul>
        </div>
      )}
    </div>
  );
}
