"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Client } from "@/types";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/clients")
      .then((res) => res.json())
      .then((data) => {
        setClients(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus klien ini?")) return;
    await fetch(`/api/admin/clients/${id}`, { method: "DELETE" });
    setClients(clients.filter((c) => c.id !== id));
  }

  if (loading) return <p>Memuat...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-700">Klien</h1>
        <Link href="/admin/clients/new">
          <Button>Tambah Klien</Button>
        </Link>
      </div>
      <Card>
        <Table headers={["Logo", "Nama", "Website", "Urutan", "Aktif", "Aksi"]}>
          {clients.map((client) => (
            <tr key={client.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">
                {client.logo_url ? (
                  <img
                    src={`/api/uploads/${client.logo_url.replace(/^\/uploads\//, "")}`}
                    alt={client.name}
                    className="w-10 h-10 object-contain rounded"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">-</span>
                )}
              </td>
              <td className="px-4 py-3 font-medium">{client.name}</td>
              <td className="px-4 py-3 text-gray-500 text-sm">
                {client.website_url ? (
                  <a href={client.website_url} target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:text-accent-600">
                    {client.website_url.length > 30 ? client.website_url.substring(0, 30) + "..." : client.website_url}
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-3 text-gray-500 text-sm">{client.sort_order}</td>
              <td className="px-4 py-3">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${client.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {client.is_active ? "Aktif" : "Nonaktif"}
                </span>
              </td>
              <td className="px-4 py-3 space-x-2">
                <Link href={`/admin/clients/${client.id}`} className="text-accent-500 hover:text-accent-600 text-sm font-medium">
                  Edit
                </Link>
                <button onClick={() => handleDelete(client.id)} className="text-red-500 hover:text-red-600 text-sm font-medium">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}