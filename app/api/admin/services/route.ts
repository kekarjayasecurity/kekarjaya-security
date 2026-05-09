import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { Service } from "@/types";

export async function GET() {
  try {
    const services = await query<Service>("SELECT * FROM services ORDER BY sort_order");
    return NextResponse.json(Array.isArray(services) ? services : []);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, slug, description, icon, content, sort_order } = await request.json();

    if (!title || !slug) {
      return NextResponse.json({ error: "Judul dan slug wajib diisi" }, { status: 400 });
    }

    await query(
      "INSERT INTO services (title, slug, description, icon, content, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
      [title, slug, description || null, icon || null, content || null, sort_order || 0]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
