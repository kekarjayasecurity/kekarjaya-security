## Context

This is a Next.js 15 App Router application (React 19) for a security company website with a CMS admin panel. It's deployed on Hostinger's Node.js hosting with a Hostinger-managed MySQL database. Currently:

- All public pages are Server Components that query MySQL directly on every request with no caching directives — yet the live site requires redeployment to see content changes. This is likely due to Next.js build-time static generation or the Hostinger deployment process caching the built output.
- File uploads are written to `public/uploads/` on the local filesystem via `fs/promises.writeFile`. Redeployment wipes the `nodejs/` directory (which contains `public/uploads/`), losing all uploaded images.

Key constraints:
- Hostinger Node.js hosting with no Docker support
- MySQL database on a shared Hostinger instance (`auth-db1866.hstgr.io`)
- The deployment directory is `domains/kekarjaya-security.co.id/nodejs/` — everything under this path is replaced on deploy
- Files stored outside the deployment directory persist across deploys
- Budget-sensitive (small business — avoid adding external services)

## Goals / Non-Goals

**Goals:**
- Public pages reflect admin content changes immediately after save, without redeployment
- Uploaded assets persist across redeployments using a directory outside the deployment path
- Minimal infrastructure changes and cost — no new external services

**Non-Goals:**
- Full CDN/edge caching layer
- Real-time WebSocket updates to browsers (revalidation is request-level)
- Cloud object storage (S3, R2, etc.)
- Migrating existing seed SVG files in `public/images/` (those are version-controlled and redeployed with the app)
- Changing the admin UI/UX

## Decisions

### 1. Use Next.js On-Demand Revalidation via `revalidatePath`

**Decision**: Call `revalidatePath()` from admin API routes after content mutations, with `export const revalidate = 3600` on public pages.

**Rationale**: Next.js 15 App Router supports `revalidatePath()` natively. This is the simplest approach — no cache infrastructure needed. Public pages get cached for up to 1 hour for performance, and admin mutations immediately bust the cache for affected paths.

**Alternatives considered**:
- `revalidateTag()`: More granular but requires wrapping all DB queries in `unstable_cache()` with tags; over-engineered for this app size
- `export const dynamic = 'force-dynamic'`: Every request hits DB — no caching benefit
- Time-based ISR only (`revalidate = 60`): Up to 60 seconds of stale content; not ideal for a CMS
- Webhook-based revalidation: Over-engineered for a single-app setup

### 2. Persistent Local Directory for Uploads

**Decision**: Store uploaded files in a directory outside the Hostinger deployment path (e.g., `/home/u843025186/uploads/`), configured via `UPLOAD_DIR` environment variable. Serve files through a Next.js API route at `/api/uploads/[filename]`.

**Rationale**: On Hostinger, the `nodejs/` directory is replaced on every deploy, but directories outside it persist. By pointing `UPLOAD_DIR` to a path outside the deployment root, files survive redeployment. This requires zero external services, zero cost, and minimal code changes.

**Alternatives considered**:
- Cloudflare R2 / AWS S3: Adds external dependency, cost, and complexity — overkill for file persistence
- Symlinks from `public/uploads` to persistent directory: Symlinks inside `nodejs/` would be wiped on deploy too
- Backup/restore script: Fragile, manual, error-prone

**Implementation**:
- `UPLOAD_DIR` env var: defaults to `path.join(process.cwd(), 'public', 'uploads')` in development; set to a persistent path like `/home/u843025186/uploads` in production
- Upload API writes to `UPLOAD_DIR` instead of `public/uploads/`
- New API route `/app/api/uploads/[filename]/route.ts` reads files from `UPLOAD_DIR` and streams them as responses with proper content-type headers
- `ImageUpload` component and all image references use `/api/uploads/filename` URLs
- Database continues to store just filenames (not full URLs)

### 3. Serving Uploaded Files via API Route

**Decision**: Create `/app/api/uploads/[filename]/route.ts` that reads from `UPLOAD_DIR` and serves files with appropriate headers.

**Rationale**: Since files are outside `public/`, Next.js can't serve them as static assets. An API route is the simplest way to serve them — it reads the file from the persistent directory, sets the correct `Content-Type` header, and streams it to the client. This works identically in development and production.

**Trade-off**: Slightly more server load than static file serving (each image request goes through Node.js). For a small business site, this is negligible.

## Risks / Trade-offs

- **[Risk] Persistent directory path varies by hosting environment** → Use `UPLOAD_DIR` env var with sensible defaults; document the setup clearly
- **[Risk] API route adds overhead for every image request** → Acceptable for a small business site with low traffic; can add caching headers (`Cache-Control: public, max-age=31536000`) to mitigate
- **[Risk] `revalidatePath()` may not work in all Next.js hosting configurations** → Hostinger runs Node.js server mode; `revalidatePath()` works server-side in App Router. Test and verify post-deploy
- **[Trade-off] Image URLs change from `/uploads/filename` to `/api/uploads/filename`** → Existing database records with `/uploads/` paths will need migration; new uploads use `/api/uploads/` convention