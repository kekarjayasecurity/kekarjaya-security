import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { ContactMessage } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    const messages = await query<ContactMessage>(
      "SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );

    return NextResponse.json(Array.isArray(messages) ? messages : []);
  } catch {
    return NextResponse.json([]);
  }
}
