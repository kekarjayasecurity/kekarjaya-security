import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { revalidateContentType } from "@/lib/revalidation";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { question, answer, sort_order } = await request.json();
    await query("UPDATE faq SET question = ?, answer = ?, sort_order = ? WHERE id = ?", [
      question, answer, sort_order || 0, id,
    ]);
    await revalidateContentType("faq");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await query("DELETE FROM faq WHERE id = ?", [id]);
    await revalidateContentType("faq");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
