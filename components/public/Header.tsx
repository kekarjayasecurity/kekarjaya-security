"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getIconPath } from "@/lib/icons";

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string | null;
}

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/layanan", label: "Layanan", hasDropdown: true },
  { href: "/legalitas", label: "Legalitas" },
  { href: "/struktur-organisasi", label: "Struktur Organisasi" },
  { href: "/faq", label: "FAQ" },
  { href: "/galeri", label: "Galeri" },
  { href: "/blog", label: "Blog" },
  { href: "/kontak", label: "Kontak" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/admin/services")
      .then((r) => r.json())
      .then((d) => setServices(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/images/logo.png"
              alt="PT Kekar Jaya Security"
              className="w-10 h-10 object-contain"
            />
            <div>
              <span className="font-bold text-primary-700 text-lg">
                Kekar Jaya
              </span>
              <span className="block text-xs text-gray-500 -mt-1">
                Security
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center gap-1 ${
                      pathname.startsWith("/layanan")
                        ? "bg-primary-700 text-white"
                        : "text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                    }`}
                  >
                    {link.label}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath("chevron-down")!} />
                    </svg>
                  </Link>
                  {servicesOpen && services.length > 0 && (
                    <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {services.map((svc) => (
                        <Link
                          key={svc.id}
                          href={`/layanan/${svc.slug}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                        >
                          {svc.title}
                        </Link>
                      ))}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <Link
                          href="/layanan"
                          className="block px-4 py-2 text-sm text-accent-500 font-medium hover:bg-accent-50 transition-colors"
                        >
                          Lihat Semua Layanan
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-primary-700 text-white"
                      : "text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath("x")!} />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath("menu")!} />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.href}>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${
                      pathname.startsWith("/layanan")
                        ? "bg-primary-700 text-white"
                        : "text-gray-700 hover:bg-primary-50"
                    }`}
                  >
                    {link.label}
                    <svg
                      className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath("chevron-down")!} />
                    </svg>
                  </button>
                  {mobileServicesOpen && (
                    <div className="ml-4 space-y-1 mt-1">
                      {services.map((svc) => (
                        <Link
                          key={svc.id}
                          href={`/layanan/${svc.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-700"
                        >
                          {svc.title}
                        </Link>
                      ))}
                      <Link
                        href="/layanan"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 rounded-md text-sm text-accent-500 font-medium hover:bg-accent-50"
                      >
                        Semua Layanan
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === link.href
                      ? "bg-primary-700 text-white"
                      : "text-gray-700 hover:bg-primary-50"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
