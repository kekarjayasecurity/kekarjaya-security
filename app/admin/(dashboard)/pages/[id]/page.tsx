"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Page } from "@/types";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/ui/RichTextEditor"), { ssr: false });

export default function AdminPageEditor() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [page, setPage] = useState<Page | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/pages")
      .then((res) => res.json())
      .then((data) => {
        const found = (Array.isArray(data) ? data : []).find((p: Page) => String(p.id) === id);
        if (found) {
          setPage(found);
          setTitle(found.title);
          setContent(found.content || "");
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  async function handleSave() {
    setSaving(true);
    setSuccess(false);
    try {
      const res = await fetch(`/api/admin/pages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) setSuccess(true);
    } catch {}
    setSaving(false);
  }

  if (loading) return <p>Memuat...</p>;
  if (!page) return <p>Halaman tidak ditemukan</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-700">Edit: {page.title}</h1>
        <Button variant="outline" onClick={() => router.push("/admin/pages")}>
          Kembali
        </Button>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
          Halaman berhasil disimpan
        </div>
      )}

      <Card className="p-6">
        <div className="space-y-4">
          <Input label="Judul" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konten</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan"}
            </Button>
            <Button variant="outline" onClick={() => window.open(`/${page.slug}`, "_blank")}>
              Preview
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
