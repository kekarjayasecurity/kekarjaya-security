## ADDED Requirements

### Requirement: Uploaded files are stored in a persistent directory outside the deployment path
The system SHALL store all uploaded files in a directory configured via the `UPLOAD_DIR` environment variable, which points to a path outside the Hostinger deployment directory, ensuring assets persist across redeployments.

#### Scenario: Admin uploads an image through the upload API
- **WHEN** admin sends a POST request to `/api/admin/upload` with a file
- **THEN** the system SHALL write the file to the `UPLOAD_DIR` directory and return the filename

#### Scenario: Default upload directory in development
- **WHEN** `UPLOAD_DIR` is not set in the environment
- **THEN** the system SHALL default to `public/uploads` within the project root (keeping current behavior for development)

#### Scenario: Production uses persistent path
- **WHEN** `UPLOAD_DIR` is set to a persistent path (e.g., `/home/u843025186/uploads`)
- **THEN** the system SHALL read and write files from that path, which persists across redeployments

### Requirement: Uploaded files are served via an API route
Since uploaded files are stored outside the `public/` directory, the system SHALL serve them through a Next.js API route at `/api/uploads/[filename]` that reads from `UPLOAD_DIR`.

#### Scenario: Requesting an uploaded image
- **WHEN** a browser requests `/api/uploads/photo-123.jpeg`
- **THEN** the system SHALL read the file from `UPLOAD_DIR/photo-123.jpeg`, set the appropriate `Content-Type` header based on file extension, and return the file contents with a `Cache-Control: public, max-age=31536000` header

#### Scenario: Requesting a non-existent file
- **WHEN** a browser requests `/api/uploads/nonexistent.jpeg`
- **THEN** the system SHALL return a 404 response

### Requirement: Supported file types and size limits remain unchanged
The upload SHALL enforce the same file type and size restrictions as currently: JPEG, PNG, GIF, WebP formats, max 5MB per file.

#### Scenario: Valid file upload
- **WHEN** admin uploads a 2MB JPEG file
- **THEN** the system SHALL accept and store it in `UPLOAD_DIR` and return the filename

#### Scenario: Oversized file rejection
- **WHEN** admin uploads a file larger than 5MB
- **THEN** the system SHALL reject the upload with a 400 error

#### Scenario: Unsupported file type rejection
- **WHEN** admin uploads a PDF file
- **THEN** the system SHALL reject the upload with a 400 error

### Requirement: Deleting content removes associated files from persistent storage
When an admin deletes content that has associated images (gallery photos, services with images, blog posts, organization members, clients), the system SHALL also delete the corresponding file from `UPLOAD_DIR`.

#### Scenario: Admin deletes a gallery photo
- **WHEN** admin sends a DELETE request for a gallery photo with an uploaded image
- **THEN** the system SHALL delete the file from `UPLOAD_DIR` and remove the database record

#### Scenario: File deletion fails gracefully
- **WHEN** the file to delete does not exist in `UPLOAD_DIR` (e.g., already removed)
- **THEN** the system SHALL still complete the database deletion without erroring, logging the missing file as a warning

### Requirement: Image references use the API route prefix
All image URLs displayed in the application SHALL use the `/api/uploads/filename` path format instead of `/uploads/filename`.

#### Scenario: ImageUpload component displays an uploaded image
- **WHEN** a user uploads an image via the ImageUpload component
- **THEN** the preview SHALL render using `/api/uploads/filename` as the image source

#### Scenario: Public pages display uploaded images
- **WHEN** a public page renders content with an uploaded image filename stored in the database
- **THEN** the image source SHALL use `/api/uploads/filename`

#### Scenario: Backward compatibility with legacy `/uploads/` paths
- **WHEN** the database contains an existing image path starting with `/uploads/`
- **THEN** the system SHALL handle it gracefully by serving it through the API route (the `/api/uploads/` route will still locate the file by filename)

### Requirement: Existing uploads are relocated to persistent storage
A migration script SHALL copy all existing files from `public/uploads/` to the `UPLOAD_DIR` directory so that existing assets are accessible after the change.

#### Scenario: Running the migration
- **WHEN** the migration script is executed with `UPLOAD_DIR` configured
- **THEN** all files in `public/uploads/` SHALL be copied to `UPLOAD_DIR`

#### Scenario: Migration is idempotent
- **WHEN** the migration script is run multiple times
- **THEN** files that already exist in `UPLOAD_DIR` SHALL be skipped (no overwrite)

### Requirement: ImageUpload component works with the new URL convention
The `ImageUpload` component SHALL construct image preview URLs using the `/api/uploads/` prefix instead of `/uploads/`.

#### Scenario: Displaying a newly uploaded image
- **WHEN** a file is uploaded and the API returns a filename
- **THEN** the ImageUpload component SHALL set the preview to `/api/uploads/{filename}`

#### Scenario: Displaying an existing image from database
- **WHEN** the component receives an existing filename as `value`
- **THEN** the component SHALL construct `/api/uploads/{filename}` for the preview, handling both bare filenames and legacy `/uploads/filename` paths