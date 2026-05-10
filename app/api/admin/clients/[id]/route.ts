import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import type { Client } from "@/types";
import { deleteUploadedFile } from "@/lib/upload-config";
import { revalidateContentType } from "@/lib/revalidation";

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

    await revalidateContentType("clients");

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
    const client = await queryOne<Client>("SELECT logo_url FROM clients WHERE id = ?", [id]);
    if (client?.logo_url) {
      await deleteUploadedFile(client.logo_url);
    }
    await query("DELETE FROM clients WHERE id = ?", [id]);
    await revalidateContentType("clients");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}