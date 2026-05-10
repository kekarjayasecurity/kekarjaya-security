import { notFound } from "next/navigation";
import Link from "next/link";
import { queryOne } from "@/lib/db";
import type { Service } from "@/types";
import AnimatedSection from "@/components/ui/AnimatedSection";

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
    <>
      {/* Hero Banner */}
      <section className="relative bg-primary-700 text-white overflow-hidden">
        {service.image_url ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/uploads/${service.image_url.replace(/^\/uploads\//, "")})` }}
          />
        ) : null}
        <div className="absolute inset-0 bg-primary-700/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Link
            href="/layanan"
            className="text-white/70 hover:text-white text-sm mb-4 inline-block transition-colors"
          >
            &larr; Kembali ke Layanan
          </Link>
          <AnimatedSection variant="fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-xl text-gray-200 max-w-2xl">{service.description}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {service.content ? (
          <AnimatedSection variant="fadeInUp" delay={0.2}>
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          </AnimatedSection>
        ) : (
          <p className="text-gray-500">Detail layanan belum tersedia.</p>
        )}

        <AnimatedSection variant="fadeInUp" delay={0.3}>
          <div className="mt-12 p-8 bg-primary-50 rounded-lg text-center">
            <h3 className="text-xl font-bold text-primary-700 mb-4">
              Tertarik dengan layanan ini?
            </h3>
            <p className="text-gray-600 mb-6">Hubungi kami untuk konsultasi gratis dan penawaran terbaik.</p>
            <Link
              href="/kontak"
              className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Hubungi Kami
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
}