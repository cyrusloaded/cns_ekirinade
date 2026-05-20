"use client";

import {useRef} from "react";
import Link from "next/link";
import Image from "next/image";
import {ArrowRight, ChevronLeft, ChevronRight} from "lucide-react";
import {makeItemHref} from "@/lib/slug";
import type {LandingPageContent} from "@/types/cms";

export default function CampusChronicles({content}: {content: LandingPageContent["chronicles"]}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({left: direction === "left" ? -width : width, behavior: "smooth"});
  };

  return (
    <section className="py-12 sm:py-16 bg-surface">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#320056]">{content.title}</h2>
          <div className="flex gap-3">
            <div onClick={() => scroll("left")} className="px-2 py-2 border border-slate-300 rounded-lg cursor-pointer text-[#320056] hover:bg-gray-100 transition"><ChevronLeft size={23} /></div>
            <div onClick={() => scroll("right")} className="px-2 py-2 border border-slate-300 rounded-lg cursor-pointer text-[#320056] hover:bg-gray-100 transition"><ChevronRight size={23} /></div>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-4 py-3 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide">
          {content.items.map((card, i) => (
            <div key={`${card.title}-${i}`} className="snap-start min-w-[85%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[30%]">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
                <div className="relative w-full aspect-[16/11] sm:aspect-[16/10]">
                  <Image src={card.image} alt={card.alt || card.title} fill className="object-cover" />
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 flex flex-col flex-grow">
                  <p className="text-[10px] sm:text-xs font-semibold uppercase text-[#005768] mb-1">{card.category}</p>
                  <h3 className="text-base sm:text-lg font-bold text-[#320056] mb-2 leading-snug">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">{card.desc}</p>
                  <Link href={makeItemHref("/news", card.title, card.slug, card.href)} className="text-xs sm:text-sm font-semibold text-[#320056] flex items-center gap-2 hover:gap-3 transition-all mt-auto">Read Article <ArrowRight size={16} /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
