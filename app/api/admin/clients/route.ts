import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { Client } from "@/types";
import { revalidateContentType } from "@/lib/revalidation";

export async function GET() {
  try {
    const clients = await query<Client>("SELECT * FROM clients ORDER BY sort_order");
    return NextResponse.json(Array.isArray(clients) ? clients : []);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, logo_url, website_url, sort_order, is_active } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Nama klien wajib diisi" }, { status: 400 });
    }

    await query(
      "INSERT INTO clients (name, logo_url, website_url, sort_order, is_active) VALUES (?, ?, ?, ?, ?)",
      [name, logo_url || null, website_url || null, sort_order || 0, is_active !== undefined ? is_active : true]
    );

    await revalidateContentType("clients");

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}