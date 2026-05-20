export function publishedItems<T extends {published?: boolean}>(items: T[] = []): T[] {
  return items.filter((item) => item.published !== false);
}
