import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { OrganizationMember } from "@/types";
import { deleteUploadedFile } from "@/lib/upload-config";
import { revalidateContentType } from "@/lib/revalidation";

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
    await revalidateContentType("organization");
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
    const member = await query<OrganizationMember>("SELECT photo FROM organization_members WHERE id = ?", [id]);
    if (Array.isArray(member) && member[0]?.photo) {
      await deleteUploadedFile(member[0].photo);
    }
    await query("DELETE FROM organization_members WHERE id = ?", [id]);
    await revalidateContentType("organization");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}