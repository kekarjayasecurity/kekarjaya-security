import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { Faq } from "@/types";
import { revalidateContentType } from "@/lib/revalidation";

export async function GET() {
  try {
    const faqs = await query<Faq>("SELECT * FROM faq ORDER BY sort_order");
    return NextResponse.json(Array.isArray(faqs) ? faqs : []);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { question, answer, sort_order } = await request.json();
    if (!question || !answer) {
      return NextResponse.json({ error: "Pertanyaan dan jawaban wajib diisi" }, { status: 400 });
    }
    await query("INSERT INTO faq (question, answer, sort_order) VALUES (?, ?, ?)", [
      question, answer, sort_order || 0,
    ]);
    await revalidateContentType("faq");
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
