import AdmissionsHero from "@/components/admission/AdmissionsHero";
import AdmissionJourney from "@/components/admission/AdmissionJourney";
import GeneralRequirements from "@/components/admission/GeneralRequirements";
import ApplicationForm from "@/components/admission/ApplicationForm";
import FAQSidebar from "@/components/admission/FAQSidebar";
import {getPageContent} from "@/lib/cms";
import type {AdmissionPageContent} from "@/types/cms";

export default async function AdmissionsPage() {
  const page = await getPageContent<AdmissionPageContent>("admission");

  return (
    <div className="bg-surface font-body text-on-surface">
      <AdmissionsHero content={page.content.hero} />

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-8 space-y-16 md:space-y-24">
            <AdmissionJourney content={page.content.journey} />
            <GeneralRequirements content={page.content.requirements} />
            <ApplicationForm content={page.content.applicationForm} />
          </div>

          <FAQSidebar content={page.content.faq} />
        </div>
      </main>
    </div>
  );
}
