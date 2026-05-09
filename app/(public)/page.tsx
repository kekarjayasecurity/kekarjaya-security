import Link from "next/link";
import { query } from "@/lib/db";
import type { Service, Page } from "@/types";

async function getHomeData() {
  try {
    const services = await query<Service>(
      "SELECT * FROM services ORDER BY sort_order LIMIT 4"
    );
    const page = await query<Page>(
      "SELECT * FROM pages WHERE slug = 'beranda'"
    );
    return { services: Array.isArray(services) ? services : [], page: Array.isArray(page) ? page[0] : null };
  } catch {
    return { services: [], page: null };
  }
}

export default async function BerandaPage() {
  const { services, page } = await getHomeData();

  return (
    <>
      <section className="bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Solusi Keamanan Profesional & Terpercaya
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              PT Kekar Jaya Security menyediakan layanan keamanan terpadu untuk
              melindungi aset dan keselamatan Anda dengan tenaga terlatih dan
              bersertifikat.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/kontak"
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Hubungi Kami
              </Link>
              <Link
                href="/layanan"
                className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Lihat Layanan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-700 mb-4">
              Layanan Kami
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami menyediakan berbagai layanan keamanan yang disesuaikan dengan
              kebutuhan Anda
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-primary-700 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
                <Link
                  href={`/layanan/${service.slug}`}
                  className="text-accent-500 text-sm font-medium mt-4 inline-block hover:text-accent-600"
                >
                  Selengkapnya &rarr;
                </Link>
              </div>
            ))}
          </div>
          {services.length > 0 && (
            <div className="text-center mt-8">
              <Link
                href="/layanan"
                className="text-accent-500 font-medium hover:text-accent-600"
              >
                Lihat semua layanan &rarr;
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary-700 mb-6">
                Mengapa Memilih Kami?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-700">Personel Terlatih</h3>
                    <p className="text-gray-600 text-sm">Seluruh personel kami telah menjalani pelatihan intensif dan bersertifikat</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-700">Layanan 24 Jam</h3>
                    <p className="text-gray-600 text-sm">Kami siap melayani kebutuhan keamanan Anda 24 jam sehari, 7 hari seminggu</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-700">Berizin Resmi</h3>
                    <p className="text-gray-600 text-sm">Beroperasi secara legal dengan izin resmi dari pihak berwenang</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary-700 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Butuh Konsultasi?</h3>
              <p className="text-gray-200 mb-6">
                Hubungi tim kami untuk konsultasi gratis mengenai kebutuhan
                keamanan Anda.
              </p>
              <Link
                href="/kontak"
                className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
              >
                Hubungi Kami Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
