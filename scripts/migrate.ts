import "dotenv/config";
import mysql from "mysql2/promise";
import * as fs from "fs";
import * as path from "path";

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "kekarjaya_security",
    multipleStatements: true,
  });

  const sqlPath = path.join(__dirname, "schema.sql");
  const sql = fs.readFileSync(sqlPath, "utf8");

  await connection.query(sql);

  console.log("Migrasi database berhasil!");
  await connection.end();
}

migrate().catch((err) => {
  console.error("Migrasi gagal:", err);
  process.exit(1);
});
