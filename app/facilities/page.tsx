import FacilitiesHero from "@/components/facilities/FacilitiesHero";
import ClinicalPartnerships from "@/components/facilities/ClinicalPartnerships";
import CampusFacilities from "@/components/facilities/CampusFacilities";
import HealingMinistry from "@/components/facilities/HealingMinistry";
import {getPageContent} from "@/lib/cms";
import type {FacilitiesPageContent} from "@/types/cms";

export default async function FacilitiesPage() {
  const page = await getPageContent<FacilitiesPageContent>("facilities");

  return (
    <div className="bg-surface font-body text-on-surface">
      <main className="pt-24">
        <FacilitiesHero content={page.content.hero} />
        <ClinicalPartnerships content={page.content.partnerships} />
        <CampusFacilities content={page.content.campusFacilities} />
        <HealingMinistry content={page.content.healingMinistry} />
      </main>
    </div>
  );
}
