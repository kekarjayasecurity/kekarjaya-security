import Link from "next/link";
import { query } from "@/lib/db";
import type { Service, Page, Client } from "@/types";
import BerandaClient from "./BerandaClient";

async function getHomeData() {
  try {
    const services = await query<Service>(
      "SELECT * FROM services ORDER BY sort_order LIMIT 6"
    );
    const page = await queryOne<Page>(
      "SELECT * FROM pages WHERE slug = 'beranda'"
    );
    const clients = await query<Client>(
      "SELECT * FROM clients WHERE is_active = 1 ORDER BY sort_order"
    );
    const parsedPage = page
      ? { ...page, sections: typeof page.sections === "string" ? JSON.parse(page.sections) : page.sections }
      : null;
    return {
      services: Array.isArray(services) ? services : [],
      page: parsedPage,
      clients: Array.isArray(clients) ? clients : [],
    };
  } catch {
    return { services: [], page: null, clients: [] };
  }
}

async function queryOne<T>(sql: string, params?: any[]): Promise<T | null> {
  const results = await query<T>(sql, params);
  return results[0] || null;
}

export default async function BerandaPage() {
  const { services, page, clients } = await getHomeData();

  return (
    <BerandaClient
      services={services}
      page={page}
      clients={clients}
    />
  );
}