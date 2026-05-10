## Context

PT Kekar Jaya Security uses a Next.js 15 site with a custom admin panel. The `pages` table stores page content in a `content` LONGTEXT column (HTML from TipTap editor). The previous changes added `hero_image_url`, `hero_title`, `hero_subtitle`, and `image_url` columns. However, several key sections on public pages are hardcoded in React components rather than being editable from the admin panel:

- **Legalitas**: Document cards (Akta, SIUJK, SIUP, TDP, NPWP, SNI) are hardcoded in `LegalitasClient.tsx`
- **Tentang Kami**: Vision/mission cards, company values (Integritas, Profesionalisme, etc.), and section text are hardcoded in `TentangKamiClient.tsx`
- **Beranda**: "Why Choose Us" values and service icon mappings are hardcoded in `BerandaClient.tsx`

The admin TipTap editor only lets admins edit freeform HTML content, not structured section data.

## Goals / Non-Goals

**Goals:**
- Make Legalitas document cards editable from the admin panel
- Make Tentang Kami vision, mission, and values editable from the admin panel
- Make Beranda "Why Choose Us" items editable from the admin panel
- Make service icon-to-SVG mappings configurable rather than hardcoded
- Keep the admin UX simple — admins should be able to add/remove/reorder items without touching code

**Non-Goals:**
- Replacing the TipTap editor with a different rich text editor
- Creating a new database table for every small section type
- Making the Tentang Kami hero image or leadership section admin-editable (leadership is already editable via organization_members admin)

## Decisions

### 1. Store section data as JSON in new `sections` column on the `pages` table

**Choice**: Add a `sections` JSON column to the `pages` table that stores structured section data (arrays of objects for cards, values, documents, etc.)
**Alternatives considered**: Separate database tables for each section type, storing in the existing `content` HTML, using a headless CMS
**Rationale**: A JSON column is the simplest approach that keeps all page-related data together. It avoids creating multiple new tables (which would need their own CRUD APIs and admin pages). Each page can have different section schemas stored in the same column. The admin editor parses the JSON and provides structured editing. This is analogous to how WordPress stores page meta or how Notion stores block data.

### 2. Use a structured admin editor for sections, not raw JSON

**Choice**: Create dedicated section editors in the admin page editor that present forms (not JSON text) for each section type
**Alternatives considered**: Letting admins edit raw JSON, using the TipTap editor for structured content
**Rationale**: Raw JSON is error-prone for non-technical admins. Dedicated form fields with add/remove buttons for list items provide a better UX. Each page slug gets its own section configuration in the admin panel.

### 3. Section schema per page slug

Each page stores its sections as a JSON object with keys specific to that page:
- **beranda**: `{ "why_choose_us": [{ "title": "...", "description": "...", "icon": "..." }] }`
- **tentang-kami**: `{ "vision": "...", "mission_items": ["..."], "values": [{ "title": "...", "description": "...", "icon": "..." }] }`
- **legalitas**: `{ "documents": [{ "title": "...", "description": "...", "icon": "..." }] }`

The frontend components read these sections and fall back to hardcoded defaults when they're empty/null.

### 4. Fallback to hardcoded defaults

**Choice**: When `sections` is null or empty for a given field, components render hardcoded default content
**Alternatives considered**: Showing empty sections, requiring data before the page works
**Rationale**: This ensures the site always looks presentable even before an admin configures the sections. It also means the migration is non-breaking — existing pages work without any data changes.

## Risks / Trade-offs

- **JSON column size**: MySQL JSON columns can store up to ~4GB, but in practice each page's sections will be a few KB. No risk.
- **Admin complexity**: Adding section editors increases admin page complexity. Mitigation: Only show section editors relevant to the current page slug (Beranda gets "Why Choose Us" editor, Tentang Kami gets "Vision/Mission/Values", Legalitas gets "Document Cards").
- **Schema flexibility vs. type safety**: JSON columns are flexible but lack type safety at the DB level. Mitigation: Validate on the API side with TypeScript types.
- **Migration needed**: Adding `sections` column requires a DB migration. Mitigation: Use ALTER TABLE to add the column nullable so existing pages continue to work.