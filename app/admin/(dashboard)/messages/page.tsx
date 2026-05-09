"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ContactMessage } from "@/types";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then((d) => { setMessages(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    setMessages(messages.filter((m) => m.id !== id));
  }

  if (loading) return <p>Memuat...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-700 mb-6">Pesan Kontak</h1>
      <Card>
        <Table headers={["Status", "Nama", "Subjek", "Tanggal", "Aksi"]}>
          {messages.map((msg) => (
            <tr key={msg.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">
                {msg.is_read ? (
                  <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">Dibaca</span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">Baru</span>
                )}
              </td>
              <td className="px-4 py-3 font-medium">{msg.name}</td>
              <td className="px-4 py-3 text-gray-500">{msg.subject}</td>
              <td className="px-4 py-3 text-gray-500 text-sm">
                {new Date(msg.created_at).toLocaleDateString("id-ID")}
              </td>
              <td className="px-4 py-3 space-x-2">
                <Link href={`/admin/messages/${msg.id}`} className="text-accent-500 text-sm font-medium">Baca</Link>
                <button onClick={() => handleDelete(msg.id)} className="text-red-500 text-sm font-medium">Hapus</button>
              </td>
            </tr>
          ))}
        </Table>
        {messages.length === 0 && <p className="text-gray-500 text-center py-8">Belum ada pesan</p>}
      </Card>
    </div>
  );
}
