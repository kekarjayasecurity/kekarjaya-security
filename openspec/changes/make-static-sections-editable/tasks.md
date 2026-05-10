## 1. Database & API

- [x] 1.1 Add `sections` JSON column to `pages` table in `schema.sql` and create migration script `scripts/migrate-v3.ts`
- [x] 1.2 Update `Page` type in `types/index.ts` to include `sections: Record<string, unknown> | null`
- [x] 1.3 Update `/api/admin/pages/[id]` PUT route to accept and save `sections` field
- [x] 1.4 Update `/api/admin/pages` GET route to return `sections` field

## 2. Admin Panel — Section Editors

- [x] 2.1 Create `components/ui/SectionEditor.tsx` — reusable component for editing dynamic lists of items (add/remove/reorder), with each item as a set of fields (title, description, icon)
- [x] 2.2 Update `app/admin/(dashboard)/pages/[id]/page.tsx` to show section editors when editing the beranda page: "Mengapa Memilih Kami" items (why_choose_us)
- [x] 2.3 Update the admin page editor to show section editors when editing the tentang-kami page: vision text, mission items list, values items list
- [x] 2.4 Update the admin page editor to show section editors when editing the legalitas page: document cards list (title, description, icon)

## 3. Frontend — Dynamic Rendering with Fallbacks

- [x] 3.1 Update `BerandaClient.tsx` to render "Why Choose Us" items from `page.sections.why_choose_us` with fallback to hardcoded defaults
- [x] 3.2 Update `TentangKamiClient.tsx` to render vision, mission items, and values from `page.sections` with fallback to hardcoded defaults
- [x] 3.3 Update `LegalitasClient.tsx` to render document cards from `page.sections.documents` with fallback to hardcoded defaults

## 4. Seed Data Update

- [x] 4.1 Update `scripts/seed.ts` to populate `sections` JSON data for beranda (why_choose_us), tentang-kami (vision, mission_items, values), and legalitas (documents) pages

## 5. Verification

- [x] 5.1 Run `npm run build` to verify no TypeScript or build errors
- [x] 5.2 Verify admin can edit sections for beranda, tentang-kami, and legalitas pages
- [x] 5.3 Verify public pages render with sections data and fall back to defaults when NULL
- [x] 5.4 Run `npm run db:migrate-v3` and `npm run db:seed` to verify migration and seed work