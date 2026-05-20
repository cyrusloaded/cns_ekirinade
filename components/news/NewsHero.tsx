import type {NewsPageContent} from "@/types/cms";

export default function NewsHero({content}: {content: NewsPageContent["hero"]}) {
  return (
    <header className="mb-12 lg:mb-16">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-secondary">{content.eyebrow}</span>
          <h1 className="text-4xl font-extrabold leading-none tracking-tight text-primary sm:text-5xl lg:text-7xl">{content.title.split(" ").slice(0,1).join(" ")} & <span className="text-secondary">{content.title.split(" ").slice(1).join(" ")}</span></h1>
        </div>
        <div className="border-l-4 border-secondary-container py-2 pl-5 text-sm italic leading-relaxed text-on-surface-variant md:max-w-xs sm:pl-6">{content.description}</div>
      </div>
    </header>
  );
}
