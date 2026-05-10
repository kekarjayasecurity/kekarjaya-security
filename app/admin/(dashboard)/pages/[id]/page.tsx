"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Page } from "@/types";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ImageUpload from "@/components/ui/ImageUpload";
import { SectionListEditor, TextListEditor } from "@/components/ui/SectionEditor";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/ui/RichTextEditor"), { ssr: false });

interface SectionItem {
  [key: string]: string | number;
}

interface SectionsState {
  why_choose_us?: SectionItem[];
  vision?: string;
  mission_items?: string[];
  values?: SectionItem[];
  documents?: SectionItem[];
}

export default function AdminPageEditor() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [page, setPage] = useState<Page | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sections, setSections] = useState<SectionsState>({});
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
          setHeroImageUrl(found.hero_image_url || "");
          setHeroTitle(found.hero_title || "");
          setHeroSubtitle(found.hero_subtitle || "");
          setImageUrl(found.image_url || "");
          if (found.sections && typeof found.sections === "object") {
            setSections(found.sections as SectionsState);
          }
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
        body: JSON.stringify({
          title,
          content,
          hero_image_url: heroImageUrl,
          hero_title: heroTitle,
          hero_subtitle: heroSubtitle,
          image_url: imageUrl,
          sections,
        }),
      });
      if (res.ok) setSuccess(true);
    } catch {}
    setSaving(false);
  }

  if (loading) return <p>Memuat...</p>;
  if (!page) return <p>Halaman tidak ditemukan</p>;

  const isBeranda = page.slug === "beranda";
  const isTentangKami = page.slug === "tentang-kami";
  const isLegalitas = page.slug === "legalitas";

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

          {isBeranda && (
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold text-primary-700 mb-3">Hero Banner</h3>
              <div className="space-y-4">
                <ImageUpload
                  label="Gambar Hero Banner"
                  value={heroImageUrl ? `/api/uploads/${heroImageUrl.replace(/^\/uploads\//, "")}` : undefined}
                  onChange={(filename) => setHeroImageUrl(filename)}
                />
                <Input label="Judul Hero" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} placeholder="Solusi Keamanan Profesional" />
                <Input label="Sub Judul Hero" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} placeholder="PT Kekar Jaya Security menyediakan layanan..." />
              </div>
            </div>
          )}

          {isBeranda && (
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold text-primary-700 mb-3">Mengapa Memilih Kami</h3>
              <SectionListEditor
                label="Item Keunggulan"
                fields={[
                  { key: "title", label: "Judul", type: "text", placeholder: "Personel Terlatih" },
                  { key: "description", label: "Deskripsi", type: "textarea", placeholder: "Seluruh personel kami telah menjalani pelatihan intensif" },
                ]}
                items={(sections.why_choose_us || []) as SectionItem[]}
                onChange={(items) => setSections({ ...sections, why_choose_us: items })}
              />
            </div>
          )}

          {isTentangKami && (
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold text-primary-700 mb-3">Gambar Halaman</h3>
              <ImageUpload
                label="Gambar Tentang Kami"
                value={imageUrl ? `/api/uploads/${imageUrl.replace(/^\/uploads\//, "")}` : undefined}
                onChange={(filename) => setImageUrl(filename)}
              />
            </div>
          )}

          {isTentangKami && (
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold text-primary-700 mb-3">Visi & Misi</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visi</label>
                  <textarea
                    value={sections.vision || ""}
                    onChange={(e) => setSections({ ...sections, vision: e.target.value })}
                    placeholder="Menjadi perusahaan jasa keamanan terpercaya dan profesional..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-sm"
                    rows={3}
                  />
                </div>
                <TextListEditor
                  label="Poin Misi"
                  items={sections.mission_items || []}
                  onChange={(items) => setSections({ ...sections, mission_items: items })}
                  placeholder="Menyediakan tenaga keamanan terlatih dan profesional"
                />
              </div>
            </div>
          )}

          {isTentangKami && (
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold text-primary-700 mb-3">Nilai-Nilai Perusahaan</h3>
              <SectionListEditor
                label="Nilai"
                fields={[
                  { key: "title", label: "Judul", type: "text", placeholder: "Integritas" },
                  { key: "description", label: "Deskripsi", type: "textarea", placeholder: "Jujur dan bertanggung jawab dalam setiap tindakan" },
                  { key: "icon", label: "Ikon", type: "icon" },
                ]}
                items={(sections.values || []) as SectionItem[]}
                onChange={(items) => setSections({ ...sections, values: items })}
              />
            </div>
          )}

          {isLegalitas && (
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold text-primary-700 mb-3">Dokumen Legalitas</h3>
              <SectionListEditor
                label="Dokumen"
                fields={[
                  { key: "title", label: "Judul", type: "text", placeholder: "Akta Pendirian Perusahaan" },
                  { key: "description", label: "Deskripsi", type: "textarea", placeholder: "Nomor: 234/2020, Notaris: Budi Santoso, S.H." },
                  { key: "icon", label: "Ikon", type: "icon" },
                ]}
                items={(sections.documents || []) as SectionItem[]}
                onChange={(items) => setSections({ ...sections, documents: items })}
              />
            </div>
          )}

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