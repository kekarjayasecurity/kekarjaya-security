import { query } from "@/lib/db";
import type { Service } from "@/types";
import LayananClient from "./LayananClient";

async function getServices() {
  try {
    return await query<Service>("SELECT * FROM services ORDER BY sort_order");
  } catch {
    return [];
  }
}

export default async function LayananPage() {
  const services = await getServices();
  const list = Array.isArray(services) ? services : [];

  return <LayananClient services={list} />;
}