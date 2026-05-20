import type {FacultyPageContent} from "@/types/cms";

export default function FacultyStaffHeader({content}: {content: FacultyPageContent["header"]}) {
  return (
    <header className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 md:items-end mb-12 md:mb-20">
      <div className="md:col-span-7">
        <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">{content.eyebrow}</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-headline tracking-tighter text-primary leading-[0.95]">{content.title.split(" ").slice(0,3).join(" ")} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{content.title.split(" ").slice(3).join(" ")}</span></h1>
      </div>
      <div className="md:col-span-5 md:pb-2">
        <p className="text-on-surface-variant text-sm sm:text-base md:text-lg border-l-4 border-secondary pl-4 sm:pl-6 max-w-md leading-relaxed">{content.description}</p>
      </div>
    </header>
  );
}
