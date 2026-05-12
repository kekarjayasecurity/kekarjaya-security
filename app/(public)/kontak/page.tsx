import { queryOne } from "@/lib/db";
import type { Page } from "@/types";
import KontakClient from "./KontakClient";

export const revalidate = 3600;

interface ContactSection {
  address?: string;
  phone?: string;
  email?: string;
  map_url?: string;
}

async function getKontakPage() {
  try {
    const page = await queryOne<Page>("SELECT * FROM pages WHERE slug = ?", ["kontak"]);
    if (page && typeof page.sections === "string") {
      page.sections = JSON.parse(page.sections);
    }
    return page;
  } catch {
    return null;
  }
}

export default async function KontakPage() {
  const page = await getKontakPage();
  const contact = (page?.sections as { contact?: ContactSection } | null)?.contact || {};

  return <KontakClient contact={contact} />;
}
