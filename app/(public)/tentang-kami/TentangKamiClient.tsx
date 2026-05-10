"use client";

import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { getIconPath } from "@/lib/icons";
import type { Page, OrganizationMember } from "@/types";

interface TentangKamiClientProps {
  page: Page | null;
  members: OrganizationMember[];
}

interface ValueItem {
  title: string;
  description: string;
  icon: string;
}

const defaultVision = "Menjadi perusahaan jasa keamanan terpercaya dan profesional yang menjadi pilihan utama di Indonesia.";

const defaultMissionItems = [
  "Menyediakan tenaga keamanan terlatih dan profesional",
  "Mengutamakan kualitas layanan dan kepuasan pelanggan",
  "Menerapkan standar keamanan nasional dan internasional",
  "Mengembangkan SDM secara berkelanjutan",
];

const defaultValues: ValueItem[] = [
  { title: "Integritas", description: "Jujur dan bertanggung jawab dalam setiap tindakan", icon: "shield-check" },
  { title: "Profesionalisme", description: "Memberikan layanan terbaik dengan standar tinggi", icon: "flask" },
  { title: "Kepercayaan", description: "Membangun hubungan yang terpercaya dengan klien", icon: "users" },
  { title: "Disiplin", description: "Konsisten dan tepat waktu dalam setiap penugasan", icon: "clock" },
];

export default function TentangKamiClient({ page, members }: TentangKamiClientProps) {
  const imageUrl = page?.image_url || null;
  const sections = page?.sections || {};
  const vision = (sections?.vision as string) || defaultVision;
  const missionItems = (sections?.mission_items as string[])?.length ? (sections.mission_items as string[]) : defaultMissionItems;
  const values = (sections?.values as ValueItem[])?.length ? (sections.values as ValueItem[]) : defaultValues;

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary-700 text-white overflow-hidden">
        {imageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/uploads/${imageUrl.replace(/^\/uploads\//, "")})` }}
          />
        ) : null}
        <div className="absolute inset-0 bg-primary-700/85" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <AnimatedSection variant="fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tentang Kami</h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              PT Kekar Jaya Security — Mitra terpercaya dalam solusi keamanan terpadu untuk melindungi aset dan keselamatan Anda.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection variant="fadeInLeft">
              <div>
                <h2 className="text-3xl font-bold text-primary-700 mb-6">
                  Solusi Keamanan Terpercaya untuk Masa Depan yang Aman
                </h2>
                <div
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: page?.content || "<p>PT Kekar Jaya Security adalah perusahaan jasa keamanan yang berdiri dengan visi menjadi penyedia layanan keamanan terdepan di Indonesia.</p>",
                  }}
                />
              </div>
            </AnimatedSection>
            <AnimatedSection variant="fadeInRight" delay={0.2}>
              {imageUrl ? (
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={`/uploads/${imageUrl.replace(/^\/uploads\//, "")}`}
                    alt="Tentang PT Kekar Jaya Security"
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : (
                <div className="bg-primary-100 rounded-xl p-12 flex items-center justify-center aspect-square">
                  <svg className="w-24 h-24 text-primary-700 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={getIconPath("building")!} />
                  </svg>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeInUp">
            <h2 className="text-3xl font-bold text-primary-700 mb-8 text-center">Visi & Misi</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection variant="fadeInLeft" delay={0.1}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 h-full">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath("eye")!} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath("eye-outer")!} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-700 mb-3">Visi</h3>
                <p className="text-gray-600">
                  {vision}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection variant="fadeInRight" delay={0.2}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 h-full">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath("clipboard-check")!} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-700 mb-3">Misi</h3>
                <ul className="text-gray-600 space-y-2">
                  {missionItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeInUp">
            <h2 className="text-3xl font-bold text-primary-700 mb-8 text-center">Nilai-Nilai Kami</h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="bg-gray-50 rounded-xl p-6 text-center h-full">
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath(value.icon) || value.icon} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-primary-700 text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Leadership */}
      {members.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection variant="fadeInUp">
              <h2 className="text-3xl font-bold text-primary-700 mb-4 text-center">Tim Kepemimpinan</h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Dipimpin oleh profesional berpengalaman yang berkomitmen memberikan layanan keamanan terbaik.
              </p>
            </AnimatedSection>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
              {members.map((member) => (
                <StaggerItem key={member.id}>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden text-center">
                    <div className="bg-primary-100 h-48 flex items-center justify-center">
                      {member.photo ? (
                        <img
                          src={member.photo.startsWith("/") ? member.photo : `/uploads/${member.photo}`}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg className="w-20 h-20 text-primary-700 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={getIconPath("user-circle")!} />
                        </svg>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-primary-700 text-lg">{member.name}</h3>
                      <p className="text-accent-600 text-sm mt-1">{member.position}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </>
  );
}