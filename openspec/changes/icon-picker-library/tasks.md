## 1. Install & Foundation

- [x] 1.1 Install `lucide-react` package via npm
- [x] 1.2 Create `lib/icons.ts` — centralized icon registry with all existing icons (32+ entries) mapped to names, labels, and SVG paths, plus a `getIconPath(name)` helper and a `getIconPathFromOldPath(path)` reverse-lookup for migration

## 2. Icon Picker Component

- [x] 2.1 Create `components/ui/IconPicker.tsx` — searchable dropdown with icon grid, visual preview, and selected icon display
- [x] 2.2 Update `components/ui/SectionEditor.tsx` to use `IconPicker` for fields with `type: "icon"` instead of plain text input
- [x] 2.3 Update `app/admin/(dashboard)/services/[id]/page.tsx` to use `IconPicker` for the service icon field instead of text input

## 3. Frontend Icon Registry Adoption

- [x] 3.1 Create shared `serviceIcons` map using registry in `lib/icons.ts`, remove duplicated maps from `BerandaClient.tsx` and `LayananClient.tsx`, update both to import from registry
- [x] 3.2 Update `TentangKamiClient.tsx` — replace hardcoded `defaultValues` icon SVG paths with icon names, use `getIconPath()` for rendering
- [x] 3.3 Update `LegalitasClient.tsx` — replace hardcoded `defaultLegalDocuments` icon SVG paths with icon names, use `getIconPath()` for rendering
- [x] 3.4 Update `BerandaClient.tsx` — replace hardcoded `defaultWhyChooseUs` icon references to use registry
- [x] 3.5 Update `components/admin/Sidebar.tsx` — replace inline SVG paths with registry lookups
- [x] 3.6 Update `components/public/Header.tsx`, `Footer.tsx`, `Modal.tsx` — replace inline SVG paths with registry lookups
- [x] 3.7 Update `app/(public)/galeri/GaleriClient.tsx` and `app/(public)/faq/FaqClient.tsx` — replace inline SVG paths with registry lookups
- [x] 3.8 Update `app/(public)/kontak/page.tsx` — replace inline SVG paths with registry lookups

## 4. Seed Data & Migration

- [x] 4.1 Update `scripts/seed.ts` — change all `icon` fields from SVG path strings to icon names (services icon field, sections documents/values icons)
- [x] 4.2 Create `scripts/migrate-v4.ts` — migration script that converts existing SVG path strings in `services.icon` and `pages.sections` JSON to icon names using reverse-lookup
- [x] 4.3 Add `db:migrate-v4` script to `package.json`

## 5. Verification

- [x] 5.1 Run `npm run build` to verify no TypeScript or build errors
- [ ] 5.2 Verify admin IconPicker works — search, select, preview icons in section editor and service editor
- [ ] 5.3 Verify all public pages render icons correctly from registry (default and sections data)
- [ ] 5.4 Run `npm run db:migrate-v4` and `npm run db:seed` to test migration and seed