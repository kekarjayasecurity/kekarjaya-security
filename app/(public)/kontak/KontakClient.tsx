"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getIconPath } from "@/lib/icons";

interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
  map_url?: string;
}

interface KontakClientProps {
  contact: ContactInfo;
}

export default function KontakClient({ contact }: KontakClientProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan");
        return;
      }

      setSuccess(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setError("Terjadi kesalahan koneksi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <AnimatedSection variant="fadeInUp">
        <h1 className="text-4xl font-bold text-primary-700 mb-4">Kontak Kami</h1>
        <p className="text-gray-600 mb-12">
          Hubungi kami untuk konsultasi atau pertanyaan mengenai layanan keamanan.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <AnimatedSection variant="fadeInLeft">
          <div>
            <h2 className="text-xl font-bold text-primary-700 mb-6">
              Kirim Pesan
            </h2>

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                Pesan Anda berhasil terkirim! Kami akan segera menghubungi Anda.
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nama"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                label="Nomor Telepon"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Input
                label="Subjek"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
              />
              <Textarea
                label="Pesan"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Mengirim..." : "Kirim Pesan"}
              </Button>
            </form>
          </div>
        </AnimatedSection>

        <AnimatedSection variant="fadeInRight" delay={0.2}>
          <div>
            <h2 className="text-xl font-bold text-primary-700 mb-6">
              Informasi Kontak
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath("map-pin")!} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath("map-pin-inner")!} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-primary-700">Alamat</h3>
                  <p className="text-gray-600 text-sm">{contact.address || "-"}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath("phone")!} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-primary-700">Telepon</h3>
                  <p className="text-gray-600 text-sm">{contact.phone || "-"}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath("mail")!} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-primary-700">Email</h3>
                  <p className="text-gray-600 text-sm">{contact.email || "-"}</p>
                </div>
              </div>
            </div>

            {contact.map_url && (
              <div className="mt-8 rounded-lg overflow-hidden bg-gray-200 h-64">
                <iframe
                  src={contact.map_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi PT Kekar Jaya Security"
                />
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
