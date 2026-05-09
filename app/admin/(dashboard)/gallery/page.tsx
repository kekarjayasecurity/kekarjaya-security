"use client";

import { useState, useEffect } from "react";
import type { GalleryPhoto, GalleryCategory } from "@/types";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ImageUpload from "@/components/ui/ImageUpload";
import Modal from "@/components/ui/Modal";
import Link from "next/link";

export default function AdminGalleryPage() {
  const [photos, setPhotos] = useState<(GalleryPhoto & { category_name: string })[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [filename, setFilename] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    loadPhotos();
    fetch("/api/admin/gallery/categories").then((r) => r.json()).then((d) => setCategories(Array.isArray(d) ? d : []));
  }, []);

  function loadPhotos() {
    fetch("/api/admin/gallery/photos")
      .then((r) => r.json())
      .then((d) => { setPhotos(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }

  async function handleUpload() {
    if (!filename) return;
    await fetch("/api/admin/gallery/photos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, filename, category_id: categoryId }),
    });
    setUploadOpen(false);
    setTitle("");
    setFilename("");
    setCategoryId(null);
    loadPhotos();
  }

  async function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus foto ini?")) return;
    await fetch(`/api/admin/gallery/photos/${id}`, { method: "DELETE" });
    loadPhotos();
  }

  if (loading) return <p>Memuat...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-700">Galeri</h1>
        <div className="flex gap-2">
          <Link href="/admin/gallery/categories"><Button variant="outline">Kategori</Button></Link>
          <Button onClick={() => setUploadOpen(true)}>Upload Foto</Button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative">
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img src={`/uploads/${photo.filename}`} alt={photo.title || ""} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <button onClick={() => handleDelete(photo.id)} className="text-white text-sm font-medium bg-red-600 px-3 py-1 rounded-lg">Hapus</button>
            </div>
            {photo.title && <p className="text-xs text-gray-600 mt-1 truncate">{photo.title}</p>}
          </div>
        ))}
      </div>
      <Modal open={uploadOpen} onClose={() => setUploadOpen(false)} title="Upload Foto">
        <div className="space-y-4">
          <ImageUpload onChange={setFilename} label="Pilih Foto" />
          <Input label="Judul" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select value={categoryId || ""} onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : null)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">Tanpa Kategori</option>
              {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setUploadOpen(false)}>Batal</Button>
            <Button onClick={handleUpload}>Upload</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
