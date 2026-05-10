## Why

Admin content updates are not reflected on public pages without a full redeployment, and uploaded assets (images) stored in `public/uploads/` are wiped clean on every redeploy on Hostinger. This makes the CMS effectively unusable — editors cannot see changes live, and any uploaded images are lost each time the site is deployed.

## What Changes

- Add Next.js on-demand revalidation so that when admin updates content, the public pages immediately reflect the changes without redeployment
- Move uploaded file storage from `public/uploads/` (inside the deployment directory) to a persistent directory outside the deployment path so assets survive redeployments
- Create an API route to serve uploaded files from the persistent directory
- Update the upload API to write to the persistent directory instead
- Add an environment variable (`UPLOAD_DIR`) to configure the storage path (defaults to `public/uploads` in dev, points to a persistent path in production)
- Add a revalidation trigger that admin routes call after any content mutation (create, update, delete)

## Capabilities

### New Capabilities
- `content-revalidation`: On-demand cache revalidation for public pages triggered by admin content changes
- `persistent-asset-storage`: Persistent local file storage for uploaded assets that survives redeployment

### Modified Capabilities
<!-- No existing specs to modify -->

## Impact

- **Public pages**: All server-component pages under `app/(public)/` will opt into ISR with revalidation; uploaded images served via new API route
- **Admin API routes**: All content mutation routes must call `revalidatePath()` after mutations
- **Upload API**: `/app/api/admin/upload/route.ts` rewritten to write to persistent directory instead of `public/uploads/`
- **New API route**: `/app/api/uploads/[filename]/route.ts` created to serve files from persistent directory
- **ImageUpload component**: Updated to use the upload API route URL for previews
- **Environment**: New `UPLOAD_DIR` env var for configuring persistent storage path (e.g., `/home/u843025186/uploads` on Hostinger)
- **Public pages**: Image references change from `/uploads/filename` to `/api/uploads/filename`