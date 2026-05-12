import { queryOne } from "@/lib/db";
import { getImageUrl } from "@/lib/image-url";
import type { Page } from "@/types";

export const revalidate = 3600;

async function getOrgPage() {
  try {
    return await queryOne<Page>("SELECT * FROM pages WHERE slug = 'struktur-organisasi'");
  } catch {
    return null;
  }
}

export default async function StrukturOrganisasiPage() {
  const page = await getOrgPage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-primary-700 mb-4">
        Struktur Organisasi
      </h1>
      <p className="text-gray-600 mb-12">
        Struktur organisasi PT Kekar Jaya Security.
      </p>

      {page?.content ? (
        <div className="flex justify-center">
          <img
            src={getImageUrl(page.content)}
            alt="Struktur Organisasi PT Kekar Jaya Security"
            className="max-w-full h-auto rounded-lg shadow-md"
          />
        </div>
      ) : (
        <p className="text-gray-500 text-center py-12">
          Gambar struktur organisasi belum tersedia.
        </p>
      )}
    </div>
  );
}
