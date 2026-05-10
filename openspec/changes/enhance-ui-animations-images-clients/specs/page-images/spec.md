## ADDED Requirements

### Requirement: Image on Tentang Kami page
The system SHALL display an image alongside the content on the Tentang Kami (About Us) page. The image SHALL be positioned to the side of the text content (left on desktop, above on mobile) and SHALL be configurable via the admin panel.

#### Scenario: Tentang Kami displays side image
- **WHEN** a user visits the Tentang Kami page and an image has been configured
- **THEN** the system SHALL render the page content with the image positioned to the left of the text on desktop screens and above the text on mobile screens

#### Scenario: Tentang Kami with no image configured
- **WHEN** a user visits the Tentang Kami page and no image has been configured
- **THEN** the system SHALL render the page content in full width without an image, maintaining the current layout

### Requirement: Image field on Tentang Kami admin editor
The admin panel SHALL allow uploading and setting a page image for the Tentang Kami page. The image URL SHALL be stored in the `pages` table as `image_url`.

#### Scenario: Admin sets Tentang Kami image
- **WHEN** an admin edits the Tentang Kami page in the admin panel
- **THEN** the admin SHALL see an image upload field in addition to the existing title and content editor

### Requirement: Service card images on Layanan
The system SHALL display an image thumbnail on each service card in the Layanan listing page. Each service SHALL support an optional image that appears at the top of its card.

#### Scenario: Layanan card displays service image
- **WHEN** a user visits the Layanan listing page and a service has an image configured
- **THEN** the service card SHALL display the image at the top of the card above the service title and description

#### Scenario: Layanan card with no image
- **WHEN** a service does not have an image configured
- **THEN** the service card SHALL display the existing SVG icon in place of the image

### Requirement: Image field on service admin editor
The admin panel SHALL allow uploading and setting an image for each service. The image URL SHALL be stored in the `services` table as `image_url`.

#### Scenario: Admin sets service image
- **WHEN** an admin creates or edits a service in the admin panel
- **THEN** the admin SHALL see an image upload field in addition to the existing title, icon, description, and content editor