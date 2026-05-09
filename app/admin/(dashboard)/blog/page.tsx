"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { BlogPost } from "@/types";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const url = statusFilter ? `/api/admin/blog/posts?status=${statusFilter}` : "/api/admin/blog/posts";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [statusFilter]);

  async function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;
    await fetch(`/api/admin/blog/posts/${id}`, { method: "DELETE" });
    setPosts(posts.filter((p) => p.id !== id));
  }

  if (loading) return <p>Memuat...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-700">Blog</h1>
        <div className="flex gap-2">
          <Link href="/admin/blog/categories">
            <Button variant="outline">Kategori</Button>
          </Link>
          <Link href="/admin/blog/new">
            <Button>Tambah Artikel</Button>
          </Link>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setStatusFilter("")} className={`px-3 py-1.5 text-sm rounded-lg ${!statusFilter ? "bg-primary-700 text-white" : "bg-gray-100"}`}>
          Semua
        </button>
        <button onClick={() => setStatusFilter("published")} className={`px-3 py-1.5 text-sm rounded-lg ${statusFilter === "published" ? "bg-primary-700 text-white" : "bg-gray-100"}`}>
          Dipublikasi
        </button>
        <button onClick={() => setStatusFilter("draft")} className={`px-3 py-1.5 text-sm rounded-lg ${statusFilter === "draft" ? "bg-primary-700 text-white" : "bg-gray-100"}`}>
          Draft
        </button>
      </div>

      <Card>
        <Table headers={["Judul", "Kategori", "Status", "Tanggal", "Aksi"]}>
          {posts.map((post) => (
            <tr key={post.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{post.title}</td>
              <td className="px-4 py-3 text-gray-500 text-sm">{(post as BlogPost & { category_name: string }).category_name || "-"}</td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-1 rounded ${post.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {post.status === "published" ? "Dipublikasi" : "Draft"}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500 text-sm">
                {new Date(post.created_at).toLocaleDateString("id-ID")}
              </td>
              <td className="px-4 py-3 space-x-2">
                <Link href={`/admin/blog/${post.id}`} className="text-accent-500 hover:text-accent-600 text-sm font-medium">Edit</Link>
                <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-600 text-sm font-medium">Hapus</button>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}
