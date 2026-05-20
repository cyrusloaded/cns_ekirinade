import Image from "next/image";
import {AtSign, Stethoscope} from "lucide-react";
import type {FacultyPageContent} from "@/types/cms";

type Props = {
  staff: FacultyPageContent["staff"][number];
};

export default function FacultyStaffCard({staff}: Props) {
  return (
    <article className="bg-surface-container-lowest rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 relative">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image src={staff.image} alt={staff.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
      </div>
      <div className="p-5 sm:p-6 md:p-8 relative">
        {staff.featured && <div className="absolute -top-9 sm:-top-12 right-5 sm:right-8 w-16 h-16 sm:w-24 sm:h-24 bg-secondary rounded-full flex items-center justify-center text-on-secondary shadow-lg"><Stethoscope className="text-white w-8 h-8 sm:w-10 sm:h-10" /></div>}
        <span className="text-secondary font-bold text-[11px] sm:text-xs uppercase tracking-widest">{staff.role}</span>
        <h3 className="text-xl sm:text-2xl font-headline font-extrabold text-primary mt-1 mb-3">{staff.name}</h3>
        <p className="text-on-surface-variant text-sm leading-relaxed mb-6">{staff.description}</p>
        <div className="flex items-center gap-3 sm:gap-4 pt-4 border-t border-outline-variant/10">
          <AtSign className="w-5 h-5 text-secondary shrink-0" />
          <a href={`mailto:${staff.email}`} className="text-xs font-semibold text-primary break-all hover:text-secondary transition-colors">{staff.email}</a>
        </div>
        {staff.featured && <span className="absolute bottom-4 right-4 opacity-[0.03] text-primary text-6xl pointer-events-none font-black">✦</span>}
      </div>
    </article>
  );
}
