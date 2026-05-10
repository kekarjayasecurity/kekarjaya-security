## ADDED Requirements

### Requirement: Icon registry

The system SHALL provide a centralized icon registry (`lib/icons.ts`) that maps icon names to their SVG path strings and human-readable labels. The registry SHALL contain all icons currently used in the application plus additional icons from lucide-react for admin selection.

#### Scenario: Icon registry contains all existing icons
- **WHEN** the icon registry is loaded
- **THEN** it SHALL contain entries for all 32+ SVG path strings currently hardcoded in the application, each with a unique name, label, and the existing SVG path string

#### Scenario: Icon registry provides lookup by name
- **WHEN** a component needs an icon by name (e.g., `"shield-check"`)
- **THEN** the registry SHALL return the corresponding SVG path string and label

### Requirement: Icon name storage in database

The system SHALL store icon names (e.g., `"shield-check"`, `"document-text"`) instead of raw SVG path strings in all database fields that reference icons (`services.icon`, `pages.sections` JSON values with `icon` keys).

#### Scenario: Services use icon names
- **WHEN** a service is saved with an icon field
- **THEN** the `icon` field SHALL store a short icon name string (e.g., `"shield-check"`) rather than an SVG path string

#### Scenario: Page sections use icon names
- **WHEN** page sections JSON contains an `icon` key (in values, documents, or why_choose_us items)
- **THEN** the value SHALL be an icon name string rather than an SVG path string

### Requirement: Icon picker component

The system SHALL provide an `IconPicker` component (`components/ui/IconPicker.tsx`) that allows admin users to visually search, browse, and select icons with a live preview.

#### Scenario: Admin searches for an icon
- **WHEN** an admin types in the IconPicker search input
- **THEN** the icon grid SHALL filter to show only icons whose name or label matches the search query (case-insensitive)

#### Scenario: Admin selects an icon
- **WHEN** an admin clicks an icon in the picker grid
- **THEN** the IconPicker SHALL close and set the selected icon name as the field value, with a visual preview of the selected icon displayed next to the input

#### Scenario: IconPicker shows visual preview
- **WHEN** the IconPicker is open or an icon is selected
- **THEN** each icon in the grid and the selected icon preview SHALL render the actual SVG icon visually using the path from the registry

### Requirement: Icon picker integration in admin forms

The admin panel SHALL use the `IconPicker` component for all icon fields in section editors and the service editor, replacing plain text inputs.

#### Scenario: Section editor uses IconPicker for icon fields
- **WHEN** an admin edits a page section that has an `icon` field (values, documents)
- **THEN** the SectionEditor SHALL render an IconPicker dropdown instead of a text input for that field

#### Scenario: Service editor uses IconPicker
- **WHEN** an admin edits a service and its icon field
- **THEN** the service editor SHALL render an IconPicker dropdown instead of the current text input

### Requirement: Frontend icon rendering from registry

All public-facing components SHALL render icons by looking up icon names from the registry instead of using hardcoded SVG path strings.

#### Scenario: Components use registry for icon lookup
- **WHEN** a component receives an icon name (e.g., `"shield-check"`)
- **THEN** it SHALL look up the SVG path from the icon registry and render it, falling back to a default icon if the name is not found

#### Scenario: BerandaClient uses registry for service icons
- **WHEN** BerandaClient renders service icons
- **THEN** it SHALL use the centralized icon registry instead of the inline `serviceIcons` map

#### Scenario: TentangKamiClient uses registry for value icons
- **WHEN** TentangKamiClient renders company values
- **THEN** it SHALL look up icon names from the registry for both default and admin-configured values

#### Scenario: LegalitasClient uses registry for document icons
- **WHEN** LegalitasClient renders document cards
- **THEN** it SHALL look up icon names from the registry for both default and admin-configured documents

### Requirement: Database migration for icon names

The system SHALL provide a migration script (`scripts/migrate-v4.ts`) that converts existing SVG path strings stored in the database to their corresponding icon names.

#### Scenario: Services icon field migrated
- **WHEN** the migration script runs
- **THEN** all `services.icon` field values that contain SVG path strings SHALL be replaced with their corresponding icon name from the registry

#### Scenario: Page sections icon fields migrated
- **WHEN** the migration script runs
- **THEN** all `icon` keys within `pages.sections` JSON that contain SVG path strings SHALL be replaced with their corresponding icon name from the registry, with NULL/empty sections left unchanged