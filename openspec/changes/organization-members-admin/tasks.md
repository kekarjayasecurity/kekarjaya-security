## 1. Admin Organization Page — Member List UI

- [x] 1.1 Rewrite `app/admin/(dashboard)/organization/page.tsx` — fetch members from `/api/admin/organization`, display the existing Struktur Organisasi image section, and add a "Tim Kepemimpinan" section with a list of members showing photo thumbnail, name, position, and action buttons (edit, delete, up, down)
- [x] 1.2 Add "Tambah Anggota" button that opens a modal form for creating a new member

## 2. Member CRUD Modal

- [x] 2.1 Create member form modal with fields: name (required), position (required), photo (ImageUpload), sort_order (number, defaults to end of list)
- [x] 2.2 Wire the modal to POST `/api/admin/organization` for creating members and refresh the list on success
- [x] 2.3 Wire the modal to PUT `/api/admin/organization/[id]` for editing members and refresh the list on success
- [x] 2.4 Add delete confirmation — on clicking delete, confirm then call DELETE `/api/admin/organization/[id]` and refresh the list

## 3. Reorder Members

- [x] 3.1 Implement up/down reorder buttons that swap sort_order values between adjacent members via PUT requests and refresh the list

## 4. Verification

- [x] 4.1 Run `npm run build` to verify no TypeScript or build errors
- [ ] 4.2 Verify admin can list, add, edit, delete, and reorder organization members
- [ ] 4.3 Verify public Tentang Kami page still renders members correctly