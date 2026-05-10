import { queryOne, query } from "@/lib/db";

export const revalidate = 3600;
import type { Page, OrganizationMember } from "@/types";
import TentangKamiClient from "./TentangKamiClient";

async function getPage() {
  try {
    const page = await queryOne<Page>("SELECT * FROM pages WHERE slug = 'tentang-kami'");
    if (!page) return null;
    return { ...page, sections: typeof page.sections === "string" ? JSON.parse(page.sections) : page.sections };
  } catch {
    return null;
  }
}

async function getMembers() {
  try {
    return await query<OrganizationMember>("SELECT * FROM organization_members ORDER BY sort_order");
  } catch {
    return [];
  }
}

export default async function TentangKamiPage() {
  const page = await getPage();
  const members = await getMembers();
  const memberList = Array.isArray(members) ? members : [];

  return <TentangKamiClient page={page} members={memberList} />;
}