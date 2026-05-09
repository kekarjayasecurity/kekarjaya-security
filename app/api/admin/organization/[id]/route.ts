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
    const { name, position, photo, sort_order } = await request.json();
    await query("UPDATE organization_members SET name = ?, position = ?, photo = ?, sort_order = ? WHERE id = ?", [
      name, position, photo || null, sort_order || 0, id,
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
    const member = await query<{ photo: string }>("SELECT photo FROM organization_members WHERE id = ?", [id]);
    if (Array.isArray(member) && member[0]?.photo) {
      const filepath = path.join(process.cwd(), "public", "uploads", member[0].photo);
      try { await unlink(filepath); } catch {}
    }
    await query("DELETE FROM organization_members WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
