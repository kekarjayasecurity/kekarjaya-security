import Link from "next/link";
import { query } from "@/lib/db";
import type { Service } from "@/types";

async function getServices() {
  try {
    return await query<Service>("SELECT * FROM services ORDER BY sort_order");
  } catch {
    return [];
  }
}

export default async function LayananPage() {
  const services = await getServices();
  const list = Array.isArray(services) ? services : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-primary-700 mb-4">Layanan Kami</h1>
      <p className="text-gray-600 mb-12 max-w-2xl">
        Kami menyediakan berbagai layanan keamanan profesional yang disesuaikan
        dengan kebutuhan Anda.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((service) => (
          <Link
            key={service.id}
            href={`/layanan/${service.slug}`}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow"
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
            <span className="text-accent-500 text-sm font-medium mt-4 inline-block">
              Selengkapnya &rarr;
            </span>
          </Link>
        ))}
      </div>

      {list.length === 0 && (
        <p className="text-gray-500 text-center py-12">
          Belum ada layanan yang tersedia.
        </p>
      )}
    </div>
  );
}
