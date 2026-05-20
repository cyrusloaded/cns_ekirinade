import {notFound} from "next/navigation";
import ContentDetailPage from "@/components/content/ContentDetailPage";
import {getPageContent} from "@/lib/cms";
import {getProgrammeDetailItems} from "@/lib/content-items";
import type {ProgrammesPageContent} from "@/types/cms";

type Props = {params: Promise<{slug: string}>};

async function getItem(slug: string) {
  const page = await getPageContent<ProgrammesPageContent>("programmes");
  return getProgrammeDetailItems(page.content).find((item) => item.slug === slug);
}

export async function generateMetadata({params}: Props) {
  const {slug} = await params;
  const item = await getItem(slug);
  if (!item) return {title: "Programme not found"};
  return {title: `${item.title} | Programmes`, description: item.description};
}

export default async function ProgrammeDetailPage({params}: Props) {
  const {slug} = await params;
  const item = await getItem(slug);
  if (!item) notFound();
  return <ContentDetailPage item={item} />;
}
