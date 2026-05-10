## ADDED Requirements

### Requirement: Prose content styling for public pages
The system SHALL apply comprehensive typography and spacing styles to all elements rendered within `.prose` containers on public pages, matching the formatting available in the TipTap rich text editor. Styles SHALL cover: headings (h1-h4), paragraphs, ordered/unordered lists, blockquotes, links, tables, strong/em/mark, and images.

#### Scenario: Rich text headings render with proper hierarchy
- **WHEN** a page renders HTML content within a `.prose` container containing `<h2>`, `<h3>`, and `<h4>` tags
- **THEN** each heading SHALL display with distinct sizing, weight, spacing, and color consistent with the primary color scheme (primary-700 for headings)

#### Scenario: Rich text lists render with proper styling
- **WHEN** a page renders HTML content within a `.prose` container containing `<ul>` and `<ol>` tags
- **THEN** lists SHALL display with proper indentation, bullet/number styling, spacing between items, and primary-color markers

#### Scenario: Rich text links render with accent colors
- **WHEN** a page renders HTML content within a `.prose` container containing `<a>` tags
- **THEN** links SHALL display with the accent-500 color and underline, with hover state changing to accent-600

#### Scenario: Rich text images render responsively
- **WHEN** a page renders HTML content within a `.prose` container containing `<img>` tags
- **THEN** images SHALL display at full width with rounded corners, responsive sizing, and proper spacing

### Requirement: Prose styles use project color tokens
The `.prose` styles SHALL reference the project's Tailwind theme tokens (`primary-700`, `accent-500`, etc.) for headings, links, and accent elements, ensuring visual consistency with the rest of the site.

#### Scenario: Prose heading colors match site theme
- **WHEN** a heading is rendered within `.prose`
- **THEN** the heading color SHALL be `primary-700` (the same color used in page titles)

#### Scenario: Prose link colors match site accent
- **WHEN** a link is rendered within `.prose`
- **THEN** the link color SHALL be `accent-500` with hover state `accent-600`