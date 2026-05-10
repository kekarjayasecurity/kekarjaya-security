import "dotenv/config";
import mysql from "mysql2/promise";
import { getIconNameFromPath } from "./icon-migration-map";

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "kekarjaya_security",
    multipleStatements: true,
  });

  console.log("Starting v4 migration: Convert SVG paths to icon names...\n");

  // Migrate services.icon — convert SVG path strings to icon names
  const [services] = await connection.query("SELECT id, icon FROM services") as [Array<{id: number; icon: string | null}>, any];
  let servicesUpdated = 0;
  for (const svc of services) {
    if (!svc.icon) continue;
    const iconName = getIconNameFromPath(svc.icon);
    if (iconName && iconName !== svc.icon) {
      await connection.query("UPDATE services SET icon = ? WHERE id = ?", [iconName, svc.id]);
      servicesUpdated++;
    }
  }
  console.log(`✓ Migrated ${servicesUpdated} service icons`);

  // Migrate pages.sections — convert icon fields in JSON from SVG paths to icon names
  const [pages] = await connection.query("SELECT id, sections FROM pages WHERE sections IS NOT NULL") as [Array<{id: number; sections: string | null}>, any];
  let pagesUpdated = 0;
  for (const page of pages) {
    if (!page.sections) continue;
    let sections: Record<string, unknown>;
    try {
      sections = typeof page.sections === "string" ? JSON.parse(page.sections) : page.sections;
    } catch {
      continue;
    }

    let changed = false;

    // Convert icon fields in arrays (why_choose_us, values, documents)
    for (const key of ["why_choose_us", "values", "documents"]) {
      const items = sections[key];
      if (!Array.isArray(items)) continue;
      for (const item of items) {
        if (typeof item === "object" && item !== null && "icon" in item && typeof item.icon === "string") {
          const iconName = getIconNameFromPath(item.icon);
          if (iconName && iconName !== item.icon) {
            item.icon = iconName;
            changed = true;
          }
        }
      }
    }

    if (changed) {
      await connection.query("UPDATE pages SET sections = ? WHERE id = ?", [JSON.stringify(sections), page.id]);
      pagesUpdated++;
    }
  }
  console.log(`✓ Migrated ${pagesUpdated} page sections`);

  console.log("\n🎉 Migrasi v4 berhasil!");
  await connection.end();
}

migrate().catch((err) => {
  console.error("Migrasi gagal:", err);
  process.exit(1);
});