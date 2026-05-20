import Image from "next/image";
import type {AboutPageContent} from "@/types/cms";

export default function HeroSection({content}: {content: AboutPageContent["hero"]}) {
  const highlighted = content.title.replace("Healers", "<span class='text-[#005768] italic'>Healers</span>");
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-screen-2xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 z-10 text-center lg:text-left">
          <h4 className="text-[#005768] font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-3 sm:mb-4">{content.eyebrow}</h4>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-[#320056] leading-tight lg:leading-none tracking-tight mb-6" dangerouslySetInnerHTML={{__html: highlighted.replace(" of Tomorrow.", " of Tomorrow.")}} />
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-md mx-auto lg:mx-0 leading-relaxed">{content.description}</p>
        </div>
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <div className="relative aspect-[4/5] w-full max-w-[280px] sm:max-w-sm md:max-w-md rounded-[2rem] sm:rounded-[3rem] overflow-hidden editorial-shadow group">
            {content.image && <Image src={content.image.src} alt={content.image.alt} fill priority sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-[-6.5rem] w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-[#B3EBFF]/70 backdrop-blur-xl rounded-xl -z-10"></div>
        </div>
      </div>
    </section>
  );
}
