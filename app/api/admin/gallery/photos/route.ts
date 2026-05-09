import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { GalleryPhoto } from "@/types";

export async function GET() {
  try {
    const photos = await query<GalleryPhoto & { category_name: string }>(
      `SELECT gp.*, gc.name as category_name 
       FROM gallery_photos gp 
       LEFT JOIN gallery_categories gc ON gp.category_id = gc.id 
       ORDER BY gp.sort_order, gp.created_at DESC`
    );
    return NextResponse.json(Array.isArray(photos) ? photos : []);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, filename, category_id, sort_order } = await request.json();

    if (!filename) {
      return NextResponse.json({ error: "File wajib diupload" }, { status: 400 });
    }

    await query(
      "INSERT INTO gallery_photos (title, filename, category_id, sort_order) VALUES (?, ?, ?, ?)",
      [title || null, filename, category_id || null, sort_order || 0]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
