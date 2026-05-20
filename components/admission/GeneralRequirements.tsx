import {Calendar, CircleCheck} from "lucide-react";
import type {AdmissionPageContent} from "@/types/cms";

export default function GeneralRequirements({content}: {content: AdmissionPageContent["requirements"]}) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 md:mb-12">{content.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-surface-container-lowest p-6 md:p-10 rounded-2xl shadow-sm border-l-4 border-secondary">
          <h3 className="text-xl font-bold text-primary mb-4">{content.cardTitle}</h3>
          <p className="text-on-surface-variant mb-6">{content.cardDescription}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.subjects.map((subject) => (
              <li key={subject} className="flex items-center gap-3 text-sm font-medium">
                <span className="material-symbols-outlined text-secondary text-lg"><CircleCheck size={20} /></span>
                {subject}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs text-outline font-bold uppercase tracking-widest italic">{content.footnote}</p>
        </div>

        <div className="bg-primary text-on-primary p-8 md:p-10 rounded-2xl flex flex-col justify-center items-center text-center">
          <span className="material-symbols-outlined text-5xl mb-4 text-secondary-fixed-dim"><Calendar size={45} /></span>
          <h3 className="text-white text-xl font-bold mb-2">{content.ageLimit.title}</h3>
          <p className="text-white/80 text-sm">{content.ageLimit.intro}</p>
          <div className="text-4xl font-black my-4 text-secondary-fixed-dim">{content.ageLimit.range}</div>
          <p className="text-white/80 text-sm">{content.ageLimit.outro}</p>
        </div>
      </div>
    </section>
  );
}
