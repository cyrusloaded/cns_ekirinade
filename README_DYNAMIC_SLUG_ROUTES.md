# Dynamic slug routes for Read More / Learn More / Read Article links

This update ensures every public content CTA routes to a dedicated SEO-friendly detail page instead of `#`, `/news`, or old static HTML paths.

## Added routes

- `/news/[slug]`
- `/programmes/[slug]`
- `/facilities/[slug]`

## Added helpers

- `lib/slug.ts`
  - `slugify(...)`
  - `makeItemHref(...)`

- `lib/content-items.ts`
  - normalizes CMS JSON content into detail-page records.
  - supports news featured story, news updates, homepage campus chronicles, programmes, and facilities.

## Updated buttons/links

- Homepage `Read Article` buttons now route to `/news/[slug]`.
- News `Read Full Story` and `Read More` buttons now route to `/news/[slug]`.
- Homepage programme `Learn More` buttons now route to `/programmes/[slug]`.
- Programmes page `Learn More` links now route to `/programmes/[slug]`.
- Facilities `Learn More`/link text buttons now route to `/facilities/[slug]`.
- Old `programmes.html` was removed and replaced with Next.js routes.

## CMS fields to use from admin

For each content item, add or edit these fields inside the visual admin manager:

```json
{
  "title": "Content title",
  "slug": "seo-friendly-url",
  "description": "Short summary",
  "body": ["First paragraph", "Second paragraph"],
  "image": "/uploads/example.jpg",
  "alt": "Helpful image alt text"
}
```

If `slug` is missing, the app automatically creates one from the item title.

If `body` is missing, the detail page falls back to the item description so the route still works.

## Important

After seeding, existing database records may still have older content without explicit slugs. That is okay because the app generates fallback slugs from titles. If an item has `href: "/news"`, it is treated as a collection link and the app still routes to `/news/[generated-slug]`.
