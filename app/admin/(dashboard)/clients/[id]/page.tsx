"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ImageUpload from "@/components/ui/ImageUpload";

export default function AdminClientFormPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const isNew = id === "new";

  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (!isNew) {
      fetch("/api/admin/clients")
        .then((res) => res.json())
        .then((data) => {
          const found = (Array.isArray(data) ? data : []).find((c: { id: number }) => String(c.id) === id);
          if (found) {
            setName(found.name);
            setLogoUrl(found.logo_url || "");
            setWebsiteUrl(found.website_url || "");
            setSortOrder(found.sort_order || 0);
            setIsActive(found.is_active !== undefined ? found.is_active : true);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id, isNew]);

  async function handleSave() {
    setSaving(true);
    try {
      const body = { name, logo_url: logoUrl, website_url: websiteUrl, sort_order: sortOrder, is_active: isActive };
      if (isNew) {
        const res = await fetch("/api/admin/clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.ok) router.push("/admin/clients");
      } else {
        const res = await fetch(`/api/admin/clients/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.ok) router.push("/admin/clients");
      }
    } catch {}
    setSaving(false);
  }

  if (loading) return <p>Memuat...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-700">
          {isNew ? "Tambah Klien" : "Edit Klien"}
        </h1>
        <Button variant="outline" onClick={() => router.push("/admin/clients")}>
          Kembali
        </Button>
      </div>
      <Card className="p-6">
        <div className="space-y-4">
          <Input label="Nama Klien" value={name} onChange={(e) => setName(e.target.value)} />
          <ImageUpload
            label="Logo Klien"
            value={logoUrl || undefined}
            onChange={(filename) => setLogoUrl(filename)}
          />
          <Input label="Website URL" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://example.com" />
          <Input label="Urutan" type="number" value={String(sortOrder)} onChange={(e) => setSortOrder(Number(e.target.value))} />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 text-accent-500 border-gray-300 rounded focus:ring-accent-500"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Aktif</label>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </Card>
    </div>
  );
}