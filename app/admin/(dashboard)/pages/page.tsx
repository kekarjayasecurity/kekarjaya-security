"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Page } from "@/types";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";

export default function AdminPagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/pages")
      .then((res) => res.json())
      .then((data) => {
        setPages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Memuat...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-700">Halaman</h1>
      </div>
      <Card>
        <Table headers={["Judul", "Slug", "Terakhir Diperbarui", "Aksi"]}>
          {pages.map((page) => (
            <tr key={page.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{page.title}</td>
              <td className="px-4 py-3 text-gray-500 text-sm">/{page.slug}</td>
              <td className="px-4 py-3 text-gray-500 text-sm">
                {new Date(page.updated_at).toLocaleDateString("id-ID")}
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/admin/pages/${page.id}`}
                  className="text-accent-500 hover:text-accent-600 text-sm font-medium"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}
