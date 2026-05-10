import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { BlogPost } from "@/types";
import { deleteUploadedFile } from "@/lib/upload-config";
import { revalidateContentType } from "@/lib/revalidation";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, slug, content, excerpt, thumbnail, category_id, status, published_at } =
      await request.json();

    const existing = await query<{ status: string; published_at: string }>(
      "SELECT status, published_at FROM blog_posts WHERE id = ?",
      [id]
    );

    let publishedAt: string | null = null;
    if (status === "published") {
      if (published_at) {
        publishedAt = published_at;
      } else if (Array.isArray(existing) && existing[0]?.published_at) {
        publishedAt = new Date(existing[0].published_at).toISOString().slice(0, 19).replace("T", " ");
      } else {
        publishedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
      }
    }

    await query(
      `UPDATE blog_posts SET title = ?, slug = ?, content = ?, excerpt = ?, thumbnail = ?, category_id = ?, status = ?, published_at = ? WHERE id = ?`,
      [title, slug, content, excerpt, thumbnail, category_id, status, publishedAt, id]
    );

    await revalidateContentType("blog_posts", slug);

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
    const post = await query<BlogPost>("SELECT thumbnail FROM blog_posts WHERE id = ?", [id]);
    if (Array.isArray(post) && post[0]?.thumbnail) {
      await deleteUploadedFile(post[0].thumbnail);
    }
    await query("DELETE FROM blog_posts WHERE id = ?", [id]);
    await revalidateContentType("blog_posts");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}