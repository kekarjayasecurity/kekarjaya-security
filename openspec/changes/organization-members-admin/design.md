## Context

The organization members admin page (`/admin/organization`) currently only manages a static "Struktur Organisasi" image uploaded to the `pages` table. The full CRUD API for `organization_members` already exists at `/api/admin/organization` (GET/POST) and `/api/admin/organization/[id]` (PUT/DELETE), but there is no admin UI to use it. Members are currently only manageable via seed scripts.

The project uses a consistent admin CRUD pattern across other entities (services, blog, gallery, FAQ, clients, pages) — list view with add/edit/delete actions using modals.

## Goals / Non-Goals

**Goals:**
- Add a member management section to the `/admin/organization` page with full CRUD
- Display members in a sortable list with name, position, photo thumbnail
- Allow adding new members with name, position, photo, and sort_order
- Allow editing existing member details
- Allow deleting members (with confirmation)
- Allow reordering members via up/down buttons
- Keep the existing Struktur Organisasi image upload working alongside

**Non-Goals:**
- Building a separate page/route for member management (it stays on the existing page)
- Changing the public-facing Tentang Kami page (already works)
- Modifying the API routes (already complete)
- Drag-and-drop reordering (button-based up/down is sufficient and consistent with other admin patterns)

## Decisions

### 1. Use inline list + modal form pattern

**Choice**: Display members as an inline list on the organization page with add/edit actions opening a Modal
**Alternatives considered**: Separate `/admin/organization/[id]` detail page, inline editable rows
**Rationale**: The project uses the modal pattern consistently (FAQ, clients). Inline editing would be complex for photo upload. A separate detail page is overkill for 3 fields. Modal is the simplest and most consistent approach.

### 2. Reorder with up/down buttons

**Choice**: Use up/down arrow buttons on each member row to change sort_order
**Alternatives considered**: Drag-and-drop (e.g., dnd-kit), manual sort_order input field
**Rationale**: Up/down buttons are simple, consistent with the SectionEditor pattern used elsewhere in the admin, and don't require additional dependencies. The organization typically has 3-8 members, so drag-and-drop adds unnecessary complexity.

### 3. Photo upload via existing ImageUpload component

**Choice**: Use the existing `ImageUpload` component for member photos
**Alternatives considered**: Separate avatar upload, URL input only
**Rationale**: ImageUpload is already built, handles file upload and preview, and is used consistently across the admin panel.

## Risks / Trade-offs

- **Minimal risk**: This is a straightforward CRUD UI addition with the API already built and the pattern well-established in the project
- **Photo cleanup on delete**: The existing DELETE API already handles file unlinking — no additional work needed
- **Sort order consistency**: Reorder buttons update sort_order via PUT — if two members have the same sort_order, the order may not be deterministic. Mitigation: Reorder operations should set sequential sort_order values