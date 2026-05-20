import Image from "next/image";
import type {ProgrammesPageContent} from "@/types/cms";
import {programmeIconMap} from "./icon-map";

export default function ClinicalTraining({content}: {content: ProgrammesPageContent["clinicalTraining"]}) {
  return (
    <section className="relative overflow-hidden bg-[#EFF1F4] py-14 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="mb-4 block text-[11px] font-extrabold uppercase tracking-[0.22em] text-secondary sm:text-xs">{content.eyebrow}</span>
            <h2 className="mb-6 max-w-[620px] font-headline text-4xl font-extrabold leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-[3.35rem]">{content.title}</h2>
            <p className="mb-8 max-w-[640px] text-base font-semibold leading-relaxed text-on-surface-variant sm:text-lg">{content.description}</p>

            <div className="space-y-6 sm:space-y-7">
              {content.partners.map(({name, icon}) => {
                const Icon = programmeIconMap[icon];
                return (
                  <div key={name} className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-md">
                      {Icon ? <Icon size={22} className="text-secondary" strokeWidth={3} /> : null}
                    </div>
                    <span className="font-headline text-base font-extrabold text-primary sm:text-lg">{name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[1.15/1] overflow-hidden rounded-xl shadow-sm">
              <Image src={content.image.src} alt={content.image.alt} fill className="object-cover grayscale" />
            </div>
            <div className="absolute -bottom-9 left-1/2 w-[82%] max-w-[310px] -translate-x-1/2 rounded-xl bg-white p-6 shadow-xl sm:left-10 sm:w-[330px] sm:translate-x-0 sm:p-7 lg:-left-10">
              <p className="font-headline text-base font-extrabold italic leading-snug text-primary sm:text-lg">&quot;{content.quote}&quot;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
