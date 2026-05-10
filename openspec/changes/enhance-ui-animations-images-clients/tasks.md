## 1. Setup & Dependencies

- [x] 1.1 Install `framer-motion` package (`npm install framer-motion`)
- [x] 1.2 Add `clients` table to `schema.sql` (id, name, logo_url, website_url, sort_order, is_active, created_at, updated_at)
- [x] 1.3 Add `hero_image_url`, `hero_title`, `hero_subtitle` columns to `pages` table in `schema.sql`
- [x] 1.4 Add `image_url` column to `services` table in `schema.sql`
- [x] 1.5 Add `image_url` column to `pages` table in `schema.sql`
- [x] 1.6 Create migration script `scripts/migrate-v2.ts` to ALTER existing tables (pages, services) and CREATE clients table

## 2. Reusable Animation Component

- [x] 2.1 Create `components/ui/AnimatedSection.tsx` — reusable Framer Motion wrapper with variants: `fadeInUp`, `fadeInLeft`, `fadeInRight`, `fadeIn`, and `stagger` support
- [x] 2.2 Add `prefers-reduced-motion` media query handling in `AnimatedSection` (disable animations for reduced motion)

## 3. Hero Banner on Beranda

- [x] 3.1 Update `/api/admin/pages/[id]` route to accept and save `hero_image_url`, `hero_title`, `hero_subtitle` fields
- [x] 3.2 Update admin page editor (`/admin/pages/[id]`) to include hero image upload, hero title, and hero subtitle fields (shown only for Beranda/slug=beranda)
- [x] 3.3 Rebuild Beranda public page (`app/(public)/page.tsx`) to render a hero banner section at the top using background image with gradient overlay, title, and subtitle with Framer Motion entrance animations

## 4. Page Images (Tentang Kami & Layanan)

- [x] 4.1 Update `/api/admin/pages/[id]` route to accept and save `image_url` field for pages
- [x] 4.2 Update admin page editor to include image upload field for `image_url`
- [x] 4.3 Rebuild Tentang Kami public page (`app/(public)/tentang-kami/page.tsx`) to show the page image alongside content (side-by-side on desktop, stacked on mobile) using `AnimatedSection`
- [x] 4.4 Update `/api/admin/services/[id]` route to accept and save `image_url` field for services
- [x] 4.5 Update admin service editor (`/admin/services/[id]`) to include image upload field for `image_url`
- [x] 4.6 Rebuild Layanan listing page (`app/(public)/layanan/page.tsx`) to display service images on cards (fallback to icon if no image) with staggered `AnimatedSection`

## 5. Client Showcase on Beranda

- [x] 5.1 Create `/api/admin/clients` route handler (GET list, POST create)
- [x] 5.2 Create `/api/admin/clients/[id]` route handler (GET, PUT, DELETE)
- [x] 5.3 Create a public API or server-side query to fetch active clients for Beranda (ordered by sort_order)
- [x] 5.4 Create `components/public/ClientShowcase.tsx` — client grid component with logo, name, optional website link, and staggered animation
- [x] 5.5 Add admin clients list page at `/admin/clients` (table with logo thumbnail, name, website, sort order, active status, edit/delete actions)
- [x] 5.6 Add admin client create/edit page at `/admin/clients/[id]` (form with name, logo upload, website URL, sort order, is_active toggle)
- [x] 5.7 Add "Klien" link to admin sidebar navigation
- [x] 5.8 Integrate `ClientShowcase` component into Beranda page (render after hero and services sections, hidden if no active clients)

## 6. Apply Animations to All Public Pages

- [x] 6.1 Wrap Beranda page sections (hero, services, why-choose-us, client showcase) with `AnimatedSection` variants
- [x] 6.2 Wrap Tentang Kami page content sections with `AnimatedSection` variants
- [x] 6.3 Wrap Layanan page service cards with staggered `AnimatedSection`
- [x] 6.4 Wrap Layanan detail page sections with `AnimatedSection` variants
- [x] 6.5 Wrap FAQ page sections with `AnimatedSection` variants
- [x] 6.6 Wrap Galeri page photo grid with staggered `AnimatedSection`
- [x] 6.7 Wrap Blog listing and detail page sections with `AnimatedSection` variants
- [x] 6.8 Wrap Kontak page sections with `AnimatedSection` variants

## 7. Testing & Verification

- [x] 7.1 Run `npm run build` to verify no TypeScript or build errors
- [x] 7.2 Verify hero banner renders with/without image on Beranda
- [x] 7.3 Verify image displays on Tentang Kami page (with and without image)
- [x] 7.4 Verify service card images on Layanan (with and without image)
- [x] 7.5 Verify client CRUD in admin panel (create, edit, delete, reorder)
- [x] 7.6 Verify client showcase section on Beranda (appears with clients, hidden without)
- [x] 7.7 Verify animations work with `prefers-reduced-motion: reduce` enabled