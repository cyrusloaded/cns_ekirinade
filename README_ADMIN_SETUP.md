# Admin Page Setup

## Admin URL
Open:

```bash
http://localhost:3000/admin
```

## What it manages
- `/admin/pages` → create, read, update, delete page content
- `/admin/navigation` → manage header navigation links
- `/admin/footer` → manage footer JSON content
- `/admin/submissions` → read and delete contact/admission entries

## Required database setup
Run:

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

## APIs used by admin
- `GET /api/cms`
- `POST /api/cms`
- `GET /api/cms/[slug]`
- `PUT /api/cms/[slug]`
- `DELETE /api/cms/[slug]`
- `GET /api/site/navigation`
- `PUT /api/site/navigation`
- `GET /api/site/footer`
- `PUT /api/site/footer`
- `GET /api/contact-submissions`
- `DELETE /api/contact-submissions/[id]`
- `GET /api/admission-applications`
- `DELETE /api/admission-applications/[id]`

## Notes
The page editor uses structured JSON so the admin can manage all existing page sections without changing public UI styles.
