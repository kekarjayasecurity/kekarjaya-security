"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getIconPath } from "@/lib/icons";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: "home" },
  { href: "/admin/pages", label: "Halaman", icon: "document-text" },
  { href: "/admin/services", label: "Layanan", icon: "shield-check" },
  { href: "/admin/blog", label: "Blog", icon: "newspaper" },
  { href: "/admin/gallery", label: "Galeri", icon: "photograph" },
  { href: "/admin/faq", label: "FAQ", icon: "help-circle" },
  { href: "/admin/organization", label: "Organisasi", icon: "users" },
  { href: "/admin/clients", label: "Klien", icon: "building" },
  { href: "/admin/messages", label: "Pesan", icon: "mail" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="w-64 bg-primary-800 text-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-primary-600">
        <Link href="/admin" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">KJ</span>
          </div>
          <div>
            <span className="font-bold text-sm">Kekar Jaya</span>
            <span className="block text-xs text-gray-300 -mt-1">Admin Panel</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const iconPath = getIconPath(item.icon);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-primary-600 text-white"
                  : "text-gray-300 hover:bg-primary-700 hover:text-white"
              }`}
            >
              {iconPath && (
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
                </svg>
              )}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primary-600">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-primary-700 hover:text-white w-full transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath("logout")!} />
          </svg>
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}