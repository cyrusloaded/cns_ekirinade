import Image from "next/image";
import {ArrowRight} from "lucide-react";
import {galleryIconMap} from "./icon-map";
import type {GalleryPageContent} from "@/types/cms";

export default function FeaturedLibraryCard({
  content,
}: {
  content: GalleryPageContent["featuredLibrary"];
}) {
  const Icon = galleryIconMap[content.icon] || galleryIconMap.LibraryBig;

  return (
    <article className="group col-span-12 mt-2 cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl sm:mt-6">
      <div className="flex flex-col lg:flex-row">
        <div className="relative min-h-[260px] w-full overflow-hidden sm:min-h-[360px] lg:min-h-[420px] lg:w-2/3">
          <Image
            src={content.image}
            alt={content.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
        </div>
        <div className="relative flex w-full flex-col justify-center overflow-hidden bg-[#f3f0f7] p-6 sm:p-8 lg:w-1/3 lg:p-12">
          <Icon className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 text-[#320056]/5 sm:h-56 sm:w-56" />
          <div className="relative z-10">
            <span className="mb-3 block text-xs font-extrabold uppercase tracking-[0.2em] text-[#005768]">
              {content.category}
            </span>
            <h3 className="mb-4 text-3xl font-extrabold leading-tight text-[#320056] sm:text-4xl">
              {content.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              {content.description}
            </p>
            <div className="mt-7">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#320056] shadow-sm transition-all group-hover:bg-[#005768] group-hover:text-white">
                <ArrowRight className="h-6 w-6" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
