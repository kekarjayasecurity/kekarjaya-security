import "dotenv/config";
import mysql from "mysql2/promise";
import path from "path";
import fs from "fs";

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "kekarjaya_security",
    multipleStatements: true,
  });

  console.log("Starting v5 migration: Copy files from public/uploads to persistent UPLOAD_DIR...\n");

  const sourceDir = path.join(process.cwd(), "public", "uploads");
  const targetDir = process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads");

  if (!fs.existsSync(sourceDir)) {
    console.log("No public/uploads directory found. Nothing to migrate.");
    await connection.end();
    return;
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const files = fs.readdirSync(sourceDir).filter((f) => fs.statSync(path.join(sourceDir, f)).isFile());

  let copiedCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    const srcPath = path.join(sourceDir, file);
    const destPath = path.join(targetDir, file);

    if (fs.existsSync(destPath)) {
      console.log(`  Skipping (already exists): ${file}`);
      skippedCount++;
      continue;
    }

    fs.copyFileSync(srcPath, destPath);
    console.log(`  Copied: ${file}`);
    copiedCount++;
  }

  console.log(`\nMigration complete: ${copiedCount} files copied, ${skippedCount} files skipped.`);
  await connection.end();
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});