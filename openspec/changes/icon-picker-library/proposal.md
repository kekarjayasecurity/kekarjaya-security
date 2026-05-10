## Why

Icons across the site are hardcoded as raw SVG path strings scattered across 10+ files (32+ unique paths). The admin panel currently requires users to manually paste SVG path strings into a text input — unintuitive, error-prone, and no visual preview. There is no centralized icon registry, no search capability, and no way for admins to visually select icons.

## What Changes

- Install `lucide-react` as the icon library (lightweight, tree-shakeable, 1500+ icons)
- Create a centralized icon registry (`lib/icons.ts`) mapping icon names to SVG path strings and labels
- Build an `IconPicker` component — a searchable dropdown with visual preview for admin icon selection
- Replace raw SVG path storage in the DB with icon name strings (e.g., `"shield-check"` instead of `"M9 12l2 2 4-4..."`)
- Refactor all frontend components to look up icons from the registry instead of inline SVG paths
- Consolidate the duplicated `serviceIcons` maps into the shared registry
- Update seed data to use icon names instead of SVG paths
- Create a migration script to convert existing SVG path data in the DB to icon names

## Capabilities

### New Capabilities
- `icon-picker`: Centralized icon registry, searchable icon picker dropdown component, and icon name–based storage across the system

### Modified Capabilities
(No existing specs to modify — this is the first spec in this project)

## Impact

- **Dependencies**: Adds `lucide-react` package
- **Database**: `sections` JSON and `services.icon` field values change from SVG paths to icon name strings — requires data migration script
- **Components affected**: `BerandaClient`, `TentangKamiClient`, `LegalitasClient`, `LayananClient`, `Header`, `Footer`, `Sidebar`, `Modal`, `GaleriClient`, `FaqClient`, `kontak/page`, `SectionEditor`, admin service editor
- **New files**: `lib/icons.ts`, `components/ui/IconPicker.tsx`, `scripts/migrate-v4.ts`
- **Modified files**: `components/ui/SectionEditor.tsx`, `app/admin/(dashboard)/pages/[id]/page.tsx`, `app/admin/(dashboard)/services/[id]/page.tsx`, `scripts/seed.ts`, all public client components