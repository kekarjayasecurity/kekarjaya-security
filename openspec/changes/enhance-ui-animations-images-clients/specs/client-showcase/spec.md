## ADDED Requirements

### Requirement: Client showcase section on Beranda
The system SHALL display a "Klien Kami" (Our Clients) section on the Beranda page showing all active clients as a grid of logos with names. Each client SHALL display their logo image and name, and logos SHALL link to the client's website if a URL is provided.

#### Scenario: Beranda displays active clients
- **WHEN** a user visits the Beranda page and there are active clients in the database
- **THEN** the system SHALL render a "Klien Kami" section below the hero and services sections, showing a grid of client logos with names

#### Scenario: Client logo links to website
- **WHEN** a client entry has a `website_url` configured
- **THEN** the client logo and name SHALL be wrapped in a link that opens the website in a new tab

#### Scenario: Client without website URL
- **WHEN** a client entry does not have a `website_url` configured
- **THEN** the client logo and name SHALL be displayed without a link, in a plain container

#### Scenario: No clients configured
- **WHEN** there are no active clients in the database
- **THEN** the "Klien Kami" section SHALL NOT be rendered on the Beranda page

### Requirement: Client grid animation
The "Klien Kami" section SHALL animate client logos into view with a staggered fade-in effect when the section scrolls into the viewport.

#### Scenario: Client logos animate on scroll
- **WHEN** the "Klien Kami" section enters the viewport during scrolling
- **THEN** each client logo SHALL fade in with a 75ms stagger delay between items

### Requirement: Client data model
The system SHALL store client entries in a `clients` database table with the following columns: `id` (INT AUTO_INCREMENT PRIMARY KEY), `name` (VARCHAR NOT NULL), `logo_url` (VARCHAR), `website_url` (VARCHAR), `sort_order` (INT DEFAULT 0), `is_active` (BOOLEAN DEFAULT TRUE), `created_at` (TIMESTAMP), `updated_at` (TIMESTAMP).

#### Scenario: Client record created
- **WHEN** an admin creates a new client
- **THEN** the system SHALL insert a record into the `clients` table with the provided name, logo URL, website URL, sort order, and active status

### Requirement: Admin CRUD for clients
The admin panel SHALL provide full CRUD operations for managing clients at `/admin/clients`. The admin SHALL be able to list, create, edit, and delete client entries, including uploading a logo image for each client.

#### Scenario: Admin lists clients
- **WHEN** an admin navigates to `/admin/clients`
- **THEN** the system SHALL display a table of all clients with columns for logo thumbnail, name, website URL, sort order, active status, and action buttons (edit, delete)

#### Scenario: Admin creates a client
- **WHEN** an admin clicks "Tambah Klien" on the clients list page
- **THEN** the system SHALL present a form with fields for name, logo upload, website URL, sort order, and active status toggle

#### Scenario: Admin edits a client
- **WHEN** an admin clicks edit on a client entry
- **THEN** the system SHALL present a pre-filled form for editing the client's name, logo, website URL, sort order, and active status

#### Scenario: Admin deletes a client
- **WHEN** an admin clicks delete on a client entry and confirms
- **THEN** the system SHALL remove the client record from the database and refresh the list

### Requirement: Client API endpoints
The system SHALL provide RESTful API endpoints for client management at `/api/admin/clients` and `/api/admin/clients/[id]`.

#### Scenario: GET /api/admin/clients
- **WHEN** an authenticated admin sends a GET request to `/api/admin/clients`
- **THEN** the system SHALL return a JSON array of all clients ordered by `sort_order`

#### Scenario: POST /api/admin/clients
- **WHEN** an authenticated admin sends a POST request to `/api/admin/clients` with name, logo_url, website_url, sort_order, and is_active
- **THEN** the system SHALL create a new client record and return it with a 201 status

#### Scenario: PUT /api/admin/clients/[id]
- **WHEN** an authenticated admin sends a PUT request to `/api/admin/clients/[id]` with updated fields
- **THEN** the system SHALL update the client record and return it with a 200 status

#### Scenario: DELETE /api/admin/clients/[id]
- **WHEN** an authenticated admin sends a DELETE request to `/api/admin/clients/[id]`
- **THEN** the system SHALL delete the client record and return a 200 status

#### Scenario: Public client data access
- **WHEN** the Beranda page loads and fetches active clients
- **THEN** the system SHALL provide client data (name, logo_url, website_url) for active clients only, without requiring authentication