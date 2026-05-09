"use client";

import { useState, useEffect } from "react";
import type { OrganizationMember } from "@/types";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ImageUpload from "@/components/ui/ImageUpload";
import Modal from "@/components/ui/Modal";

export default function AdminOrganizationPage() {
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [photo, setPhoto] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => { loadMembers(); }, []);

  function loadMembers() {
    fetch("/api/admin/organization").then((r) => r.json()).then((d) => { setMembers(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
  }

  function openAdd() { setEditId(null); setName(""); setPosition(""); setPhoto(""); setSortOrder(0); setModalOpen(true); }
  function openEdit(m: OrganizationMember) { setEditId(m.id); setName(m.name); setPosition(m.position); setPhoto(m.photo || ""); setSortOrder(m.sort_order); setModalOpen(true); }

  async function handleSave() {
    if (!name || !position) return;
    const url = editId ? `/api/admin/organization/${editId}` : "/api/admin/organization";
    const method = editId ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, position, photo, sort_order: sortOrder }) });
    setModalOpen(false);
    loadMembers();
  }

  async function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus anggota ini?")) return;
    await fetch(`/api/admin/organization/${id}`, { method: "DELETE" });
    loadMembers();
  }

  if (loading) return <p>Memuat...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-700">Struktur Organisasi</h1>
        <Button onClick={openAdd}>Tambah Anggota</Button>
      </div>
      <Card>
        <Table headers={["Foto", "Nama", "Jabatan", "Urutan", "Aksi"]}>
          {members.map((m) => (
            <tr key={m.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">
                {m.photo ? <img src={`/uploads/${m.photo}`} alt={m.name} className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">{m.name.charAt(0)}</div>}
              </td>
              <td className="px-4 py-3 font-medium">{m.name}</td>
              <td className="px-4 py-3 text-gray-500">{m.position}</td>
              <td className="px-4 py-3 text-gray-500">{m.sort_order}</td>
              <td className="px-4 py-3 space-x-2">
                <button onClick={() => openEdit(m)} className="text-accent-500 text-sm font-medium">Edit</button>
                <button onClick={() => handleDelete(m.id)} className="text-red-500 text-sm font-medium">Hapus</button>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? "Edit Anggota" : "Tambah Anggota"}>
        <div className="space-y-4">
          <Input label="Nama" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Jabatan" value={position} onChange={(e) => setPosition(e.target.value)} />
          <ImageUpload value={photo ? `/uploads/${photo}` : undefined} onChange={setPhoto} label="Foto" />
          <Input label="Urutan" type="number" value={String(sortOrder)} onChange={(e) => setSortOrder(Number(e.target.value))} />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>Batal</Button>
            <Button onClick={handleSave}>Simpan</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
