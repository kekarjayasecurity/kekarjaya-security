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
    await connection.query("ALTER TABLE `pages` ADD COLUMN `hero_image_url` VARCHAR(255) AFTER `content`");
    console.log("✓ Added hero_image_url to pages");
  } catch (err: any) {
    if (err.code === "DUPLICATE_COLUMN") console.log("• hero_image_url already exists in pages");
    else throw err;
  }

  try {
    await connection.query("ALTER TABLE `pages` ADD COLUMN `hero_title` VARCHAR(255) AFTER `hero_image_url`");
    console.log("✓ Added hero_title to pages");
  } catch (err: any) {
    if (err.code === "DUPLICATE_COLUMN") console.log("• hero_title already exists in pages");
    else throw err;
  }

  try {
    await connection.query("ALTER TABLE `pages` ADD COLUMN `hero_subtitle` VARCHAR(255) AFTER `hero_title`");
    console.log("✓ Added hero_subtitle to pages");
  } catch (err: any) {
    if (err.code === "DUPLICATE_COLUMN") console.log("• hero_subtitle already exists in pages");
    else throw err;
  }

  try {
    await connection.query("ALTER TABLE `pages` ADD COLUMN `image_url` VARCHAR(255) AFTER `hero_subtitle`");
    console.log("✓ Added image_url to pages");
  } catch (err: any) {
    if (err.code === "DUPLICATE_COLUMN") console.log("• image_url already exists in pages");
    else throw err;
  }

  try {
    await connection.query("ALTER TABLE `services` ADD COLUMN `image_url` VARCHAR(255) AFTER `icon`");
    console.log("✓ Added image_url to services");
  } catch (err: any) {
    if (err.code === "DUPLICATE_COLUMN") console.log("• image_url already exists in services");
    else throw err;
  }

  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`clients\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`name\` VARCHAR(255) NOT NULL,
        \`logo_url\` VARCHAR(255),
        \`website_url\` VARCHAR(255),
        \`sort_order\` INT DEFAULT 0,
        \`is_active\` BOOLEAN DEFAULT TRUE,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✓ Created clients table");
  } catch (err: any) {
    if (err.code === "ER_TABLE_EXISTS_ERROR") console.log("• clients table already exists");
    else throw err;
  }

  console.log("\n🎉 Migrasi v2 berhasil!");
  await connection.end();
}

migrate().catch((err) => {
  console.error("Migrasi gagal:", err);
  process.exit(1);
});