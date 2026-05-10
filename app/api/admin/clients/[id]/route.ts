import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import type { Client } from "@/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await queryOne<Client>("SELECT * FROM clients WHERE id = ?", [id]);
    if (!client) {
      return NextResponse.json({ error: "Klien tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(client);
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, logo_url, website_url, sort_order, is_active } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Nama klien wajib diisi" }, { status: 400 });
    }

    await query(
      "UPDATE clients SET name = ?, logo_url = ?, website_url = ?, sort_order = ?, is_active = ? WHERE id = ?",
      [name, logo_url || null, website_url || null, sort_order || 0, is_active !== undefined ? is_active : true, id]
    );

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
    await query("DELETE FROM clients WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}