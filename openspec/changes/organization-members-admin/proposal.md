## Why

The admin panel currently has no UI to manage Organization Members (Tim Kepemimpinan). While the backend API (`/api/admin/organization`) supports full CRUD (GET, POST, PUT, DELETE) on `organization_members`, the admin page at `/admin/organization` only manages a static "Struktur Organisasi" image. Admins cannot add, edit, reorder, or delete individual team members without directly modifying the database or re-running seed scripts.

## What Changes

- Enhance the `/admin/organization` page to display a list of current organization members with add, edit, delete, and reorder capabilities
- Add a member form (modal or inline) for creating and editing members with fields: name, position, photo (via ImageUpload), sort_order
- Allow drag-and-drop or button-based reordering of members
- Keep the existing "Struktur Organisasi" image upload feature alongside the new member management section
- The public Tentang Kami page already renders members from the API — no frontend changes needed there

## Capabilities

### New Capabilities
- `organization-members-admin`: Admin CRUD interface for organization members with add/edit/delete/reorder functionality

### Modified Capabilities
(No existing specs to modify)

## Impact

- **Files modified**: `app/admin/(dashboard)/organization/page.tsx` (major rewrite to add member list + CRUD)
- **Components used**: Existing `Button`, `Card`, `Input`, `Modal`, `ImageUpload` from `components/ui/`
- **API routes**: Already exist at `/api/admin/organization` (GET, POST) and `/api/admin/organization/[id]` (PUT, DELETE) — no backend changes needed
- **Public pages**: No changes — `TentangKamiClient.tsx` already renders members from the API