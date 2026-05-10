import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { Page } from "@/types";

export async function GET() {
  try {
    const pages = await query<Page>("SELECT * FROM pages ORDER BY title");
    const parsed = (Array.isArray(pages) ? pages : []).map((p) => ({
      ...p,
      sections: typeof p.sections === "string" ? JSON.parse(p.sections) : p.sections,
    }));
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json([]);
  }
}
