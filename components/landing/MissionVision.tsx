import {Bird, Eye, HeartPlus, Shell} from "lucide-react";
import type {AboutPageContent} from "@/types/cms";

export default function MissionVision({
  content,
}: {
  content: AboutPageContent["missionVision"];
}) {
  return (
    <section className="py-8 md:py-10 bg-[#f3f4f6]">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="relative bg-[#f9fafb] p-8 md:p-12 rounded-3xl overflow-hidden">
            <div className="w-1 absolute left-0 top-8 bottom-8 bg-[#005768]" />

            <Shell className="text-[#4B0082] h-16 w-16 mb-6" />

            <h2 className="text-2xl md:text-3xl font-bold text-[#320056] mb-4">
              {content.mission.title}
            </h2>

            <p className="text-gray-600 leading-relaxed text-base">
              {content.mission.body}
            </p>

            <Bird
              size={120}
              className="absolute -bottom-4 right-6 text-[#d1d5db] opacity-40"
              strokeWidth={1.5}
            />
          </div>

          <div className="relative bg-[#f9fafb] p-8 md:p-12 rounded-3xl overflow-hidden">
            <div className="w-1 absolute left-0 top-8 bottom-8 bg-[#005768]" />

            <Eye className="text-[#0e7490] h-16 w-16 mb-6" />

            <h2 className="text-2xl md:text-3xl font-bold text-[#320056] mb-4">
              {content.vision.title}
            </h2>

            <p className="text-gray-600 leading-relaxed text-base">
              {content.vision.body}
            </p>

            <HeartPlus
              size={130}
              className="absolute -bottom-6 right-6 text-[#d1d5db] opacity-40"
              strokeWidth={2}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
