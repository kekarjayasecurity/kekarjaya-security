## ADDED Requirements

### Requirement: Legalitas page structured document cards
The system SHALL render the Legalitas page with structured document cards instead of a plain HTML list. Each legal document SHALL be displayed as a card with an icon, document name, description/number, and optional detail.

#### Scenario: Legalitas page displays document cards
- **WHEN** a user visits the Legalitas page
- **THEN** the system SHALL render legal documents as individual styled cards, each containing an icon, document title (bold), and description/registration number, arranged in a responsive grid

#### Scenario: Legalitas page content rendered within prose styling
- **WHEN** a user visits the Legalitas page and the page has rich content beyond the structured cards
- **THEN** the system SHALL also render the page's HTML content within a `.prose` styled container below the document cards

### Requirement: Legalitas document data structure
The Legalitas page SHALL display a predefined set of legal documents (Akta Pendirian, SIUJK, SIUP, TDP, NPWP, Sertifikat SNI) as structured cards with icons. These SHALL be hardcoded in the page component since they are static legal references, while additional content from the database renders below.

#### Scenario: Each document card shows icon, title, and number
- **WHEN** the Legalitas page renders
- **THEN** each document card SHALL display: (1) a relevant SVG icon, (2) the document title in bold, (3) the registration number or description in secondary text