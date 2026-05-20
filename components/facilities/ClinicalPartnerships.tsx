import type {FacilitiesPageContent} from "@/types/cms";
import PartnershipCard from "./PartnershipCard";

export default function ClinicalPartnerships({content}: {content: FacilitiesPageContent["partnerships"]}) {
  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-xl sm:text-3xl font-headline font-extrabold text-primary tracking-tight mb-4">{content.title}</h2>
            <div className="w-16 h-1 bg-secondary mb-6" />
            <p className="text-sm sm:text-lg text-slate-700 leading-relaxed">{content.description}</p>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.items.map((item) => <PartnershipCard key={item.title} {...item} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
