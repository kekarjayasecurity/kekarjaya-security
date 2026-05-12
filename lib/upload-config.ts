import path from "path";
import { mkdir, unlink } from "fs/promises";

export function getUploadDir(): string {
  const dir = process.env.UPLOAD_DIR;
  if (dir) return dir;
  return path.join(process.cwd(), "public", "uploads");
}

export function getUploadPath(filename: string): string {
  return path.join(getUploadDir(), filename);
}

export function getUploadUrl(filename: string): string {
  const bare = filename.replace(/^\/uploads\//, "");
  return `/api/uploads/${bare}`;
}

// Re-export for backward compatibility in server-side code
export { getImageUrl } from "./image-url";

export async function ensureUploadDir(): Promise<void> {
  await mkdir(getUploadDir(), { recursive: true });
}

export async function deleteUploadedFile(filename: string): Promise<void> {
  const bare = filename.replace(/^\/uploads\//, "");
  const filepath = path.join(getUploadDir(), bare);
  try {
    await unlink(filepath);
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "code" in err && (err as NodeJS.ErrnoException).code === "ENOENT") {
      console.warn(`File not found for deletion: ${filepath}`);
    } else {
      throw err;
    }
  }
}