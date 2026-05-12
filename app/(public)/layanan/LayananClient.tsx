"use client";

import Link from "next/link";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { getServiceIconPath } from "@/lib/icons";
import { getImageUrl } from "@/lib/image-url";
import type { Service } from "@/types";

interface LayananClientProps {
  services: Service[];
}

export default function LayananClient({ services }: LayananClientProps) {
  const list = Array.isArray(services) ? services : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <AnimatedSection variant="fadeInUp">
        <h1 className="text-4xl font-bold text-primary-700 mb-4">Layanan Kami</h1>
        <p className="text-gray-600 mb-12 max-w-2xl">
          Kami menyediakan berbagai layanan keamanan profesional yang disesuaikan
          dengan kebutuhan Anda.
        </p>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
        {list.map((service) => (
          <StaggerItem key={service.id}>
            <Link
              href={`/layanan/${service.slug}`}
              className="block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {service.image_url ? (
                <div className="w-full h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={getImageUrl(service.image_url)}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-50 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-primary-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={getServiceIconPath(service.icon)}
                      />
                    </svg>
                  </div>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary-700 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
                <span className="text-accent-500 text-sm font-medium mt-4 inline-block">
                  Selengkapnya &rarr;
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {list.length === 0 && (
        <p className="text-gray-500 text-center py-12">
          Belum ada layanan yang tersedia.
        </p>
      )}
    </div>
  );
}