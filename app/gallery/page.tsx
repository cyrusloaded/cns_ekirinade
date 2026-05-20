import GalleryPageClient from "@/components/gallery/GalleryPageClient";
import {getPageContent} from "@/lib/cms";
import type {GalleryPageContent} from "@/types/cms";

export default async function GalleryPage() {
  const page = await getPageContent<GalleryPageContent>("gallery");
  return <GalleryPageClient content={page.content} />;
}
