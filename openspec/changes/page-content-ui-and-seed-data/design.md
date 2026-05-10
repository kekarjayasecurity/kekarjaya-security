## Context

PT Kekar Jaya Security is a Next.js 15 website with Tailwind CSS v4, Framer Motion animations, and a custom admin panel. The previous change (`enhance-ui-animations-images-clients`) added animations, hero banner, page images, service images, and a client showcase. However, the public pages still have content rendering issues:

1. **Prose styling gap**: The `.prose` class used on rich text content (`dangerouslySetInnerHTML`) has minimal styling — no heading hierarchy, no list styling, no blockquote/table support, inconsistent spacing. The TipTap editor styles (`.tiptap`) exist for the admin but not for the frontend.
2. **Legalitas page**: Renders legal documents as plain HTML lists — no visual structure, no card/table layout, looks unprofessional.
3. **Tentang Kami page**: Currently shows raw HTML content with optional side image. Lacks structured sections for: hero profile, vision/mission as cards, company values, and founder/leadership section. Reference site (cbnpt.com) shows a professional structured layout with tabs, image, and organized sections.
4. **Service detail pages**: Show title + description + rich text content but no service image at the top. The `image_url` field exists from the prior change but isn't rendered on the detail page.
5. **No demo content**: The site has no placeholder images, no client data, and limited visual content. Need SVG-generated placeholder images and richer seed data.

## Goals / Non-Goals

**Goals:**
- Make rich text content render beautifully and consistently across all public pages via comprehensive `.prose` styles
- Redesign Legalitas page to display legal documents as professional cards with icons and structured layout
- Redesign Tentang Kami page with structured sections: company profile hero, vision/mission cards, values grid, and founder/leadership section pulling from `organization_members` table
- Add service image display on Layanan detail pages
- Create comprehensive seed data with SVG placeholder images, updated page content, client records, and service images

**Non-Goals:**
- Replacing the TipTap rich text editor with a different editor
- Adding new database tables or columns (all fields exist from prior change)
- Redesigning the admin panel UI
- Adding internationalization
- Creating real photographic content (SVG placeholders only)

## Decisions

### 1. Use custom `.prose` CSS instead of @tailwindcss/typography

**Choice**: Custom `.prose` styles in `globals.css`
**Alternatives considered**: `@tailwindcss/typography` plugin, keeping the current approach
**Rationale**: The project uses Tailwind v4 which has compatibility issues with the typography plugin. Custom prose styles give full control over the typography hierarchy, spacing, colors, and respond to the project's primary/accent color tokens. This also avoids adding a dependency.

### 2. Legalitas page uses a structured card layout, not raw HTML rendering

**Choice**: Parse the Legalitas page content and render it as styled document cards with icons, or use a dedicated structured layout
**Alternatives considered**: Keeping `dangerouslySetInnerHTML` with just prose styles
**Rationale**: Legal documents benefit from a visual hierarchy that plain HTML can't provide. Each legal document should appear as a distinct card with an icon, document name, and registration number. The structured approach makes it easy to scan and looks professional.

### 3. Tentang Kami uses a component-based layout with data from organization_members

**Choice**: Build Tentang Kami as a multi-section client component that combines: a hero section (using `hero_image_url` and `hero_title`/`hero_subtitle` from the beranda page record or a dedicated `image_url`), vision/mission pulled from page content, and a founder/leadership grid querying `organization_members`
**Alternatives considered**: Keeping Tentang Kami as raw HTML with just an image
**Rationale**: The reference site (cbnpt.com) shows a professional structured about page with hero image, tab-based vision/mission, and organized sections. Using organization_members data for the leaders section makes it editable via the existing admin panel.

### 4. Service detail page shows service image prominently

**Choice**: Display the `image_url` on the Layanan detail page as a hero/banner image at the top, with fallback to no image
**Alternatives considered**: Small thumbnail, no image
**Rationale**: A full-width hero image for each service creates a more immersive and professional feel, matching modern service pages on security company websites.

### 5. SVG placeholder images generated in `/public/images/`

**Choice**: Create SVG files directly in `/public/images/` for all placeholder needs (hero banner, team photos, service images, client logos, gallery photos, about image)
**Alternatives considered**: Using external placeholder services (placeholder.com), base64 data URIs
**Rationale**: SVG files are lightweight, scalable, visually professional (can use brand colors), and work offline. They can be replaced with real images later without code changes.

### 6. Seed data updated with new columns and richer content

**Choice**: Update `scripts/seed.ts` to include: hero fields for beranda page, `image_url` for tentang-kami page, `image_url` for services, client records with logo URLs, and organization member photos pointing to SVG placeholders
**Alternatives considered**: Separate seed script
**Rationale**: Updating the existing seed script keeps things simple. Using `INSERT ... ON DUPLICATE KEY UPDATE` for pages ensures the new columns get populated.

## Risks / Trade-offs

- **SVG placeholder quality**: Hand-crafted SVGs may not perfectly represent real photos. Mitigation: Use abstract/gradient SVGs that look professional even as placeholders; clearly mark them as replaceable.
- **Legalitas content structure change**: Moving from raw HTML to structured cards means the admin editor content format changes. Mitigation: The Legalitas page can still fall back to raw HTML rendering if structured data isn't available; the redesigned page adds a structured layer on top.
- **Tentang Kami redesign breaking existing content**: The page currently relies on raw HTML content. The redesign adds structured sections while still rendering the page content. Mitigation: Keep `dangerouslySetInnerHTML` for body content but add structured sections around it.
- **Seed data size**: Adding SVG files and more seed content increases repo size. Mitigation: SVGs are typically small (<5KB each); total addition should be under 100KB.