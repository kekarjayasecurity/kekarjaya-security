import { query } from "@/lib/db";
import type { Faq } from "@/types";

export const revalidate = 3600;
import FaqClient from "./FaqClient";
import AnimatedSection from "@/components/ui/AnimatedSection";

async function getFaqs() {
  try {
    return await query<Faq>("SELECT * FROM faq ORDER BY sort_order");
  } catch {
    return [];
  }
}

export default async function FaqPage() {
  const faqs = await getFaqs();
  const list = Array.isArray(faqs) ? faqs : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <AnimatedSection variant="fadeInUp">
        <h1 className="text-4xl font-bold text-primary-700 mb-4">
          Pertanyaan yang Sering Diajukan
        </h1>
        <p className="text-gray-600 mb-12">
          Temukan jawaban untuk pertanyaan umum tentang layanan kami.
        </p>
      </AnimatedSection>
      <AnimatedSection variant="fadeInUp" delay={0.2}>
        <FaqClient faqs={list} />
      </AnimatedSection>
    </div>
  );
}