import {Church} from "lucide-react";
import type {FacilitiesPageContent} from "@/types/cms";
import {facilitiesIconMap} from "./icon-map";

export default function HealingMinistry({content}: {content: FacilitiesPageContent["healingMinistry"]}) {
  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
      <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
        <span className="material-symbols-outlined text-[14rem] md:text-[20rem] text-white"><Church size={340} /></span>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-headline font-extrabold text-white mb-6">{content.title}</h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">{content.description}</p>

          <div className="flex flex-col sm:flex-row gap-6">
            {content.pillars.map((pillar) => {
              const Icon = facilitiesIconMap[pillar.icon];
              return (
                <div key={pillar.label} className="flex items-center gap-4 text-white">
                  <span className="material-symbols-outlined text-secondary-fixed-dim">{Icon ? <Icon /> : null}</span>
                  <span className="font-bold">{pillar.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
