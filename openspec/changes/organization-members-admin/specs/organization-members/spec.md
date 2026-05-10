## ADDED Requirements

### Requirement: Organization member list in admin

The admin organization page SHALL display a list of all organization members, each showing name, position, photo thumbnail, and action buttons (edit, delete, move up, move down).

#### Scenario: Admin views member list
- **WHEN** an admin navigates to `/admin/organization`
- **THEN** the page SHALL display the Struktur Organisasi image section AND a "Tim Kepemimpinan" section listing all organization members ordered by `sort_order`

#### Scenario: Member list item displays
- **WHEN** a member exists in the list
- **THEN** each member row SHALL show the member's photo (or a placeholder if none), name, position, and action buttons for edit, delete, move up, and move down

### Requirement: Add new organization member

The admin panel SHALL allow creating new organization members via a modal form with fields for name, position, photo, and sort_order.

#### Scenario: Admin opens add member form
- **WHEN** an admin clicks the "Tambah Anggota" button
- **THEN** a modal SHALL appear with fields for name (required), position (required), photo (via ImageUpload), and sort_order (defaults to end of list)

#### Scenario: Admin creates a member
- **WHEN** an admin fills in the form and clicks save
- **THEN** the member SHALL be created via POST `/api/admin/organization` and the list SHALL refresh to show the new member

### Requirement: Edit organization member

The admin panel SHALL allow editing existing organization members via a modal form pre-filled with the member's current data.

#### Scenario: Admin opens edit member form
- **WHEN** an admin clicks the edit button on a member row
- **THEN** a modal SHALL appear pre-filled with the member's name, position, photo, and sort_order

#### Scenario: Admin updates a member
- **WHEN** an admin modifies the form and clicks save
- **THEN** the member SHALL be updated via PUT `/api/admin/organization/[id]` and the list SHALL refresh to show the changes

### Requirement: Delete organization member

The admin panel SHALL allow deleting organization members with a confirmation prompt.

#### Scenario: Admin deletes a member
- **WHEN** an admin clicks the delete button on a member row and confirms the deletion
- **THEN** the member SHALL be deleted via DELETE `/api/admin/organization/[id]` and the list SHALL refresh without the deleted member

### Requirement: Reorder organization members

The admin panel SHALL allow reordering members via up/down buttons that update the sort_order.

#### Scenario: Admin moves a member up
- **WHEN** an admin clicks the up arrow on a member row
- **THEN** the member's sort_order SHALL swap with the member above it via PUT requests, and the list SHALL refresh in the new order

#### Scenario: Admin moves a member down
- **WHEN** an admin clicks the down arrow on a member row
- **THEN** the member's sort_order SHALL swap with the member below it via PUT requests, and the list SHALL refresh in the new order