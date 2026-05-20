import {prisma} from "@/lib/prisma";
import {footerSeed, navigationSeed, pageSeedMap} from "@/lib/site-seed";
import type {FooterContent, NavItem, PageContent} from "@/types/cms";

async function safeDb<T>(operation: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await operation();
  } catch {
    return fallback;
  }
}

export async function getNavigation(): Promise<NavItem[]> {
  return safeDb(async () => {
    const items = await prisma.siteNavigationItem.findMany({
      where: {isVisible: true},
      orderBy: {order: "asc"},
    });
    return items.map((item) => ({label: item.label, href: item.href, order: item.order, isVisible: item.isVisible}));
  }, navigationSeed);
}

export async function getFooter(): Promise<FooterContent> {
  return safeDb(async () => {
    const footer = await prisma.siteFooter.findUnique({where: {key: "default"}});
    return (footer?.content as FooterContent) || footerSeed;
  }, footerSeed);
}

export async function getPageContent<T = Record<string, unknown>>(slug: string): Promise<PageContent<T>> {
  const fallback = (pageSeedMap as Record<string, PageContent<T>>)[slug] || ({slug, title: slug, content: {} as T} satisfies PageContent<T>);

  return safeDb(async () => {
    const page = await prisma.sitePage.findUnique({where: {slug}});
    if (!page) return fallback;
    return {
      slug: page.slug,
      title: page.title,
      seoTitle: page.seoTitle ?? undefined,
      seoDescription: page.seoDescription ?? undefined,
      content: page.content as T,
    };
  }, fallback);
}
