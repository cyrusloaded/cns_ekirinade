import HeroSection from "@/components/programmes/HeroSection";
import ProgrammesGrid from "@/components/programmes/ProgrammesGrid";
import ClinicalTraining from "@/components/programmes/ClinicalTraining";
import CTASection from "@/components/programmes/CTASection";
import {getPageContent} from "@/lib/cms";
import type {ProgrammesPageContent} from "@/types/cms";
import {publishedItems} from "@/lib/visibility";

export default async function ProgrammesPage() {
  const page = await getPageContent<ProgrammesPageContent>("programmes");

  return (
    <div className="bg-surface font-body text-on-surface">
      <main className="pt-32">
        <HeroSection content={page.content.hero} />
        <ProgrammesGrid featuredProgramme={page.content.featuredProgramme} programmes={publishedItems(page.content.programmes)} />
        <ClinicalTraining content={page.content.clinicalTraining} />
        <CTASection content={page.content.cta} />
      </main>
    </div>
  );
}
