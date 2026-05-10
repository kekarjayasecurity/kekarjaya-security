## 1. Prose Content Styling

- [x] 1.1 Add comprehensive `.prose` CSS styles to `globals.css` covering: headings (h1-h4 with primary-700 color, proper sizing/spacing), paragraphs (line-height, spacing), lists (ul/ol with accent-colored markers, indentation), blockquotes (border-left accent, italic), links (accent-500, hover accent-600), tables (bordered, striped), strong/em/mark, and images (rounded, responsive)
- [x] 1.2 Add `.prose` class to all pages that render `dangerouslySetInnerHTML` content (BerandaClient, LayananClient, Layanan detail, FAQ, Blog detail, Legalitas, Struktur Organisasi, Tentang Kami)

## 2. Legalitas Page Redesign

- [x] 2.1 Create `app/(public)/legalitas/LegalitasClient.tsx` — client component with structured document cards (icon, title, registration number/description) for each legal document type (Akta, SIUJK, SIUP, TDP, NPWP, SNI)
- [x] 2.2 Update `app/(public)/legalitas/page.tsx` to use the LegalitasClient component and also render page content within `.prose` below the document cards
- [x] 2.3 Add AnimatedSection wrappers to Legalitas page sections

## 3. Tentang Kami Page Redesign

- [x] 3.1 Rewrite `app/(public)/tentang-kami/page.tsx` to query both `pages` and `organization_members` data
- [x] 3.2 Rebuild `app/(public)/tentang-kami/TentangKamiClient.tsx` with structured sections: hero banner (using `image_url`), company profile text, vision/mission as styled cards, company values grid (Integritas, Profesionalisme, Kepercayaan, Disiplin), and leadership/founder section pulling from organization_members
- [x] 3.3 Add AnimatedSection wrappers to all Tentang Kami sections

## 4. Service Detail Page Enhancement

- [x] 4.1 Update `app/(public)/layanan/[slug]/page.tsx` to display `service.image_url` as a hero banner at the top (with fallback to a solid primary-colored section), service title overlaid, and content in `.prose` container
- [x] 4.2 Add AnimatedSection wrappers to service detail sections (hero, content, CTA)

## 5. SVG Placeholder Images

- [x] 5.1 Create `/public/images/hero-banner.svg` — branded placeholder hero image
- [x] 5.2 Create `/public/images/about-image.svg` — branded placeholder tentang kami image
- [x] 5.3 Create 6 service SVGs in `/public/images/services/` (satpam, vip, event, risk, consulting, industrial)
- [x] 5.4 Create 6 team member SVG portraits in `/public/images/team/` (budi-hartono, siti-rahayu, agus-prasetyo, rina-wulandari, hendra-wijaya, dewi-permata)
- [x] 5.5 Create 8 client logo SVGs in `/public/images/clients/` (with generic professional names)
- [x] 5.6 Create blog thumbnail SVGs in `/public/images/blog/` (keamanan-rumah, iso-9001, regulasi-2024, pelatihan, keamanan-perkantoran)
- [x] 5.7 Create gallery SVGs in `/public/images/gallery/` (patroli-malam, guard-perkantoran, area-parkir, pelatihan-bela-diri, simulasi-darurat, pertolongan-pertama, konser-musik, event-olahraga, ruang-kontrol, kantor-pusat)

## 6. Seed Data Update

- [x] 6.1 Update `scripts/seed.ts` to populate `hero_image_url`, `hero_title`, `hero_subtitle` for beranda page
- [x] 6.2 Update `scripts/seed.ts` to populate `image_url` for tentang-kami page
- [x] 6.3 Update `scripts/seed.ts` to populate `image_url` for each of the 6 services
- [x] 6.4 Add client seed data to `scripts/seed.ts` (8 clients with names, logo URLs, website URLs, sort order, active status)
- [x] 6.5 Update `scripts/seed.ts` to populate `photo` fields for organization members with SVG portrait paths
- [x] 6.6 Update gallery photo seed data to reference SVG images in `/public/images/gallery/`
- [x] 6.7 Update blog post thumbnail seed data to reference SVG images in `/public/images/blog/`

## 7. Verification

- [x] 7.1 Run `npm run build` to verify no TypeScript or build errors
- [x] 7.2 Verify Legalitas page renders structured document cards
- [x] 7.3 Verify Tentang Kami page shows hero, vision/mission, values, and leadership sections
- [x] 7.4 Verify service detail pages display hero image when `image_url` is set
- [x] 7.5 Verify `.prose` styles render correctly for headings, lists, links, and blockquotes across all pages
- [x] 7.6 Verify seed data populates correctly with SVG placeholder references