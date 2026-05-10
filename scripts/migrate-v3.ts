import "dotenv/config";
import mysql from "mysql2/promise";

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "kekarjaya_security",
    multipleStatements: true,
  });

  try {
    await connection.query("ALTER TABLE `pages` ADD COLUMN `sections` JSON DEFAULT NULL AFTER `image_url`");
    console.log("✓ Added sections JSON column to pages");
  } catch (err: any) {
    if (err.code === "DUPLICATE_COLUMN") console.log("• sections column already exists in pages");
    else throw err;
  }

  console.log("\n🎉 Migrasi v3 berhasil!");
  await connection.end();
}

migrate().catch((err) => {
  console.error("Migrasi gagal:", err);
  process.exit(1);
});