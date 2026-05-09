"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Service } from "@/types";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus layanan ini?")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    setServices(services.filter((s) => s.id !== id));
  }

  if (loading) return <p>Memuat...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-700">Layanan</h1>
        <Link href="/admin/services/new">
          <Button>Tambah Layanan</Button>
        </Link>
      </div>
      <Card>
        <Table headers={["Layanan", "Slug", "Urutan", "Aksi"]}>
          {services.map((svc) => (
            <tr key={svc.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{svc.title}</td>
              <td className="px-4 py-3 text-gray-500 text-sm">{svc.slug}</td>
              <td className="px-4 py-3 text-gray-500 text-sm">{svc.sort_order}</td>
              <td className="px-4 py-3 space-x-2">
                <Link href={`/admin/services/${svc.id}`} className="text-accent-500 hover:text-accent-600 text-sm font-medium">
                  Edit
                </Link>
                <button onClick={() => handleDelete(svc.id)} className="text-red-500 hover:text-red-600 text-sm font-medium">
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
