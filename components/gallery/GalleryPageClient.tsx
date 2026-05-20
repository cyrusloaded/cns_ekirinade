"use client";

import {useState} from "react";
import GalleryCTA from "@/components/gallery/GalleryCTA";
import GalleryFilters from "@/components/gallery/GalleryFilters";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryHero from "@/components/gallery/GalleryHero";
import type {GalleryPageContent} from "@/types/cms";
import {publishedItems} from "@/lib/visibility";

export default function GalleryPageClient({content}: {content: GalleryPageContent}) {
  const [activeFilter, setActiveFilter] = useState("All Moments");

  return (
    <main className="min-h-screen bg-[#f8f9fb] pt-24 pb-16 text-slate-900 sm:pt-28 lg:pt-32 lg:pb-20">
      <GalleryHero content={content.hero} />
      <GalleryFilters filters={content.filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <GalleryGrid activeFilter={activeFilter} items={publishedItems(content.items)} featuredLibrary={content.featuredLibrary} />
      <GalleryCTA content={content.cta} />
    </main>
  );
}
