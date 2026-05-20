import Link from "next/link";
import {ArrowRight, CircleCheck, Clock5, NotebookTabs} from "lucide-react";
import type {ProgrammesPageContent} from "@/types/cms";
import {makeItemHref} from "@/lib/slug";

export default function FeaturedProgramme({content}: {content: ProgrammesPageContent["featuredProgramme"]}) {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] bg-white p-6 shadow-sm sm:rounded-[1.7rem] sm:p-8 md:col-span-8 lg:p-14">
      <div className="absolute left-0 top-0 h-full w-1.5 bg-secondary" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start md:gap-10 lg:gap-14">
        <div className="max-w-full md:max-w-[430px]">
          <span className="mb-4 block text-[11px] font-extrabold uppercase tracking-[0.22em] text-secondary sm:mb-6 sm:text-xs">{content.eyebrow}</span>

          <h2 className="mb-4 font-headline text-3xl font-extrabold leading-[1.08] tracking-tight text-primary sm:text-4xl md:mb-6 lg:text-5xl">
            {content.titleLines[0]}
            <br />
            {content.titleLines[1]}
          </h2>

          <p className="mb-6 leading-[1.5] sm:text-md md:mb-8">{content.description}</p>

          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center text-white">
              <Clock5 className="text-secondary" size={20} strokeWidth={3} />
            </span>
            <span className="text-base font-extrabold text-primary sm:text-md">{content.duration}</span>
          </div>

          <Link href={makeItemHref("/programmes", content.titleLines.join(" "), content.slug)} className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-secondary hover:underline">
            Learn More <ArrowRight size={16} />
          </Link>
        </div>

        <div className="rounded-xl bg-[#F1F2F6] p-5 sm:p-7 md:min-h-[240px] lg:min-h-[300px] lg:p-9">
          <h3 className="mb-5 flex items-center gap-3 font-headline text-lg font-extrabold text-primary sm:text-xl md:mb-6">
            <NotebookTabs size={24} className="shrink-0 text-primary" strokeWidth={2.6} />
            {content.requirementsTitle}
          </h3>

          <ul className="space-y-4 text-sm sm:text-md md:space-y-5">
            {content.requirements.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CircleCheck size={18} className="mt-1 shrink-0 text-secondary" strokeWidth={3} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
