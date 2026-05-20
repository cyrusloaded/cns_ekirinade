import type {GalleryPageContent} from "@/types/cms";

export default function GalleryHero({content}: {content: GalleryPageContent["hero"]}) {
  return (
    <section className="mx-auto mb-10 max-w-screen-2xl px-4 sm:px-6 lg:px-8 lg:mb-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between lg:gap-12">
        <div className="w-full md:w-1/2">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-[#005768] sm:text-sm">{content.eyebrow}</span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#320056] sm:text-5xl md:text-6xl lg:text-7xl">{content.title.split(" ").slice(0,2).join(" ")} <br /> {content.title.split(" ").slice(2).join(" ")}</h1>
        </div>
        <div className="w-full border-l-4 border-[#005768]/20 pl-5 py-1 md:w-1/3 md:pl-8">
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base lg:text-lg">{content.description}</p>
        </div>
      </div>
    </section>
  );
}
