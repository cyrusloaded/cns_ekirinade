import Image from "next/image";
import type {FacilitiesPageContent} from "@/types/cms";

export default function FacilitiesHero({content}: {content: FacilitiesPageContent["hero"]}) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0">
        <Image src={content.image.src} alt={content.image.alt} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/60" />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl py-8 md:py-12">
          <span className="text-secondary-fixed-dim font-headline font-bold tracking-widest uppercase text-xs mb-4 block">{content.eyebrow}</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-extrabold text-white tracking-tighter leading-none mb-6">{content.titleLines[0]} <br /> &amp; {content.titleLines[1]}</h1>
          <p className="text-base md:text-xl text-white/70 leading-relaxed opacity-90 max-w-xl">{content.description}</p>
        </div>
      </div>
    </section>
  );
}
