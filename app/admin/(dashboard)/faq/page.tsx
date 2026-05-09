"use client";

import { useState, useEffect } from "react";
import type { Faq } from "@/types";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Modal from "@/components/ui/Modal";

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => { loadFaqs(); }, []);

  function loadFaqs() {
    fetch("/api/admin/faq").then((r) => r.json()).then((d) => { setFaqs(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
  }

  function openAdd() { setEditId(null); setQuestion(""); setAnswer(""); setSortOrder(0); setModalOpen(true); }
  function openEdit(faq: Faq) { setEditId(faq.id); setQuestion(faq.question); setAnswer(faq.answer); setSortOrder(faq.sort_order); setModalOpen(true); }

  async function handleSave() {
    if (!question || !answer) return;
    const url = editId ? `/api/admin/faq/${editId}` : "/api/admin/faq";
    const method = editId ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question, answer, sort_order: sortOrder }) });
    setModalOpen(false);
    loadFaqs();
  }

  async function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus FAQ ini?")) return;
    await fetch(`/api/admin/faq/${id}`, { method: "DELETE" });
    loadFaqs();
  }

  if (loading) return <p>Memuat...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-700">FAQ</h1>
        <Button onClick={openAdd}>Tambah FAQ</Button>
      </div>
      <Card>
        <Table headers={["#", "Pertanyaan", "Jawaban", "Urutan", "Aksi"]}>
          {faqs.map((faq, idx) => (
            <tr key={faq.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
              <td className="px-4 py-3 font-medium max-w-xs truncate">{faq.question}</td>
              <td className="px-4 py-3 text-gray-500 text-sm max-w-xs truncate">{faq.answer}</td>
              <td className="px-4 py-3 text-gray-500">{faq.sort_order}</td>
              <td className="px-4 py-3 space-x-2">
                <button onClick={() => openEdit(faq)} className="text-accent-500 text-sm font-medium">Edit</button>
                <button onClick={() => handleDelete(faq.id)} className="text-red-500 text-sm font-medium">Hapus</button>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? "Edit FAQ" : "Tambah FAQ"}>
        <div className="space-y-4">
          <Input label="Pertanyaan" value={question} onChange={(e) => setQuestion(e.target.value)} />
          <Textarea label="Jawaban" value={answer} onChange={(e) => setAnswer(e.target.value)} />
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
