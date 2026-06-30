"use client";

import {ArrowRight, Bird, Eye, HeartPlus, Shell} from "lucide-react";
import Image from "next/image";
import type {AboutPageContent} from "@/types/cms";

export default function MissionVision({
  content,
}: {
  content: AboutPageContent["missionVision"];
}) {
  return (
    <>
      <section className="bg-surface-container-low py-12 px-4 sm:px-6 md:py-16 lg:py-24">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl relative overflow-hidden">
              <div className="w-1 absolute left-0 top-8 bottom-8 bg-[#005768]"></div>
              <Shell className="text-[#4B0082] h-16 w-16 mb-6" />
              <h2 className="text-2xl sm:text-3xl font-headline font-bold text-[#320056] mb-4 sm:mb-6">
                {content.mission.title}
              </h2>
              <p className="text-on-surface-variant leading-relaxed text-base sm:text-lg">
                {content.mission.body}
              </p>
              <Bird
                size={120}
                className="absolute -bottom-4 right-6 text-[#d1d5db] opacity-40"
                strokeWidth={1.5}
              />
            </div>
            <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl relative overflow-hidden">
              <div className="w-1 absolute left-0 top-8 bottom-8 bg-[#005768]"></div>
              <Eye className="text-[#0e7490] h-16 w-16 mb-6" />
              <h2 className="text-2xl sm:text-3xl font-headline font-bold text-[#320056] mb-4 sm:mb-6">
                {content.vision.title}
              </h2>
              <p className="text-on-surface-variant leading-relaxed text-base sm:text-lg">
                {content.vision.body}
              </p>
              <HeartPlus
                size={130}
                className="absolute -bottom-6 right-6 text-[#d1d5db] opacity-40"
                strokeWidth={2}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 md:py-16 lg:py-24 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-extrabold text-[#320056] tracking-tight mb-6 sm:mb-8 leading-tight">
              {content.story.title.split(" ").slice(0, 3).join(" ")} <br />{" "}
              {content.story.title.split(" ").slice(3).join(" ")}
            </h2>
            <div className="flex items-center gap-4 cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md border-2 border-outline-variant flex items-center justify-center text-secondary-hover:bg-[#005768]-hover:text-white transition-all">
                <ArrowRight className="text-[#005768] w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="font-headline font-bold text-xs sm:text-sm tracking-widest uppercase">
                {content.story.ctaLabel}
              </span>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-8 sm:space-y-10 md:space-y-12">
            <p className="text-lg sm:text-xl md:text-2xl font-light text-on-surface leading-snug">
              {content.story.intro}
            </p>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {content.story.images.map((image, index) => (
                <div
                  key={image.src}
                  className={`aspect-square rounded-2xl sm:rounded-3xl overflow-hidden ${index === 1 ? "mt-6 sm:mt-10 md:mt-12" : ""}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="prose prose-sm sm:prose-base md:prose-lg text-on-surface-variant">
              {content.story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
