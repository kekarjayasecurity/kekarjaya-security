import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { revalidateContentType } from "@/lib/revalidation";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, hero_image_url, hero_title, hero_subtitle, image_url, sections } = body;

    if (!title) {
      return NextResponse.json({ error: "Judul wajib diisi" }, { status: 400 });
    }

    await query(
      "UPDATE pages SET title = ?, content = ?, hero_image_url = ?, hero_title = ?, hero_subtitle = ?, image_url = ?, sections = ? WHERE id = ?",
      [
        title,
        content || "",
        hero_image_url || null,
        hero_title || null,
        hero_subtitle || null,
        image_url || null,
        sections ? JSON.stringify(sections) : null,
        id,
      ]
    );

    const page = await query<{ slug: string }>("SELECT slug FROM pages WHERE id = ?", [id]);
    const slug = Array.isArray(page) && page[0] ? page[0].slug : undefined;
    await revalidateContentType("pages", slug);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}