import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !subject || !message) {
      return NextResponse.json(
        { error: "Nama, Subjek, dan Pesan wajib diisi" },
        { status: 400 }
      );
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Format email tidak valid" },
          { status: 400 }
        );
      }
    }

    await query(
      "INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)",
      [name, email || null, phone || null, subject, message]
    );

    return NextResponse.json({ success: true, message: "Pesan berhasil terkirim" });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
