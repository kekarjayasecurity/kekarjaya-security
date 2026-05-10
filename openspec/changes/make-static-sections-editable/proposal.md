## Why

Several public-facing pages contain content that is hardcoded in React components rather than stored in the database and editable via the admin panel. The Legalitas page has legal document cards hardcoded in `LegalitasClient.tsx`, the Tentang Kami page has vision/mission cards, company values, and static section text hardcoded in `TentangKamiClient.tsx`, and the Beranda "Why Choose Us" section and service icons are hardcoded in `BerandaClient.tsx`. Content managers cannot update these sections without developer intervention, making the site difficult to maintain.

## What Changes

- Move legal document card data from hardcoded `LegalitasClient.tsx` into the `pages` table content or a new structured approach that's admin-editable
- Make the Tentang Kami page's vision/mission content, values, and section text editable from the admin panel via structured page content
- Make the Beranda "Why Choose Us" section (values/checkmarks) editable via the admin panel, either as page content or a dedicated data source
- Make service card icon mappings editable (currently hardcoded SVG path strings in components)
- Ensure all public page content is editable through the existing admin panel without code changes

## Capabilities

### New Capabilities
- `editable-page-sections`: Make hardcoded content sections on Legalitas, Tentang Kami, and Beranda pages editable via the admin panel by storing section data in the pages table and rendering it dynamically

### Modified Capabilities
<!-- No existing specs to modify -->

## Impact

- **Frontend**: `LegalitasClient.tsx`, `TentangKamiClient.tsx`, `BerandaClient.tsx` — replace hardcoded content with dynamic data from the database
- **Backend**: Pages API needs to handle structured content (vision, mission, values, legal docs, why-choose-us items) stored as JSON in page fields or parsed from page content
- **Admin**: Pages editor may need dedicated section editors or the content format needs to be documented for admins
- **Database**: May need new columns on pages table for structured section data (e.g., `sections` JSON column)