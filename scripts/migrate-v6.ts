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

  console.log("Starting v6 migration: Add phone column to contact_messages...\n");

  try {
    await connection.query(
      "ALTER TABLE contact_messages ADD COLUMN phone VARCHAR(50) AFTER email"
    );
    console.log("✓ Added phone column to contact_messages");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("Duplicate column name")) {
      console.log("✓ phone column already exists, skipping");
    } else {
      throw err;
    }
  }

  console.log("\nMigration v6 complete!");
  await connection.end();
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
