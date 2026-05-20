# Production Refactor Notes

This package keeps the existing UI styling while making the site production-ready for Next.js + PostgreSQL.

## Included
- Prisma schema and seed data
- Dynamic page content loading from `SitePage`
- Dynamic navigation and footer loading
- CRUD page content API routes
- Submission endpoints for contact and admission forms
- Database-driven pages for:
  - Home
  - About
  - Programmes
  - Admission
  - Facilities
  - Faculty & Staff
  - Gallery
  - News
  - Contacts

## Core Files
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `lib/prisma.ts`
- `lib/cms.ts`
- `lib/site-seed.ts`
- `types/cms.ts`
- `app/api/cms/[slug]/route.ts`
- `app/api/site/navigation/route.ts`
- `app/api/site/footer/route.ts`
- `app/api/contact-submissions/route.ts`
- `app/api/admission-applications/route.ts`

## Setup
1. Add your `DATABASE_URL`
2. Run `npm install`
3. Run `npx prisma generate`
4. Run `npx prisma db push`
5. Run `npm run db:seed`
6. Run `npm run dev`

## Notes
- The visual styling was intentionally preserved.
- Content has been moved into typed CMS page structures so each page can be edited from the database.
- Forms now submit into the database through Next.js API routes.
