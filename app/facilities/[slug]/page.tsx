import {notFound} from "next/navigation";
import ContentDetailPage from "@/components/content/ContentDetailPage";
import {getPageContent} from "@/lib/cms";
import {getFacilityDetailItems} from "@/lib/content-items";
import type {FacilitiesPageContent} from "@/types/cms";

type Props = {params: Promise<{slug: string}>};

async function getItem(slug: string) {
  const page = await getPageContent<FacilitiesPageContent>("facilities");
  return getFacilityDetailItems(page.content).find((item) => item.slug === slug);
}

export async function generateMetadata({params}: Props) {
  const {slug} = await params;
  const item = await getItem(slug);
  if (!item) return {title: "Facility not found"};
  return {title: `${item.title} | Facilities`, description: item.description};
}

export default async function FacilityDetailPage({params}: Props) {
  const {slug} = await params;
  const item = await getItem(slug);
  if (!item) notFound();
  return <ContentDetailPage item={item} />;
}
