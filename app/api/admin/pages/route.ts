import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { Page } from "@/types";

export async function GET() {
  try {
    const pages = await query<Page>("SELECT * FROM pages ORDER BY title");
    return NextResponse.json(Array.isArray(pages) ? pages : []);
  } catch {
    return NextResponse.json([]);
  }
}
