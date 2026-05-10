import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { revalidateContentType } from "@/lib/revalidation";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, slug } = await request.json();
    await query("UPDATE blog_categories SET name = ?, slug = ? WHERE id = ?", [name, slug, id]);
    await revalidateContentType("blog_categories");
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
    await query("DELETE FROM blog_categories WHERE id = ?", [id]);
    await revalidateContentType("blog_categories");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
