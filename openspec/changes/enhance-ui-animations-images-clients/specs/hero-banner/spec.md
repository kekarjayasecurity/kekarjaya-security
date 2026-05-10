## ADDED Requirements

### Requirement: Hero banner image on Beranda
The system SHALL display a full-width hero banner image at the top of the Beranda (homepage) page. The banner SHALL use a background image configured via the admin panel with an overlay gradient for text readability.

#### Scenario: Beranda displays hero banner with image
- **WHEN** a user visits the Beranda page
- **THEN** the system SHALL render a full-width hero section at the top with a background image, a dark gradient overlay, and the configured hero title and subtitle text

#### Scenario: Hero banner with no image configured
- **WHEN** a user visits the Beranda page and no hero image has been configured
- **THEN** the system SHALL render the hero section with a solid dark background color and the hero text without an image

### Requirement: Hero text overlay with animation
The system SHALL display a hero title and subtitle overlaid on the banner image. The title and subtitle SHALL animate in on page load (title slides up, subtitle fades in after a delay).

#### Scenario: Hero text animates on load
- **WHEN** the Beranda page loads and the hero section renders
- **THEN** the hero title SHALL animate with a slide-up motion and the subtitle SHALL fade in 200ms after the title animation starts

### Requirement: Hero content editable via admin
The admin panel SHALL allow editing of the Beranda hero image, title, and subtitle from the page editor. These fields SHALL be stored in the `pages` table as `hero_image_url`, `hero_title`, and `hero_subtitle`.

#### Scenario: Admin configures hero banner
- **WHEN** an admin edits the Beranda page in the admin panel
- **THEN** the admin SHALL see fields for hero image upload, hero title, and hero subtitle in addition to the existing content editor

#### Scenario: Admin saves hero configuration
- **WHEN** an admin saves the Beranda page with hero fields filled
- **THEN** the hero image, title, and subtitle SHALL be persisted and displayed on the public Beranda page