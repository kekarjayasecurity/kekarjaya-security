import { notFound } from "next/navigation";
import Link from "next/link";
import { queryOne } from "@/lib/db";
import type { Service } from "@/types";

async function getService(slug: string) {
  try {
    return await queryOne<Service>("SELECT * FROM services WHERE slug = ?", [slug]);
  } catch {
    return null;
  }
}

export default async function LayananDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/layanan"
        className="text-accent-500 hover:text-accent-600 text-sm mb-4 inline-block"
      >
        &larr; Kembali ke Layanan
      </Link>
      <h1 className="text-4xl font-bold text-primary-700 mb-4">
        {service.title}
      </h1>
      <p className="text-gray-600 mb-8">{service.description}</p>

      {service.content ? (
        <div
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: service.content }}
        />
      ) : (
        <p className="text-gray-500">Detail layanan belum tersedia.</p>
      )}

      <div className="mt-12 p-8 bg-primary-50 rounded-lg text-center">
        <h3 className="text-xl font-bold text-primary-700 mb-4">
          Tertarik dengan layanan ini?
        </h3>
        <Link
          href="/kontak"
          className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block"
        >
          Hubungi Kami
        </Link>
      </div>
    </div>
  );
}
