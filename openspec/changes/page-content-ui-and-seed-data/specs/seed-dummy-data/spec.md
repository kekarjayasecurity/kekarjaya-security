## ADDED Requirements

### Requirement: SVG placeholder images for seed data
The system SHALL include SVG placeholder images in `/public/images/` for all content areas that require images: hero banner, tentang kami page image, service images (6), team member photos (6), client logos (8), and gallery photos (10). Each SVG SHALL use the project's primary/accent color palette and look professional as a placeholder.

#### Scenario: Placeholder SVGs use project colors
- **WHEN** a placeholder SVG image is displayed
- **THEN** it SHALL use primary-700, accent-500, and neutral colors consistent with the Kekar Jaya Security brand

#### Scenario: Placeholder SVGs are replaceable
- **WHEN** a real image is uploaded via the admin panel
- **THEN** the admin-uploaded image SHALL replace the placeholder without any code changes

### Requirement: Seed data includes client records
The `scripts/seed.ts` file SHALL seed 8 client records with names, logo URLs pointing to SVG placeholders, website URLs, sort order, and active status into the `clients` table.

#### Scenario: Clients are seeded on database setup
- **WHEN** the seed script runs
- **THEN** 8 client records SHALL be inserted into the `clients` table with logo URLs referencing `/images/clients/` SVG files

### Requirement: Seed data updates pages with hero and image fields
The `scripts/seed.ts` file SHALL update the `pages` table records with `hero_image_url`, `hero_title`, `hero_subtitle` (for beranda), and `image_url` (for tentang-kami) fields pointing to SVG placeholder images.

#### Scenario: Beranda page gets hero fields
- **WHEN** the seed script runs
- **THEN** the beranda page record SHALL have `hero_image_url`, `hero_title`, and `hero_subtitle` populated with placeholder values

#### Scenario: Tentang Kami page gets image_url
- **WHEN** the seed script runs
- **THEN** the tentang-kami page record SHALL have `image_url` populated with a placeholder image path

### Requirement: Seed data updates services with image URLs
The `scripts/seed.ts` file SHALL update the `services` table records with `image_url` fields pointing to SVG placeholder images for each service.

#### Scenario: Services get image placeholders
- **WHEN** the seed script runs
- **THEN** each of the 6 services SHALL have `image_url` populated with a unique placeholder image path

### Requirement: Seed data updates organization members with photo URLs
The `scripts/seed.ts` file SHALL update the `organization_members` table records with `photo` fields pointing to SVG placeholder portraits.

#### Scenario: Team members get photo placeholders
- **WHEN** the seed script runs
- **THEN** each organization member SHALL have `photo` populated with a placeholder portrait path