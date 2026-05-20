import type {GalleryPageContent} from "@/types/cms";

export default function GalleryCTA({content}: {content: GalleryPageContent["cta"]}) {
  return (
    <section className="mx-auto mt-16 max-w-screen-2xl px-4 sm:px-6 lg:mt-28 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#320056] px-5 py-12 text-center sm:px-8 sm:py-16 lg:p-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="mb-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">{content.title}</h2>
          <p className="mb-8 text-sm leading-relaxed text-white/75 sm:text-base lg:text-lg">{content.description}</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
            <button className="rounded-full bg-white px-8 py-4 text-xs font-extrabold uppercase tracking-widest text-[#320056] transition-all hover:-translate-y-0.5 hover:shadow-2xl sm:text-sm">{content.primaryLabel}</button>
            <button className="rounded-full border-2 border-[#005768] px-8 py-4 text-xs font-extrabold uppercase tracking-widest text-teal-300 transition-all hover:bg-[#005768]/20 sm:text-sm">{content.secondaryLabel}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
