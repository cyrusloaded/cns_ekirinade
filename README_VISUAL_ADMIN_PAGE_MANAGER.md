# Visual Admin Page Manager Update

This update replaces the old JSON-only page editor with a visual form-based CMS screen.

## Main route

```txt
/admin/pages
```

## What changed

- The admin page manager now follows the supplied dashboard/list-card format.
- Page records are displayed as searchable cards with edit and delete actions.
- The editor opens as a modal-style form.
- SEO fields are editable through normal inputs.
- Page content is editable through generated nested form fields instead of a JSON textarea.
- Arrays such as cards, FAQs, staff lists, gallery items, news updates, programme lists, requirements, and links can be edited item-by-item.
- Admins can add new array items.
- Admins can remove array items.
- Admins can add new fields inside page content objects.
- Saving still updates the same PostgreSQL `SitePage.content` JSON column through Prisma.

## Important files changed

```txt
components/admin/PageManager.tsx
components/admin/AdminSidebar.tsx
app/admin/layout.tsx
app/admin/page.tsx
```

## Database flow

The admin still uses the existing API routes:

```txt
GET    /api/cms
POST   /api/cms
GET    /api/cms/[slug]
PUT    /api/cms/[slug]
DELETE /api/cms/[slug]
```

So your existing Prisma schema does not need to change.

## How to test

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Then open:

```txt
http://localhost:3000/admin/pages
```

Click the edit icon on any page card. You should now see form fields instead of the old JSON editor.
