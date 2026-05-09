import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { unlink } from "fs/promises";
import path from "path";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, category_id, sort_order } = await request.json();
    await query("UPDATE gallery_photos SET title = ?, category_id = ?, sort_order = ? WHERE id = ?", [
      title || null, category_id || null, sort_order || 0, id,
    ]);
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
    const photo = await query<{ filename: string }>("SELECT filename FROM gallery_photos WHERE id = ?", [id]);

    if (Array.isArray(photo) && photo[0]) {
      const filepath = path.join(process.cwd(), "public", "uploads", photo[0].filename);
      try { await unlink(filepath); } catch {}
    }

    await query("DELETE FROM gallery_photos WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
