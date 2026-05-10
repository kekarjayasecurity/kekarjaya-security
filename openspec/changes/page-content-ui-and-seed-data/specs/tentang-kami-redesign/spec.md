## ADDED Requirements

### Requirement: Tentang Kami structured hero section
The system SHALL display a hero section at the top of the Tentang Kami page with a full-width banner image, overlay title, and subtitle text, pulling from the page's `image_url` and `hero_title`/`hero_subtitle` content.

#### Scenario: Tentang Kami displays hero with image
- **WHEN** a user visits the Tentang Kami page and an `image_url` is configured
- **THEN** the system SHALL render a hero section at the top with the image as a background, a dark gradient overlay, and the page title overlay

#### Scenario: Tentang Kami hero without image
- **WHEN** a user visits the Tentang Kami page and no `image_url` is configured
- **THEN** the system SHALL render the hero section with a solid primary-color background and the title text

### Requirement: Tentang Kami vision and mission section
The system SHALL render vision and mission as distinct styled cards below the hero section, extracted from the page's HTML content or rendered as independent sections with matching styles.

#### Scenario: Vision and mission display as cards
- **WHEN** a user visits the Tentang Kami page
- **THEN** the system SHALL display "Visi" and "Misi" as separate styled cards with icons and distinct visual treatment

### Requirement: Tentang Kami company values section
The system SHALL render company values (Integritas, Profesionalisme, Kepercayaan, Disiplin) as a grid of value cards with icons and descriptions below the vision/mission section.

#### Scenario: Values grid renders with icons
- **WHEN** a user visits the Tentang Kami page
- **THEN** the system SHALL display value cards in a responsive grid (2 columns on mobile, 4 on desktop), each with an icon, title, and description

### Requirement: Tentang Kami leadership section
The system SHALL render a leadership/founder section pulling data from the `organization_members` table, displaying team members as cards with photo, name, and position.

#### Scenario: Leadership section renders from organization_members data
- **WHEN** a user visits the Tentang Kami page and organization members exist in the database
- **THEN** the system SHALL display a "Tim Kepemimpinan" section with member cards showing photo (or placeholder), name, and position in a responsive grid

#### Scenario: Leadership section with no members
- **WHEN** no organization members exist in the database
- **THEN** the leadership section SHALL NOT be rendered