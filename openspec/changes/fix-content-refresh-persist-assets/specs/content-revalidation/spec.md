## ADDED Requirements

### Requirement: Admin content changes are immediately visible on public pages
When an admin user creates, updates, or deletes content through any admin API route, the system SHALL invalidate the Next.js cache for the affected public pages so that the next visitor sees the updated content without requiring a redeployment.

#### Scenario: Admin updates a page
- **WHEN** admin sends a PUT request to `/api/admin/pages` to update page content
- **THEN** the system SHALL call `revalidatePath()` for the affected public page path(s) and return a successful response

#### Scenario: Admin creates a new blog post
- **WHEN** admin sends a POST request to `/api/admin/blog/posts` to create a published blog post
- **THEN** the system SHALL revalidate the blog listing path and the new post's path

#### Scenario: Admin deletes a service
- **WHEN** admin sends a DELETE request to `/api/admin/services`
- **THEN** the system SHALL revalidate the services listing path and the deleted service's detail path

#### Scenario: Admin updates a gallery photo
- **WHEN** admin sends a PUT request to `/api/admin/gallery/photos`
- **THEN** the system SHALL revalidate the gallery page path

### Requirement: Revalidation targets are specific to the content type
The system SHALL use targeted revalidation paths rather than site-wide cache purges, so that updating one content type does not unnecessarily invalidate unrelated pages.

#### Scenario: Updating a service does not invalidate blog pages
- **WHEN** admin updates a service
- **THEN** only service-related paths (`/layanan`, `/layanan/[slug]`, and the homepage `/`) are revalidated; blog and gallery paths remain cached

#### Scenario: Updating the homepage page content
- **WHEN** admin updates the page with slug `beranda`
- **THEN** the system SHALL revalidate the root path `/`

### Requirement: All content-mutating admin API routes trigger revalidation
Every admin API route that modifies content in the database SHALL call `revalidatePath()` or `revalidateTag()` after the database operation succeeds.

#### Scenario: Complete list of routes that must trigger revalidation
- **WHEN** any of the following admin API routes perform a POST, PUT, or DELETE operation:
  - `/api/admin/pages` → revalidate `/[slug]` paths and `/`
  - `/api/admin/services` → revalidate `/layanan` and `/layanan/[slug]` and `/`
  - `/api/admin/blog/posts` → revalidate `/blog` and `/blog/[slug]`
  - `/api/admin/blog/categories` → revalidate `/blog`
  - `/api/admin/gallery/photos` → revalidate `/galeri`
  - `/api/admin/gallery/categories` → revalidate `/galeri`
  - `/api/admin/faq` → revalidate `/faq`
  - `/api/admin/organization` → revalidate `/tentang-kami`
  - `/api/admin/clients` → revalidate `/`
- **THEN** the system SHALL call the appropriate revalidation after the DB mutation completes

### Requirement: Public pages use appropriate caching
Public pages SHALL set `export const revalidate` to a reasonable time interval (e.g., 3600 seconds) so that Next.js serves cached pages between mutations, improving performance while still allowing on-demand revalidation.

#### Scenario: Homepage serves cached version between admin edits
- **WHEN** a visitor requests the homepage and no admin edits have occurred since the last cache
- **THEN** Next.js SHALL serve the cached page without hitting the database

#### Scenario: Homepage serves fresh content after admin edit
- **WHEN** an admin edits the homepage content and then a visitor requests the homepage
- **THEN** Next.js SHALL serve the fresh page with updated content