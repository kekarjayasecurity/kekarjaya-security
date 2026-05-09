"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/ui/RichTextEditor"), { ssr: false });

export default function AdminServiceFormPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const isNew = id === "new";

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [content, setContent] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (!isNew) {
      fetch("/api/admin/services")
        .then((res) => res.json())
        .then((data) => {
          const found = (Array.isArray(data) ? data : []).find((s: { id: number }) => String(s.id) === id);
          if (found) {
            setTitle(found.title);
            setSlug(found.slug);
            setDescription(found.description || "");
            setIcon(found.icon || "");
            setContent(found.content || "");
            setSortOrder(found.sort_order || 0);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id, isNew]);

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  async function handleSave() {
    setSaving(true);
    try {
      const body = { title, slug, description, icon, content, sort_order: sortOrder };
      if (isNew) {
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.ok) router.push("/admin/services");
      } else {
        const res = await fetch(`/api/admin/services/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.ok) router.push("/admin/services");
      }
    } catch {}
    setSaving(false);
  }

  if (loading) return <p>Memuat...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-700">
          {isNew ? "Tambah Layanan" : "Edit Layanan"}
        </h1>
        <Button variant="outline" onClick={() => router.push("/admin/services")}>
          Kembali
        </Button>
      </div>
      <Card className="p-6">
        <div className="space-y-4">
          <Input label="Judul" value={title} onChange={(e) => { setTitle(e.target.value); if (isNew) setSlug(generateSlug(e.target.value)); }} />
          <Input label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} disabled={!isNew} />
          <Input label="Deskripsi Singkat" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Input label="Ikon (nama ikon)" value={icon} onChange={(e) => setIcon(e.target.value)} />
          <Input label="Urutan" type="number" value={String(sortOrder)} onChange={(e) => setSortOrder(Number(e.target.value))} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konten</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
