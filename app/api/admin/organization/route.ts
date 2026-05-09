import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { OrganizationMember } from "@/types";

export async function GET() {
  try {
    const members = await query<OrganizationMember>("SELECT * FROM organization_members ORDER BY sort_order");
    return NextResponse.json(Array.isArray(members) ? members : []);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, position, photo, sort_order } = await request.json();
    if (!name || !position) {
      return NextResponse.json({ error: "Nama dan jabatan wajib diisi" }, { status: 400 });
    }
    await query("INSERT INTO organization_members (name, position, photo, sort_order) VALUES (?, ?, ?, ?)", [
      name, position, photo || null, sort_order || 0,
    ]);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
