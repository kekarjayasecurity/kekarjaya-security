## 1. Persistent Upload Directory Setup

- [x] 1.1 Add `UPLOAD_DIR` environment variable to `.env.example` and `.env` (defaults to `public/uploads` for dev, document production path like `/home/u843025186/uploads`)
- [x] 1.2 Create `lib/upload-config.ts` module that resolves the upload directory from `UPLOAD_DIR` env var with fallback to `public/uploads`, and provides helper for constructing the API URL prefix
- [x] 1.3 Create the persistent upload directory on the Hostinger server (document in README or deployment notes)

## 2. Upload API Rewrite

- [x] 2.1 Rewrite `/app/api/admin/upload/route.ts` to write files to the `UPLOAD_DIR` path (from `lib/upload-config.ts`) instead of hardcoded `public/uploads`
- [x] 2.2 Keep file type validation (JPEG, PNG, GIF, WebP) and 5MB size limit intact
- [x] 2.3 Ensure the upload directory is created with `{ recursive: true }` if it doesn't exist

## 3. File Serving API Route

- [x] 3.1 Create `/app/api/uploads/[filename]/route.ts` with a GET handler that reads files from `UPLOAD_DIR`, sets appropriate `Content-Type` header, and returns the file with `Cache-Control: public, max-age=31536000`
- [x] 3.2 Return 404 for non-existent files
- [x] 3.3 Add security: only serve allowed file extensions (jpeg, jpg, png, gif, webp) and prevent path traversal

## 4. Frontend URL Convention Update

- [x] 4.1 Update `ImageUpload` component to construct preview URLs as `/api/uploads/{filename}` instead of `/uploads/{filename}`
- [x] 4.2 Update `ImageUpload` to handle legacy values: if `value` starts with `/uploads/`, strip the prefix and use `/api/uploads/{filename}`; if `value` is a bare filename, use `/api/uploads/{value}`
- [x] 4.3 Search and update all admin pages and public pages that construct `/uploads/` URLs to use `/api/uploads/` instead (or use the helper from `lib/upload-config.ts`)
- [x] 4.4 Update the Header component's service image references if they use uploaded file paths

## 5. Asset Deletion from Persistent Storage

- [x] 5.1 Update admin API DELETE handlers for gallery photos to also delete the file from `UPLOAD_DIR` using `fs.unlink`
- [x] 5.2 Update admin API DELETE/update handlers for services to delete associated image files from `UPLOAD_DIR`
- [x] 5.3 Update admin API DELETE/update handlers for blog posts, organization members, and clients to clean up uploaded files from `UPLOAD_DIR` when images are replaced or removed
- [x] 5.4 Handle `ENOENT` errors gracefully (file already gone) — log warning but don't fail the request

## 6. On-Demand Revalidation

- [x] 6.1 Add `export const revalidate = 3600` to all public server component pages (homepage, tentang-kami, layanan, layanan/[slug], legalitas, struktur-organisasi, faq, galeri, blog, blog/[slug])
- [x] 6.2 Create a `lib/revalidation.ts` helper module with functions mapping content types to their revalidation paths (e.g., `revalidateContentType('pages', 'beranda')` → `revalidatePath('/')`)
- [x] 6.3 Add `revalidatePath()` calls to `/app/api/admin/pages/route.ts` (POST, PUT, DELETE)
- [x] 6.4 Add `revalidatePath()` calls to `/app/api/admin/services/route.ts` (POST, PUT, DELETE)
- [x] 6.5 Add `revalidatePath()` calls to `/app/api/admin/blog/posts/route.ts` and `categories/route.ts` (POST, PUT, DELETE)
- [x] 6.6 Add `revalidatePath()` calls to `/app/api/admin/gallery/photos/route.ts` and `categories/route.ts` (POST, PUT, DELETE)
- [x] 6.7 Add `revalidatePath()` calls to `/app/api/admin/faq/route.ts` (POST, PUT, DELETE)
- [x] 6.8 Add `revalidatePath()` calls to `/app/api/admin/organization/route.ts` (POST, PUT, DELETE)
- [x] 6.9 Add `revalidatePath()` calls to `/app/api/admin/clients/route.ts` (POST, PUT, DELETE)

## 7. Migration Script

- [x] 7.1 Create `scripts/migrate-v5.ts` that copies all files from `public/uploads/` to the `UPLOAD_DIR` directory (skipping files that already exist)
- [x] 7.2 Add `db:migrate-v5` script entry to `package.json`

## 8. Testing & Cleanup

- [x] 8.1 Verify file upload works: upload an image via admin, confirm it's stored in `UPLOAD_DIR` and accessible via `/api/uploads/filename`
- [x] 8.2 Verify persistent storage: confirm files in `UPLOAD_DIR` survive simulated redeployment (or document that they should on Hostinger)
- [x] 8.3 Verify revalidation works end-to-end: update content in admin, confirm public page shows new content without redeployment
- [x] 8.4 Verify asset deletion works: delete content via admin, confirm file is removed from `UPLOAD_DIR`
- [x] 8.5 Set `UPLOAD_DIR` environment variable on Hostinger production environment to the persistent path
- [x] 8.6 Remove `.gitignore` entries related to `public/uploads` (files are now outside public dir)