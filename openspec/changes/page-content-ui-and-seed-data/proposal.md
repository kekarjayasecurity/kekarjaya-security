## Why

The public-facing pages of PT Kekar Jaya Security currently look flat and inconsistent — the rich text content edited in the admin panel doesn't render properly on the website (missing prose/typography styles), the Legalitas page is a plain bulleted list that should be a professional document table, Tentang Kami lacks structured sections (company profile, vision/mission, founders/leadership), and there is no dummy data to make the site visually presentable. The service detail pages also lack imagery, making them feel incomplete.

## What Changes

- Improve rich text content rendering across all public pages by adding comprehensive `.prose` styles matching the TipTap editor formatting
- Redesign the Legalitas page to present legal documents in a structured card/table layout instead of raw HTML bulleted lists
- Redesign Tentang Kami with structured sections: company profile hero, vision & mission cards, company values, and a founder/leadership section displaying organization members
- Add image support to service detail pages (Layanan [slug]) showing the service image at the top
- Create comprehensive dummy/seed data including: SVG placeholder images for hero banner, tentang kami, services, team members, and client logos; updated page content with richer HTML; client records with logos; updated services with images; and organization members with placeholder portraits
- Generate SVG placeholder images in `/public/images/` for all dummy data references

## Capabilities

### New Capabilities
- `prose-content-styling`: Comprehensive `.prose` CSS styles for rendering rich text content consistently across public pages
- `legalitas-redesign`: Structured card/table UI for the Legalitas page replacing the current raw HTML rendering
- `tentang-kami-redesign`: Structured Tentang Kami page with company profile hero, vision/mission cards, values, and founder/leadership section using organization member data
- `service-detail-images`: Service image display on Layanan detail pages
- `seed-dummy-data`: Complete seed data with SVG placeholder images, updated page content, client records, and service images

### Modified Capabilities
<!-- No existing specs to modify -->

## Impact

- **Frontend**: Legalitas page, Tentang Kami page, Layanan detail page, and all pages using `.prose` class get visual updates
- **Styling**: `globals.css` gets significant `.prose` style additions
- **Database seed**: `scripts/seed.ts` gets updated with richer content, client data, service images, hero fields, and organization member photos
- **Static assets**: New SVG placeholder images in `/public/images/` directory
- **Types**: No type changes needed (existing `image_url`, `hero_image_url` fields from prior change)