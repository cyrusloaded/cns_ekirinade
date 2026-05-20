import Image from "next/image";
import {ArrowUpRight, MapPinned} from "lucide-react";
import type {ContactPageContent} from "@/types/cms";

export default function ContactMap({content}: {content: ContactPageContent["map"]}) {
  return (
    <section className="mx-auto mt-12 max-w-screen-2xl px-4 sm:mt-16 sm:px-6 lg:mt-20 lg:px-8">
      <div className="relative h-[320px] overflow-hidden rounded-3xl shadow-xl shadow-indigo-900/10 sm:h-[400px] sm:rounded-[2rem] lg:h-[500px]">
        <Image src={content.image.src} alt={content.image.alt} fill className="object-cover grayscale opacity-40 transition-transform duration-1000 group-hover:scale-105" unoptimized />
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />

        <div className="absolute inset-x-4 bottom-4 z-10 rounded-2xl bg-white/90 p-5 backdrop-blur-md shadow-lg sm:inset-x-auto sm:bottom-8 sm:left-8 sm:max-w-sm sm:rounded-[1.75rem] sm:p-6 lg:bottom-12 lg:left-12 lg:p-8">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <MapPinned size={18} />
            <h4 className="font-headline text-lg font-bold sm:text-xl">{content.title}</h4>
          </div>

          <p className="mb-4 text-sm leading-6 text-on-surface-variant">{content.description}</p>

          <a href={content.directionHref} className="inline-flex items-center gap-2 text-sm font-bold text-secondary transition-all hover:gap-3 sm:text-base">
            {content.directionLabel}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
