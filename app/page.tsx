import HeroSection from "@/components/landing/HeroSection";
import MissionVision from "@/components/landing/MissionVision";
import WhyChooseSection from "@/components/landing/WhyChooseSection";
import ProgrammesSection from "@/components/landing/ProgrammesSection";
import CampusChronicles from "@/components/landing/CampusChronicles";
import {getPageContent} from "@/lib/cms";
import type {LandingPageContent} from "@/types/cms";

export default async function HomePage() {
  const page = await getPageContent<LandingPageContent>("home");

  return (
    <main>
      <HeroSection content={page.content.hero} />
      <MissionVision content={page.content.missionVision} />
      <WhyChooseSection />
      <ProgrammesSection content={page.content.programmes} />
      <CampusChronicles content={page.content.chronicles} />
    </main>
  );
}
