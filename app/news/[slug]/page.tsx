import {notFound} from "next/navigation";
import ContentDetailPage from "@/components/content/ContentDetailPage";
import {getPageContent} from "@/lib/cms";
import {getChronicleDetailItems, getNewsDetailItems} from "@/lib/content-items";
import type {LandingPageContent, NewsPageContent} from "@/types/cms";

type Props = {params: Promise<{slug: string}>};

async function getItem(slug: string) {
  const [newsPage, homePage] = await Promise.all([
    getPageContent<NewsPageContent>("news"),
    getPageContent<LandingPageContent>("home"),
  ]);

  return [...getNewsDetailItems(newsPage.content), ...getChronicleDetailItems(homePage.content)].find((item) => item.slug === slug);
}

export async function generateMetadata({params}: Props) {
  const {slug} = await params;
  const item = await getItem(slug);
  if (!item) return {title: "News item not found"};
  return {title: `${item.title} | News`, description: item.description};
}

export default async function NewsDetailPage({params}: Props) {
  const {slug} = await params;
  const item = await getItem(slug);
  if (!item) notFound();
  return <ContentDetailPage item={item} />;
}
