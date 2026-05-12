import Link from "next/link";
import { queryOne } from "@/lib/db";
import { getIconPath } from "@/lib/icons";
import type { Page } from "@/types";

const footerLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/layanan", label: "Layanan" },
  { href: "/legalitas", label: "Legalitas" },
  { href: "/struktur-organisasi", label: "Struktur Organisasi" },
  { href: "/faq", label: "FAQ" },
  { href: "/galeri", label: "Galeri" },
  { href: "/blog", label: "Blog" },
  { href: "/kontak", label: "Kontak" },
];

interface ContactSection {
  address?: string;
  phone?: string;
  email?: string;
  map_url?: string;
}

async function getContactInfo(): Promise<ContactSection> {
  try {
    const page = await queryOne<Page>("SELECT * FROM pages WHERE slug = ?", ["kontak"]);
    if (page && typeof page.sections === "string") {
      page.sections = JSON.parse(page.sections);
    }
    return (page?.sections as { contact?: ContactSection } | null)?.contact || {};
  } catch {
    return {};
  }
}

export default async function Footer() {
  const contact = await getContactInfo();

  return (
    <footer className="bg-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">KJ</span>
              </div>
              <div>
                <span className="font-bold text-lg">Kekar Jaya</span>
                <span className="block text-xs text-gray-300 -mt-1">
                  Security
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Penyedia layanan keamanan profesional dan terpercaya untuk
              melindungi aset dan keselamatan Anda.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Navigasi</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Kontak</h3>
            <div className="space-y-3 text-sm text-gray-300">
              {contact.address && (
                <div className="flex items-start space-x-2">
                  <svg
                    className="w-5 h-5 mt-0.5 text-accent-400 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={getIconPath("map-pin")!}
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={getIconPath("map-pin-inner")!}
                    />
                  </svg>
                  <span>{contact.address}</span>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-accent-400 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={getIconPath("phone")!}
                    />
                  </svg>
                  <span>{contact.phone}</span>
                </div>
              )}
              {contact.email && (
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-accent-400 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={getIconPath("mail")!}
                    />
                  </svg>
                  <span>{contact.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-600 mt-8 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} PT Kekar Jaya Security. Hak cipta
          dilindungi undang-undang.
        </div>
      </div>
    </footer>
  );
}
