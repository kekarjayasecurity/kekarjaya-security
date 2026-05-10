## Why

The PT Kekar Jaya Security website currently has a rigid, static UI with no animations and limited image placement — pages like Tentang Kami, Layanan, and Beranda feel flat and lack visual storytelling. Adding fluid animations and richer image sections (hero banners, about imagery, service visuals) alongside a new editable client showcase will modernize the site, improve engagement, and build credibility by displaying real client relationships.

## What Changes

- Add Framer Motion animations across all public pages (fade-in, slide-in, stagger, scroll-triggered reveals)
- Add hero/banner image to Beranda (homepage) with animated text overlay
- Add image section to Tentang Kami page (company photo/team image alongside content)
- Add image support to Layanan listing (service thumbnails/icons in card grid)
- Add a new "Klien Kami" (Our Clients) section to Beranda with an editable list of client logos/names
- Create admin CRUD for client management (add, edit, delete clients with logo upload)
- Add a `clients` database table and API endpoints

## Capabilities

### New Capabilities
- `ui-animations`: Framer Motion scroll-triggered and transition animations across all public pages
- `hero-banner`: Animated hero banner section on Beranda with image background and text overlay
- `page-images`: Image placement sections on Tentang Kami and Layanan pages
- `client-showcase`: Editable "Our Clients" section on Beranda with admin CRUD

### Modified Capabilities
<!-- No existing specs to modify -->

## Impact

- **Frontend**: All public pages gain animation wrappers; Beranda, Tentang Kami, and Layanan pages get new image sections
- **New dependency**: `framer-motion` package added
- **Database**: New `clients` table (id, name, logo_url, website_url, sort_order, is_active, created_at, updated_at)
- **API**: New `/api/admin/clients` CRUD endpoints
- **Admin**: New `/admin/clients` page for managing client entries with logo upload
- **Components**: New reusable `AnimatedSection` component; new `ClientShowcase` component