import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { BlogPost } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = Number(searchParams.get("page")) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    let where = "";
    const params: unknown[] = [];

    if (status) {
      where = "WHERE bp.status = ?";
      params.push(status);
    }

    const posts = await query<BlogPost & { category_name: string }>(
      `SELECT bp.*, bc.name as category_name 
       FROM blog_posts bp 
       LEFT JOIN blog_categories bc ON bp.category_id = bc.id 
       ${where} 
       ORDER BY bp.created_at DESC 
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return NextResponse.json(Array.isArray(posts) ? posts : []);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, slug, content, excerpt, thumbnail, category_id, status } =
      await request.json();

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Judul dan slug wajib diisi" },
        { status: 400 }
      );
    }

    const publishedAt = status === "published" ? new Date().toISOString() : null;

    await query(
      `INSERT INTO blog_posts (title, slug, content, excerpt, thumbnail, category_id, status, published_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        slug,
        content || null,
        excerpt || null,
        thumbnail || null,
        category_id || null,
        status || "draft",
        publishedAt,
      ]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error && err.message.includes("Duplicate") ? "Slug sudah digunakan" : "Terjadi kesalahan server";
    const status = err instanceof Error && err.message.includes("Duplicate") ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
