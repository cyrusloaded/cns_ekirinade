import {Eye, HeartPlus, Shell} from "lucide-react";
import type {LandingPageContent} from "@/types/cms";

export default function MissionVision({content}: {content: LandingPageContent["missionVision"]}) {
  return (
    <section className="py-8 md:py-10 bg-[#f3f4f6]">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="relative bg-[#f9fafb] p-8 md:p-12 rounded-3xl overflow-hidden">
            <Shell className="text-[#4B0082] h-16 w-16 mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#2d0a4e] mb-4">{content.mission.title}</h2>
            <p className="text-gray-600 leading-relaxed text-base">{content.mission.body}</p>
            <HeartPlus size={130} className="absolute -bottom-6 right-6 text-[#d1d5db] opacity-40" strokeWidth={2} />
          </div>

          <div className="relative bg-[#f9fafb] p-8 md:p-12 rounded-3xl overflow-hidden">
            <Eye className="text-[#0e7490] h-16 w-16 mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#2d0a4e] mb-4">{content.vision.title}</h2>
            <p className="text-gray-600 leading-relaxed text-base">{content.vision.body}</p>
            <HeartPlus size={130} className="absolute -bottom-6 right-6 text-[#d1d5db] opacity-40" strokeWidth={2} />
          </div>
        </div>
      </div>
    </section>
  );
}
