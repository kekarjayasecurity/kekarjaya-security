"use client";

import { useState, useEffect } from "react";
import type { OrganizationMember } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import ImageUpload from "@/components/ui/ImageUpload";

export default function AdminOrganizationPage() {
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Image section state
  const [image, setImage] = useState("");
  const [imageSaving, setImageSaving] = useState(false);
  const [imageSuccess, setImageSuccess] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [photo, setPhoto] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    Promise.all([
      fetch("/api/admin/pages").then((r) => r.json()),
      fetch("/api/admin/organization").then((r) => r.json()),
    ]).then(([pagesData, membersData]) => {
      const found = (Array.isArray(pagesData) ? pagesData : []).find(
        (p: { slug: string }) => p.slug === "struktur-organisasi"
      );
      if (found && found.content) {
        setImage(found.content);
      }
      setMembers(Array.isArray(membersData) ? membersData : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }

  async function handleImageSave() {
    setImageSaving(true);
    setImageSuccess(false);
    try {
      const pages = await fetch("/api/admin/pages").then((r) => r.json());
      const found = (Array.isArray(pages) ? pages : []).find(
        (p: { slug: string }) => p.slug === "struktur-organisasi"
      );
      if (found) {
        await fetch(`/api/admin/pages/${found.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "Struktur Organisasi", content: image }),
        });
        setImageSuccess(true);
      }
    } catch {}
    setImageSaving(false);
  }

  // Modal handlers
  function openAdd() {
    setEditId(null);
    setName("");
    setPosition("");
    setPhoto("");
    setSortOrder(members.length);
    setModalOpen(true);
  }

  function openEdit(member: OrganizationMember) {
    setEditId(member.id);
    setName(member.name);
    setPosition(member.position);
    setPhoto(member.photo || "");
    setSortOrder(member.sort_order);
    setModalOpen(true);
  }

  async function handleSave() {
    if (!name || !position) return;
    setSaving(true);
    try {
      const url = editId ? `/api/admin/organization/${editId}` : "/api/admin/organization";
      const method = editId ? "PUT" : "POST";
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, position, photo: photo || null, sort_order: sortOrder }),
      });
      setModalOpen(false);
      loadData();
    } catch {}
    setSaving(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus anggota ini?")) return;
    await fetch(`/api/admin/organization/${id}`, { method: "DELETE" });
    loadData();
  }

  async function handleMoveUp(index: number) {
    if (index === 0) return;
    const member = members[index];
    const prev = members[index - 1];
    await Promise.all([
      fetch(`/api/admin/organization/${member.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: member.name, position: member.position, photo: member.photo, sort_order: prev.sort_order }),
      }),
      fetch(`/api/admin/organization/${prev.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: prev.name, position: prev.position, photo: prev.photo, sort_order: member.sort_order }),
      }),
    ]);
    loadData();
  }

  async function handleMoveDown(index: number) {
    if (index === members.length - 1) return;
    const member = members[index];
    const next = members[index + 1];
    await Promise.all([
      fetch(`/api/admin/organization/${member.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: member.name, position: member.position, photo: member.photo, sort_order: next.sort_order }),
      }),
      fetch(`/api/admin/organization/${next.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: next.name, position: next.position, photo: next.photo, sort_order: member.sort_order }),
      }),
    ]);
    loadData();
  }

  if (loading) return <p>Memuat...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-700 mb-6">Struktur Organisasi</h1>

      {/* Image Section */}
      {imageSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
          Gambar struktur organisasi berhasil disimpan
        </div>
      )}

      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-primary-700 mb-3">Gambar Struktur Organisasi</h2>
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
          <Button onClick={handleImageSave} disabled={imageSaving}>
            {imageSaving ? "Menyimpan..." : "Simpan Gambar"}
          </Button>
        </div>
      </Card>

      {/* Members Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary-700">Tim Kepemimpinan</h2>
          <Button onClick={openAdd}>Tambah Anggota</Button>
        </div>

        {members.length === 0 ? (
          <p className="text-gray-400 text-sm italic">Belum ada anggota. Klik &quot;Tambah Anggota&quot; untuk menambahkan.</p>
        ) : (
          <div className="space-y-3">
            {members.map((member, index) => (
              <div key={member.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden shrink-0">
                  {member.photo ? (
                    <img
                      src={`/uploads/${member.photo.replace(/^\/uploads\//, "")}`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-primary-700 truncate">{member.name}</div>
                  <div className="text-sm text-gray-500 truncate">{member.position}</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-sm px-1"
                    title="Pindah ke atas"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === members.length - 1}
                    className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-sm px-1"
                    title="Pindah ke bawah"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => openEdit(member)}
                    className="text-accent-500 hover:text-accent-600 text-sm font-medium px-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="text-red-500 hover:text-red-600 text-sm font-medium px-2"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? "Edit Anggota" : "Tambah Anggota"}>
        <div className="space-y-4">
          <Input label="Nama" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Jabatan" value={position} onChange={(e) => setPosition(e.target.value)} required />
          <ImageUpload
            label="Foto"
            value={photo ? `/uploads/${photo.replace(/^\/uploads\//, "")}` : undefined}
            onChange={(filename) => setPhoto(filename)}
          />
          <Input label="Urutan" type="number" value={String(sortOrder)} onChange={(e) => setSortOrder(Number(e.target.value))} />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>Batal</Button>
            <Button onClick={handleSave} disabled={saving || !name || !position}>
              {saving ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}