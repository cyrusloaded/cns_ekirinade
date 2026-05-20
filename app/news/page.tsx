import NewsPageClient from "@/components/news/NewsPageClient";
import {getPageContent} from "@/lib/cms";
import type {NewsPageContent} from "@/types/cms";

export default async function NewsPage() {
  const page = await getPageContent<NewsPageContent>("news");
  return <NewsPageClient content={page.content} />;
}
