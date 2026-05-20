import type {AdmissionPageContent} from "@/types/cms";
import AdmissionStepCard from "./AdmissionStepCard";
import {publishedItems} from "@/lib/visibility";

export default function AdmissionJourney({content}: {content: AdmissionPageContent["journey"]}) {
  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary">{content.title}</h2>
        <p className="text-on-surface-variant font-label text-sm max-w-xs">{content.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {publishedItems(content.steps).map((step) => <AdmissionStepCard key={step.number} {...step} />)}
      </div>
    </section>
  );
}
