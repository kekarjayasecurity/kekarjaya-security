import { queryOne } from "@/lib/db";
import type { Page } from "@/types";

async function getPage() {
  try {
    return await queryOne<Page>("SELECT * FROM pages WHERE slug = 'tentang-kami'");
  } catch {
    return null;
  }
}

export default async function TentangKamiPage() {
  const page = await getPage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-primary-700 mb-8">Tentang Kami</h1>
      {page?.content ? (
        <div
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      ) : (
        <div className="prose max-w-none text-gray-700">
          <h2>Tentang PT Kekar Jaya Security</h2>
          <p>
            PT Kekar Jaya Security adalah perusahaan jasa keamanan yang berdiri
            dengan visi menjadi penyedia layanan keamanan terdepan di Indonesia.
          </p>
          <h3>Visi</h3>
          <p>
            Menjadi perusahaan jasa keamanan terpercaya dan profesional yang
            menjadi pilihan utama di Indonesia.
          </p>
          <h3>Misi</h3>
          <ul>
            <li>Menyediakan tenaga keamanan terlatih dan profesional</li>
            <li>Mengutamakan kualitas layanan dan kepuasan pelanggan</li>
            <li>Menerapkan standar keamanan nasional dan internasional</li>
            <li>Mengembangkan SDM secara berkelanjutan</li>
          </ul>
        </div>
      )}
    </div>
  );
}
