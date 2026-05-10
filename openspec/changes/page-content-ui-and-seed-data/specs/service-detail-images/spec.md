## ADDED Requirements

### Requirement: Service detail hero image
The system SHALL display the service image at the top of the Layanan detail page as a prominent hero banner when a service has an `image_url` configured.

#### Scenario: Service detail page displays hero image
- **WHEN** a user visits a service detail page and the service has an `image_url` configured
- **THEN** the system SHALL render a full-width hero banner image at the top of the page, with the service title overlaid on a gradient

#### Scenario: Service detail page without image
- **WHEN** a user visits a service detail page and the service has no `image_url`
- **THEN** the system SHALL render a solid primary-color hero section with the service title

### Requirement: Service detail page structured layout
The Layanan detail page SHALL display service content (description, body content, CTA) in a structured layout with proper spacing, section dividers, and prose styling for the rich text body.

#### Scenario: Service content renders with prose styling
- **WHEN** a user views a service detail page with rich text content
- **THEN** the content SHALL render within a `.prose` container with full typography support (headings, lists, links, etc.)