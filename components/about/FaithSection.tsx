import {Sparkles} from "lucide-react";
import type {AboutPageContent} from "@/types/cms";

export default function FaithSection({content}: {content: AboutPageContent["faith"]}) {
  return (
    <section className="relative overflow-hidden rounded-t-[2.5rem] sm:rounded-t-[3rem] lg:rounded-t-[4rem] px-4 sm:px-6 py-16 md:py-20 lg:py-28 text-white bg-[radial-gradient(circle_at_top,#3b0066_0%,#1a002e_60%,#120021_100%)]">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="flex justify-center mb-6 md:mb-8"><div className="bg-white/5 p-4 rounded-full backdrop-blur-md"><Sparkles className="text-[#4CD6FB] w-8 h-8 md:w-10 md:h-10" /></div></div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 md:mb-6">{content.title}</h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-purple-200/80 max-w-3xl mx-auto leading-relaxed mb-12">{content.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {content.pillars.map((pillar) => (
            <div key={pillar.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:bg-white/10 transition">
              <h4 className="text-[#4CD6FB] font-semibold text-lg mb-2">{pillar.title}</h4>
              <p className="text-sm text-purple-200/70 leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
