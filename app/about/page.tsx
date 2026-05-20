import FaithSection from "@/components/about/FaithSection";
import HeroSection from "@/components/about/HeroSection";
import MissionVision from "@/components/about/MissionVision";
import LeadershipSection from "@/components/about/LeadershipSection";
import {getPageContent} from "@/lib/cms";
import type {AboutPageContent} from "@/types/cms";

export default async function AboutPage() {
  const page = await getPageContent<AboutPageContent>("about");

  return (
    <div className="bg-surface font-body text-on-surface">
      <main className="pt-24 light-bloom">
        <HeroSection content={page.content.hero} />
        <MissionVision content={page.content.missionVision} />
        <FaithSection content={page.content.faith} />
        <LeadershipSection content={page.content.leadership} />
      </main>
    </div>
  );
}
