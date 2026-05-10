import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { GalleryPhoto } from "@/types";
import { deleteUploadedFile } from "@/lib/upload-config";
import { revalidateContentType } from "@/lib/revalidation";

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
    await revalidateContentType("gallery_photos");
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
    const photo = await query<GalleryPhoto>("SELECT filename FROM gallery_photos WHERE id = ?", [id]);

    if (Array.isArray(photo) && photo[0]) {
      await deleteUploadedFile(photo[0].filename);
    }

    await query("DELETE FROM gallery_photos WHERE id = ?", [id]);
    await revalidateContentType("gallery_photos");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}