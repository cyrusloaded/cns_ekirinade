# Admin Sidebar CRUD Update

The admin dashboard sidebar now routes every menu item to its own management page instead of sending multiple sections to the generic JSON/page editor.

## Admin routes

- `/admin` — dashboard overview
- `/admin/settings` — website settings hub
- `/admin/pages` — all page content manager
- `/admin/programmes` — programmes CRUD manager
- `/admin/news` — news/articles/events CRUD manager
- `/admin/gallery` — gallery CRUD manager
- `/admin/faculty` — faculty/staff CRUD manager
- `/admin/admissions` — admission journey CRUD manager plus admission applications
- `/admin/navigation` — navigation CRUD manager
- `/admin/footer` — footer manager
- `/admin/submissions` — contact and admission submissions
- `/admin/student-portal` — student portal timer manager

## CRUD behavior

The new collection managers can:

- create new records
- edit existing records
- update and save to PostgreSQL through the existing CMS API
- publish/unpublish records
- delete records
- upload images from the admin device
- automatically create editable image alt text after upload

## Database flow

The managers update the existing `SitePage.content` JSON data through:

- `GET /api/cms/[slug]`
- `PUT /api/cms/[slug]`

No new Prisma schema table is required for this update because each section already belongs to its page content record.

## Published/draft behavior

Content records use an optional `published` boolean.

- `published: true` or missing means visible.
- `published: false` means draft/unpublished.

The public website now filters unpublished records for:

- programmes
- news updates
- gallery items
- faculty/staff profiles
- admission journey steps
- dynamic detail pages for news and programmes
