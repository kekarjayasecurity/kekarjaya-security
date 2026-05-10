import { queryOne } from "@/lib/db";

export const revalidate = 3600;
import type { Page } from "@/types";
import LegalitasClient from "./LegalitasClient";

async function getPage() {
  try {
    const page = await queryOne<Page>("SELECT * FROM pages WHERE slug = 'legalitas'");
    if (!page) return null;
    return { ...page, sections: typeof page.sections === "string" ? JSON.parse(page.sections) : page.sections };
  } catch {
    return null;
  }
}

export default async function LegalitasPage() {
  const page = await getPage();

  return <LegalitasClient page={page} />;
}