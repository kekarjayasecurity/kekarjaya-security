"use client";

import { useState, useEffect } from "react";
import type { BlogCategory } from "@/types";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";

export default function AdminBlogCategoriesPage() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  function loadCategories() {
    fetch("/api/admin/blog/categories")
      .then((r) => r.json())
      .then((d) => { setCategories(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }

  function openAdd() {
    setEditId(null);
    setName("");
    setSlug("");
    setModalOpen(true);
  }

  function openEdit(cat: BlogCategory) {
    setEditId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setModalOpen(true);
  }

  async function handleSave() {
    if (!name || !slug) return;
    if (editId) {
      await fetch(`/api/admin/blog/categories/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      });
    } else {
      await fetch("/api/admin/blog/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      });
    }
    setModalOpen(false);
    loadCategories();
  }

  async function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus kategori ini?")) return;
    await fetch(`/api/admin/blog/categories/${id}`, { method: "DELETE" });
    loadCategories();
  }

  if (loading) return <p>Memuat...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-700">Kategori Blog</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.history.back()}>Kembali</Button>
          <Button onClick={openAdd}>Tambah Kategori</Button>
        </div>
      </div>
      <Card>
        <Table headers={["Nama", "Slug", "Aksi"]}>
          {categories.map((cat) => (
            <tr key={cat.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{cat.name}</td>
              <td className="px-4 py-3 text-gray-500 text-sm">{cat.slug}</td>
              <td className="px-4 py-3 space-x-2">
                <button onClick={() => openEdit(cat)} className="text-accent-500 text-sm font-medium">Edit</button>
                <button onClick={() => handleDelete(cat.id)} className="text-red-500 text-sm font-medium">Hapus</button>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? "Edit Kategori" : "Tambah Kategori"}>
        <div className="space-y-4">
          <Input label="Nama" value={name} onChange={(e) => { setName(e.target.value); setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")); }} />
          <Input label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>Batal</Button>
            <Button onClick={handleSave}>Simpan</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
