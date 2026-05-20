import type {ContactPageContent} from "@/types/cms";

export default function ContactHero({content}: {content: ContactPageContent["hero"]}) {
  return (
    <section className="mx-auto mb-12 max-w-screen-2xl px-4 sm:mb-16 sm:px-6 lg:mb-20 lg:px-8">
      <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="w-full lg:w-1/2">
          <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.22em] text-secondary sm:mb-4 sm:text-xs">{content.eyebrow}</span>
          <h1 className="font-headline text-4xl font-extrabold leading-[0.95] tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            {content.titleLines[0]} <br className="hidden sm:block" /> {content.titleLines[1]}
          </h1>
        </div>

        <div className="w-full lg:w-1/2 lg:pb-2">
          <p className="max-w-xl border-l-4 border-secondary pl-4 text-sm leading-7 text-on-surface-variant sm:pl-6 sm:text-base md:text-lg">{content.description}</p>
        </div>
      </div>
    </section>
  );
}
