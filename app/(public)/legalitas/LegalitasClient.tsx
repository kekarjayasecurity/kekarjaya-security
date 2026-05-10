"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { getIconPath } from "@/lib/icons";
import type { Page } from "@/types";

interface LegalitasClientProps {
  page: Page | null;
}

interface LegalDoc {
  title: string;
  description: string;
  icon: string;
}

const defaultLegalDocuments: LegalDoc[] = [
  { title: "Akta Pendirian Perusahaan", description: "Nomor: 234/2020, Notaris: Budi Santoso, S.H.", icon: "document-text" },
  { title: "Surat Izin Usaha Jasa Keamanan (SIUJK)", description: "Nomor: SIUJK/2020/1234 — Diterbitkan oleh Kepolisian Republik Indonesia", icon: "shield-check" },
  { title: "SIUP (Surat Izin Usaha Perdagangan)", description: "Nomor: 503/1234/2020", icon: "building" },
  { title: "TDP (Tanda Daftar Perusahaan)", description: "Nomor: 1234567890", icon: "clipboard-list-alt" },
  { title: "NPWP (Nomor Pokok Wajib Pajak)", description: "01.234.567.8-123.000", icon: "identification" },
  { title: "Sertifikat Standar Keamanan SNI", description: "SNI 8509:2018 — Sertifikasi Standar Nasional Indonesia", icon: "badge-check" },
];

export default function LegalitasClient({ page }: LegalitasClientProps) {
  const sections = page?.sections || {};
  const documents = (sections?.documents as LegalDoc[])?.length
    ? (sections.documents as LegalDoc[])
    : defaultLegalDocuments;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <AnimatedSection variant="fadeInUp">
        <h1 className="text-4xl font-bold text-primary-700 mb-4">Legalitas</h1>
        <p className="text-gray-600 mb-12 max-w-2xl">
          PT Kekar Jaya Security beroperasi secara legal dan memiliki seluruh izin
          yang diperlukan untuk menyediakan layanan keamanan profesional.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {documents.map((doc, index) => (
          <AnimatedSection key={doc.title} variant="fadeInUp" delay={index * 0.1}>
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow h-full">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath(doc.icon) || doc.icon} />
                </svg>
              </div>
              <h3 className="font-bold text-primary-700 text-lg mb-2">{doc.title}</h3>
              <p className="text-gray-600 text-sm">{doc.description}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {page?.content ? (
        <AnimatedSection variant="fadeInUp" delay={0.4}>
          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </AnimatedSection>
      ) : null}
    </div>
  );
}