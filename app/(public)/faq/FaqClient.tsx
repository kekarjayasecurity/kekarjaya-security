"use client";

import { useState } from "react";
import type { Faq } from "@/types";

export default function FaqClient({ faqs }: { faqs: Faq[] }) {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Cari pertanyaan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((faq, index) => (
          <div key={faq.id} className="border border-gray-200 rounded-lg">
            <button
              className="w-full text-left px-6 py-4 flex items-center justify-between"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-medium text-primary-700 pr-4">
                {faq.question}
              </span>
              <svg
                className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            Tidak ada pertanyaan yang cocok dengan pencarian Anda.
          </p>
        )}
      </div>
    </>
  );
}
