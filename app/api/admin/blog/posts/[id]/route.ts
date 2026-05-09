import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, slug, content, excerpt, thumbnail, category_id, status } =
      await request.json();

    const existing = await query<{ status: string }>(
      "SELECT status FROM blog_posts WHERE id = ?",
      [id]
    );

    let publishedAt = null;
    if (status === "published" && Array.isArray(existing) && existing[0]?.status !== "published") {
      publishedAt = new Date().toISOString();
    }

    if (publishedAt) {
      await query(
        `UPDATE blog_posts SET title = ?, slug = ?, content = ?, excerpt = ?, thumbnail = ?, category_id = ?, status = ?, published_at = ? WHERE id = ?`,
        [title, slug, content, excerpt, thumbnail, category_id, status, publishedAt, id]
      );
    } else {
      await query(
        `UPDATE blog_posts SET title = ?, slug = ?, content = ?, excerpt = ?, thumbnail = ?, category_id = ?, status = ? WHERE id = ?`,
        [title, slug, content, excerpt, thumbnail, category_id, status, id]
      );
    }

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
    await query("DELETE FROM blog_posts WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
