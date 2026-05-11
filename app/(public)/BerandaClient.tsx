"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { getServiceIconPath, getIconPath } from "@/lib/icons";
import type { Service, Page, Client } from "@/types";

interface BerandaClientProps {
  services: Service[];
  page: Page | null;
  clients: Client[];
}

interface WhyChooseUsItem {
  title: string;
  description: string;
}

const defaultWhyChooseUs: WhyChooseUsItem[] = [
  { title: "Personel Terlatih", description: "Seluruh personel kami telah menjalani pelatihan intensif dan bersertifikat" },
  { title: "Layanan 24 Jam", description: "Kami siap melayani kebutuhan keamanan Anda 24 jam sehari, 7 hari seminggu" },
  { title: "Berizin Resmi", description: "Beroperasi secara legal dengan izin resmi dari pihak berwenang" },
];

export default function BerandaClient({ services, page, clients }: BerandaClientProps) {
  const heroImage = page?.hero_image_url || null;
  const heroContent =
    page?.content ||
    "<h1>Solusi Keamanan Profesional &amp; Terpercaya</h1><p>PT Kekar Jaya Security menyediakan layanan keamanan terpadu untuk melindungi aset dan keselamatan Anda dengan tenaga terlatih dan bersertifikat.</p>";

  const whyChooseUs = (page?.sections?.why_choose_us as WhyChooseUsItem[] | undefined)?.length
    ? (page!.sections!.why_choose_us as WhyChooseUsItem[])
    : defaultWhyChooseUs;

  return (
    <>
      <section className="relative bg-primary-700 text-white overflow-hidden">
        {heroImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/api/uploads/${heroImage.replace(/^\/uploads\//, "")})` }}
          />
        ) : null}
        <div className="absolute inset-0 bg-primary-700/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <motion.div
              className="text-white mb-8 [&_h2]:text-4xl [&_h2]:md:text-5xl [&_h2]:font-bold [&_h2]:mb-6 [&_h3]:text-3xl [&_h3]:md:text-4xl [&_h3]:font-bold [&_h3]:mb-6 [&_p]:text-md [&_p]:text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              dangerouslySetInnerHTML={{ __html: heroContent }}
            />
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeInUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-700 mb-4">
                Layanan Kami
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kami menyediakan berbagai layanan keamanan yang disesuaikan dengan
                kebutuhan Anda
              </p>
            </div>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <Link
                  href={`/layanan/${service.slug}`}
                  className="block bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  {service.image_url ? (
                    <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={`/api/uploads/${service.image_url.replace(/^\/uploads\//, "")}`}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
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
                          d={getServiceIconPath(service.icon)}
                        />
                      </svg>
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-primary-700 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                  <span className="text-accent-500 text-sm font-medium mt-4 inline-block">
                    Selengkapnya &rarr;
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          {services.length > 0 && (
            <AnimatedSection variant="fadeInUp" delay={0.3}>
              <div className="text-center mt-8">
                <Link
                  href="/layanan"
                  className="text-accent-500 font-medium hover:text-accent-600"
                >
                  Lihat semua layanan &rarr;
                </Link>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeInLeft" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary-700 mb-6">
                Mengapa Memilih Kami?
              </h2>
              <div className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <AnimatedSection key={index} variant="fadeInUp" delay={0.1 * (index + 1)}>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath("check-circle")!} />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-primary-700">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
            <AnimatedSection variant="fadeInRight" delay={0.2}>
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
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </section>

      {clients.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection variant="fadeInUp">
              <h2 className="text-3xl font-bold text-primary-700 mb-8 text-center">Klien Kami</h2>
            </AnimatedSection>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8" staggerDelay={0.075}>
              {clients.map((client) => (
                <StaggerItem key={client.id} className="flex items-center justify-center">
                  {client.website_url ? (
                    <a
                      href={client.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {client.logo_url && (
                        <img
                          src={`/api/uploads/${client.logo_url.replace(/^\/uploads\//, "")}`}
                          alt={client.name}
                          className="h-16 w-auto object-contain mb-3"
                        />
                      )}
                      <span className="text-sm text-gray-700 font-medium text-center">{client.name}</span>
                    </a>
                  ) : (
                    <div className="flex flex-col items-center p-4">
                      {client.logo_url && (
                        <img
                          src={`/api/uploads/${client.logo_url.replace(/^\/uploads\//, "")}`}
                          alt={client.name}
                          className="h-16 w-auto object-contain mb-3"
                        />
                      )}
                      <span className="text-sm text-gray-700 font-medium text-center">{client.name}</span>
                    </div>
                  )}
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </>
  );
}