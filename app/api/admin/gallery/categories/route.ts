import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { GalleryCategory } from "@/types";

export async function GET() {
  try {
    const categories = await query<GalleryCategory>("SELECT * FROM gallery_categories ORDER BY name");
    return NextResponse.json(Array.isArray(categories) ? categories : []);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, slug } = await request.json();
    if (!name || !slug) {
      return NextResponse.json({ error: "Nama dan slug wajib diisi" }, { status: 400 });
    }
    await query("INSERT INTO gallery_categories (name, slug) VALUES (?, ?)", [name, slug]);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
