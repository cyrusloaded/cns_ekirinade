import HeroSection from "@/components/landing/HeroSection";
import MissionVision from "@/components/landing/MissionVision";
import WhyChooseSection from "@/components/landing/WhyChooseSection";
import ProgrammesSection from "@/components/landing/ProgrammesSection";
import CampusChronicles from "@/components/landing/CampusChronicles";
import {getPageContent} from "@/lib/cms";
import type {LandingPageContent, AboutPageContent} from "@/types/cms";

export default async function HomePage() {
  const homePage = await getPageContent<LandingPageContent>("home");
  const aboutPage = await getPageContent<AboutPageContent>("about");

  return (
    <main>
      <HeroSection content={homePage.content.hero} />

      <MissionVision content={aboutPage.content.missionVision} />

      <WhyChooseSection content={homePage.content.whyChoose} />

      <ProgrammesSection content={homePage.content.programmes} />

      <CampusChronicles content={homePage.content.chronicles} />
    </main>
  );
}
