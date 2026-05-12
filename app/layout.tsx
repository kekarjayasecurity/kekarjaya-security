import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PT Kekar Jaya Security - Jasa Keamanan Profesional",
  description:
    "PT Kekar Jaya Security menyediakan layanan keamanan profesional untuk perusahaan dan individu. Keamanan terpercaya dengan tenaga terlatih.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
