## ADDED Requirements

### Requirement: Pages table sections column
The system SHALL add a `sections` JSON column to the `pages` table that stores structured section data for each page. The column SHALL be nullable and default to NULL, ensuring backward compatibility.

#### Scenario: Sections column stores page-specific data
- **WHEN** an admin saves page content with section data for the beranda page
- **THEN** the system SHALL store a JSON object in the `sections` column containing keys like `why_choose_us` with arrays of items

#### Scenario: Pages without sections render with defaults
- **WHEN** a page has a NULL `sections` column
- **THEN** the frontend components SHALL render hardcoded default content without errors

### Requirement: Legalitas document cards editable via admin
The admin panel SHALL allow editing of the Legalitas document cards (title, description, icon) from the page editor. Each document card SHALL be stored as an item in the `sections.documents` array.

#### Scenario: Admin edits legal document cards
- **WHEN** an admin edits the legalitas page in the admin panel
- **THEN** the admin SHALL see a section editor with add/remove/reorder controls for document cards, each with fields for title, description, and icon selection

#### Scenario: Legalitas renders admin-configured documents
- **WHEN** a user visits the Legalitas page and `sections.documents` contains data
- **THEN** the LegalitasClient component SHALL render the document cards from the stored data instead of hardcoded values

#### Scenario: Legalitas with no sections data
- **WHEN** a user visits the Legalitas page and `sections` is NULL or `sections.documents` is empty
- **THEN** the component SHALL render the hardcoded default document cards

### Requirement: Tentang Kami vision, mission, and values editable via admin
The admin panel SHALL allow editing of the Tentang Kami page's vision text, mission items, and company values (title, description, icon) from the page editor.

#### Scenario: Admin edits vision and mission
- **WHEN** an admin edits the tentang-kami page in the admin panel
- **THEN** the admin SHALL see fields for vision text, a list of mission items (add/remove), and a values editor with add/remove controls for each value item (title, description, icon)

#### Scenario: Tentang Kami renders admin-configured sections
- **WHEN** a user visits the Tentang Kami page and `sections` contains vision/mission/values data
- **THEN** the TentangKamiClient component SHALL render the vision, mission, and values from the stored data

#### Scenario: Tentang Kami with no sections data
- **WHEN** a user visits the Tentang Kami page and `sections` is NULL
- **THEN** the component SHALL render the hardcoded default vision text, mission items, and values

### Requirement: Beranda "Why Choose Us" items editable via admin
The admin panel SHALL allow editing of the Beranda "Mengapa Memilih Kami?" section items (title, description, icon) from the page editor.

#### Scenario: Admin edits why-choose-us items
- **WHEN** an admin edits the beranda page in the admin panel
- **THEN** the admin SHALL see a section editor for "Mengapa Memilih Kami" with add/remove controls for each item (title, description, icon)

#### Scenario: Beranda renders admin-configured why-choose-us
- **WHEN** a user visits the Beranda page and `sections.why_choose_us` contains data
- **THEN** the BerandaClient component SHALL render the why-choose-us items from the stored data

#### Scenario: Beranda with no sections data
- **WHEN** a user visits the Beranda page and `sections` is NULL or `sections.why_choose_us` is empty
- **THEN** the component SHALL render the hardcoded default why-choose-us items

### Requirement: Pages API returns sections data
The `/api/admin/pages` and `/api/admin/pages/[id]` endpoints SHALL include the `sections` field in their responses and accept it in PUT requests.

#### Scenario: API returns sections on GET
- **WHEN** an admin requests page data via the API
- **THEN** the response SHALL include the `sections` JSON field

#### Scenario: API saves sections on PUT
- **WHEN** an admin sends a PUT request with `sections` data
- **THEN** the system SHALL persist the `sections` JSON data in the pages table