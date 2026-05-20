"use client";

import Image from "next/image";
import {Quote} from "lucide-react";
import type {AboutPageContent} from "@/types/cms";

export default function LeadershipSection({content}: {content: AboutPageContent["leadership"]}) {
  return (
    <section className="bg-[#f3f4f6] py-16 md:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl aspect-[3/4]">
            <Image src={content.portrait.src} alt={content.portrait.alt} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#3b0066]/90 via-[#5a0099]/80 to-[#1a002e]/90" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-white text-xl md:text-2xl font-bold">{content.name}</h3>
              <p className="text-[#4CD6FB] text-sm md:text-base font-medium">{content.role}</p>
            </div>
          </div>
        </div>
        <div>
          <Quote className="text-[#0ea5a4] w-8 h-8 md:w-10 md:h-10 mb-4" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2d0a4e] leading-tight mb-6">{content.title.split(" ").slice(0,5).join(" ")} <br /> {content.title.split(" ").slice(5).join(" ")}</h2>
          <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed italic">{content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <div className="mt-10"><Image src={content.signature.src} alt={content.signature.alt} width={120} height={50} className="opacity-70 grayscale" /></div>
        </div>
      </div>
    </section>
  );
}
