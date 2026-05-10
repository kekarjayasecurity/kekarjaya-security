"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ImageUpload from "@/components/ui/ImageUpload";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/ui/RichTextEditor"), { ssr: false });

interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export default function AdminBlogFormPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const isNew = id === "new";

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [publishedAt, setPublishedAt] = useState("");
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    fetch("/api/admin/blog/categories").then((r) => r.json()).then((d) => setCategories(Array.isArray(d) ? d : []));
    if (!isNew) {
      fetch("/api/admin/blog/posts")
        .then((res) => res.json())
        .then((data) => {
          const found = (Array.isArray(data) ? data : []).find((p: { id: number }) => String(p.id) === id);
          if (found) {
            setTitle(found.title);
            setSlug(found.slug);
            setExcerpt(found.excerpt || "");
            setContent(found.content || "");
            setThumbnail(found.thumbnail || "");
            setCategoryId(found.category_id);
            setStatus(found.status);
            if (found.published_at) {
              const d = new Date(found.published_at);
              setPublishedAt(d.toISOString().slice(0, 16));
            }
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id, isNew]);

  function generateSlug(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
  }

  async function handleSave(publishStatus: "draft" | "published") {
    setSaving(true);
    try {
      const body = { title, slug, excerpt, content, thumbnail, category_id: categoryId, status: publishStatus, published_at: publishStatus === "published" ? (publishedAt || new Date().toISOString().slice(0, 19).replace("T", " ")) : null };
      const url = isNew ? "/api/admin/blog/posts" : `/api/admin/blog/posts/${id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) router.push("/admin/blog");
    } catch {}
    setSaving(false);
  }

  if (loading) return <p>Memuat...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-700">{isNew ? "Tambah Artikel" : "Edit Artikel"}</h1>
        <Button variant="outline" onClick={() => router.push("/admin/blog")}>Kembali</Button>
      </div>
      <Card className="p-6">
        <div className="space-y-4">
          <Input label="Judul" value={title} onChange={(e) => { setTitle(e.target.value); if (isNew) setSlug(generateSlug(e.target.value)); }} />
          <Input label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} disabled={!isNew} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select value={categoryId || ""} onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : null)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">Tanpa Kategori</option>
              {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
          <Input label="Ringkasan" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
          <Input label="Tanggal Publikasi" type="datetime-local" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
          <ImageUpload value={thumbnail ? `/api/uploads/${thumbnail.replace(/^\/uploads\//, "")}` : undefined} onChange={setThumbnail} label="Thumbnail" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konten</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => handleSave("published")} disabled={saving}>{saving ? "Menyimpan..." : "Publikasikan"}</Button>
            <Button variant="outline" onClick={() => handleSave("draft")} disabled={saving}>Simpan Draft</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
