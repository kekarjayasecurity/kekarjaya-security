"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ImageUpload from "@/components/ui/ImageUpload";

export default function AdminOrganizationPage() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/admin/pages")
      .then((r) => r.json())
      .then((d) => {
        const found = (Array.isArray(d) ? d : []).find((p: { slug: string }) => p.slug === "struktur-organisasi");
        if (found && found.content) {
          setImage(found.content);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setSuccess(false);
    try {
      const pages = await fetch("/api/admin/pages").then((r) => r.json());
      const found = (Array.isArray(pages) ? pages : []).find((p: { slug: string }) => p.slug === "struktur-organisasi");
      if (found) {
        await fetch(`/api/admin/pages/${found.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "Struktur Organisasi", content: image }),
        });
      }
      setSuccess(true);
    } catch {}
    setSaving(false);
  }

  if (loading) return <p>Memuat...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-700 mb-6">Struktur Organisasi</h1>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
          Gambar struktur organisasi berhasil disimpan
        </div>
      )}

      <Card className="p-6">
        <div className="space-y-4">
          <ImageUpload
            value={image || undefined}
            onChange={(filename) => setImage(`/uploads/${filename}`)}
            label="Gambar Struktur Organisasi"
          />

          {image && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Pratinjau:</p>
              <img
                src={image}
                alt="Struktur Organisasi"
                className="max-w-md w-full h-auto rounded-lg border border-gray-200"
              />
            </div>
          )}

          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
