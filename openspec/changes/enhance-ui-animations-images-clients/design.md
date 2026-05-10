## Context

PT Kekar Jaya Security is a Next.js 15 (App Router) website with a custom admin panel, MySQL database, and Tailwind CSS v4. The current UI is entirely static — no animation library is installed. Public pages (Beranda, Tentang Kami, Layanan, etc.) use plain `<img>` tags and `dangerouslySetInnerHTML` for content rendering. The admin panel provides CRUD for pages, services, blog, gallery, FAQ, organization members, and contact messages.

The site needs to feel more dynamic and professional: richer image placements, scroll-triggered animations, and a client showcase section. All new content must be editable via the existing admin pattern (API routes + admin pages).

## Goals / Non-Goals

**Goals:**
- Add Framer Motion for page transitions and scroll-triggered animations across public pages
- Add a hero banner image section on Beranda with animated text overlay
- Add image sections to Tentang Kami and Layanan pages
- Create an editable "Klien Kami" (Our Clients) section on Beranda with logo grid
- Provide full admin CRUD for managing clients (name, logo, website, sort order, active status)
- Maintain consistency with existing patterns (API routes, admin pages, ImageUpload component, Tailwind styling)

**Non-Goals:**
- Replacing the existing TipTap rich text editor
- Migrating from standard `<img>` to Next.js `<Image>` component (separate concern)
- Adding page transition animations between routes (only within-page animations)
- Creating a new design system or component library
- Internationalization changes

## Decisions

### 1. Use Framer Motion for animations

**Choice**: Framer Motion (`framer-motion`)
**Alternatives considered**: GSAP, Anime.js, CSS-only transitions, React Spring
**Rationale**: Framer Motion is the de facto animation library for React. It integrates seamlessly with Next.js (no DOM manipulation outside React), provides a declarative API (`motion.div`, `useInView`), supports `whileInView` for scroll-triggered animations, and has strong TypeScript support. GSAP requires imperative DOM manipulation; CSS-only lacks scroll-triggered and stagger capabilities; React Spring has steeper API.

### 2. AnimatedSection as a reusable wrapper component

**Choice**: Create a single `AnimatedSection` component that wraps content with `whileInView` animation variants
**Rationale**: Avoids duplicating animation logic across every page. Each page section can be wrapped with `<AnimatedSection variant="fadeInUp|fadeInLeft|fadeInRight|stagger">` and a consistent experience is guaranteed. The component uses Framer Motion's `<motion.section>` with `viewport={{ once: true }}` so animations fire once on scroll.

### 3. Client data stored in a new `clients` database table

**Choice**: Separate `clients` table with columns: `id`, `name`, `logo_url`, `website_url`, `sort_order`, `is_active`, `created_at`, `updated_at`
**Alternatives considered**: Extending the `pages` table, using a JSON column
**Rationale**: A dedicated table follows the existing pattern (mirrors `services`, `organization_members` tables with `sort_order` and `is_active`). Allows independent CRUD, sorting, and filtering. A JSON column would complicate querying and reordering.

### 4. Hero banner as configurable page content

**Choice**: Add `hero_image_url` and `hero_title` / `hero_subtitle` columns to the `pages` table for the Beranda page
**Alternatives considered**: Hardcoded hero component, separate `hero` table
**Rationale**: The Beranda page already exists in the `pages` table with HTML content. Adding hero-specific columns keeps it simple and editable from the existing page editor. A separate table would be overkill for a single hero section.

### 5. Image placement on Tentang Kami and Layanan via page content

**Choice**: For Tentang Kami, add an `image_url` column to the `pages` table. For Layanan, the `services` table already has an `icon` field — add an `image_url` column for a full service image/thumbnail.
**Rationale**: Tentang Kami loads content from the `pages` table via `dangerouslySetInnerHTML`, so adding an `image_url` column lets the admin set a side image. For Layanan, each service card currently shows only an SVG icon — adding `image_url` enables a richer card with a background or thumbnail image.

### 6. API route pattern follows existing conventions

**Choice**: New `/api/admin/clients` CRUD endpoints following the same pattern as `/api/admin/services`
**Rationale**: Consistency with existing codebase. Each resource has GET (list), POST (create), GET/PUT/DELETE by ID. Uses the same authentication middleware and response format.

## Risks / Trade-offs

- **Bundle size increase**: Framer Motion adds ~30KB gzipped. Mitigation: Use dynamic imports where possible; the animation library is only needed on client components.
- **Performance on mobile**: Scroll-triggered animations can cause jank on low-end devices. Mitigation: Use `viewport={{ once: true }}` to animate only once; respect `prefers-reduced-motion` media query to disable animations for accessibility.
- **Database schema migration required**: Adding columns to `pages`, `services` tables and creating a new `clients` table. Mitigation: Create a migration script (`scripts/migrate-v2.ts`) that ALTERs existing tables; provide rollback SQL.
- **Admin UX complexity**: Adding more fields to the pages/services editor. Mitigation: Keep hero image and page image as optional fields; show them only in the Beranda and Tentang Kami editors respectively.