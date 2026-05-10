## Context

PT Kekar Jaya Security uses a Next.js 15 site with a custom admin panel. Icons are currently implemented as hardcoded SVG path strings (`d` attribute values) scattered across 10+ component files with 32+ unique paths duplicated in multiple places. The admin panel's `SectionEditor` and service editor present a plain text input for icon fields, requiring admins to paste raw SVG paths — unintuitive and error-prone with no visual preview.

Two different icon conventions currently exist:
- **Services** use named keys (`"shield"`, `"user-shield"`) resolved through a `serviceIcons` map duplicated in `BerandaClient.tsx` and `LayananClient.tsx`
- **Page sections** (values, documents, why-choose-us) use raw SVG path strings stored directly in the DB

The DB stores SVG path strings in `services.icon` and `pages.sections` JSON, making the data hard to maintain and impossible to visually select.

## Goals / Non-Goals

**Goals:**
- Replace all icon rendering with a centralized icon registry
- Build a searchable `IconPicker` dropdown component with visual preview for admin use
- Store icon names (not SVG paths) in the database for maintainability
- Consolidate all icon definitions into a single source of truth
- Provide backward compatibility during migration (mapping existing SVG paths to icon names)

**Non-Goals:**
- Replacing all icons with a different visual style — the existing Heroicons-style outline icons will be preserved (lucide-react icons are visually similar)
- Animations or icon transitions
- Custom icon upload/sprite sheet support
- Changing the icon rendering approach in Header, Footer, Sidebar, Modal, Gallery, FAQ, and Kontakt components (these use inline SVG for layout icons that aren't admin-editable — they'll use the registry for consistency but won't get the picker)

## Decisions

### 1. Use `lucide-react` as the icon library

**Choice**: Install `lucide-react` and use its icons as the basis for the registry
**Alternatives considered**: `@heroicons/react` (heavier, fewer icons), `react-icons` (huge bundle), hand-rolled SVG paths (current approach)
**Rationale**: Lucide-react is lightweight (tree-shakeable), has 1500+ icons with consistent 24x24 outline style similar to Heroicons, and is well-maintained. It matches the existing visual style and provides named exports that map cleanly to our icon names.

### 2. Store icon names (not SVG paths) in the database

**Choice**: Store short icon names like `"shield-check"`, `"document-text"` in DB fields instead of SVG path strings
**Alternatives considered**: Keep storing SVG paths (current), store icon component references
**Rationale**: Icon names are short, readable, and meaningful. They enable the icon picker dropdown. SVG paths are verbose, fragile, and impossible to visually select. A migration script will convert existing path data.

### 3. Create `lib/icons.ts` — centralized icon registry

**Choice**: A single registry file that exports an `ICON_REGISTRY` map with `{ name, label, path }[]` entries and helper functions
**Alternatives considered**: Import lucide icons directly in components, maintain per-component icon maps
**Rationale**: A single registry ensures consistency, enables the picker to show all available icons, and makes it easy to add/remove icons. The `path` field stores the SVG path string for use in `<path d={...} />` rendering, while `name` and `label` support the picker UX.

### 4. Build `IconPicker` as a searchable dropdown with preview

**Choice**: A React component with search input, icon grid, and visual preview that can be used in any admin form
**Alternatives considered**: Modal picker, separate icon browser page, raw JSON editor
**Rationale**: A dropdown with search is the most intuitive UX for icon selection. It provides visual preview, instant search filtering, and integrates seamlessly into existing form layouts. It replaces the text input for icon fields without changing the overall form structure.

### 5. Batch-rename existing icon keys to match lucide icon names

**Choice**: Map existing custom icon key names (e.g., `"shield"` → `"shield-check"`, `"calendar-check"` stays `"calendar-check"`) and SVG paths to the corresponding lucide icon name
**Alternatives considered**: Keep old naming (inconsistent), create aliases
**Rationale**: Using lucide's canonical names makes the system self-documenting and reduces maintenance burden. The migration script will handle the mapping.

## Risks / Trade-offs

- **Visual differences**: Some lucide icons may have slight visual differences from the existing hand-picked Heroicons paths. Mitigation: The registry uses the exact same SVG paths currently in use (not necessarily lucide's paths), ensuring pixel-perfect match for existing icons while offering lucide icons as additional options.
- **Migration complexity**: Converting stored SVG paths to icon names requires identifying each path in the DB and mapping it. Mitigation: The migration script will use a path-to-name lookup table covering all 32+ existing paths.
- **Bundle size**: Adding lucide-react increases the package size. Mitigation: lucide-react is tree-shakeable and the icon registry only imports paths that are actually used. We'll import individual icons, not the entire library.
- **Icon registry maintenance**: Every new icon must be added to the registry. Mitigation: The registry is a simple flat file that's easy to extend. The picker only shows registered icons, keeping the UX clean.