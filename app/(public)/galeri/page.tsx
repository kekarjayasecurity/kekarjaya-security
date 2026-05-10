import { query } from "@/lib/db";
import type { GalleryPhoto, GalleryCategory } from "@/types";

export const revalidate = 3600;
import GaleriClient from "./GaleriClient";
import AnimatedSection from "@/components/ui/AnimatedSection";

async function getPhotos(page: number, categoryId?: number) {
  const limit = 12;
  const offset = (page - 1) * limit;

  let where = "";
  const params: unknown[] = [];

  if (categoryId) {
    where = "WHERE gp.category_id = ?";
    params.push(categoryId);
  }

  const photos = await query<GalleryPhoto & { category_name: string }>(
    `SELECT gp.*, gc.name as category_name 
     FROM gallery_photos gp 
     LEFT JOIN gallery_categories gc ON gp.category_id = gc.id 
     ${where} 
     ORDER BY gp.sort_order, gp.created_at DESC 
     LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  return Array.isArray(photos) ? photos : [];
}

async function getCategories() {
  try {
    return await query<GalleryCategory>("SELECT * FROM gallery_categories ORDER BY name");
  } catch {
    return [];
  }
}

export default async function GaleriPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; kategori?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const categoryId = params.kategori ? Number(params.kategori) : undefined;
  const photos = await getPhotos(page, categoryId);
  const categories = await getCategories();
  const catList = Array.isArray(categories) ? categories : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <AnimatedSection variant="fadeInUp">
        <h1 className="text-4xl font-bold text-primary-700 mb-4">Galeri</h1>
        <p className="text-gray-600 mb-8">
          Dokumentasi kegiatan dan operasional PT Kekar Jaya Security.
        </p>
      </AnimatedSection>

      <AnimatedSection variant="fadeInUp" delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-8">
          <a
            href="/galeri"
            className={`px-4 py-2 rounded-lg text-sm ${
              !categoryId ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Semua
          </a>
          {catList.map((cat) => (
            <a
              key={cat.id}
              href={`/galeri?kategori=${cat.id}`}
              className={`px-4 py-2 rounded-lg text-sm ${
                categoryId === cat.id ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </a>
          ))}
        </div>
      </AnimatedSection>

      <GaleriClient photos={photos} />
    </div>
  );
}