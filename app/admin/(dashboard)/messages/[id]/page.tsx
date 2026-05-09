"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import type { ContactMessage } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function AdminMessageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [message, setMessage] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then((data) => {
        const found = (Array.isArray(data) ? data : []).find((m: ContactMessage) => String(m.id) === id);
        if (found) {
          setMessage(found);
          if (!found.is_read) {
            fetch(`/api/admin/messages/${id}/read`, { method: "PUT" });
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    router.push("/admin/messages");
  }

  if (loading) return <p>Memuat...</p>;
  if (!message) return <p>Pesan tidak ditemukan</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-700">Detail Pesan</h1>
        <Button variant="outline" onClick={() => router.push("/admin/messages")}>Kembali</Button>
      </div>
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nama</p>
              <p className="font-medium">{message.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{message.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Subjek</p>
              <p className="font-medium">{message.subject}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tanggal</p>
              <p className="font-medium">{new Date(message.created_at).toLocaleString("id-ID")}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Pesan</p>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">{message.message}</div>
          </div>
          <div className="flex justify-end">
            <Button variant="danger" onClick={handleDelete}>Hapus Pesan</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
