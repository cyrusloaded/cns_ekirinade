export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "content";
}

export function makeItemHref(basePath: string, title: string, slug?: string, href?: string): string {
  if (href && href !== "#" && href !== basePath) return href;
  return `${basePath}/${slug || slugify(title)}`;
}
