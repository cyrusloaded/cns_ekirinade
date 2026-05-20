import type {ProgrammesPageContent} from "@/types/cms";

export default function HeroSection({content}: {content: ProgrammesPageContent["hero"]}) {
  return (
    <section className="bg-[#F3F4F6] py-6">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h1 className="font-extrabold tracking-tight leading-[1] lg:leading-[0.95]">
              <span className="block text-[#320056] text-4xl sm:text-7xl">{content.titleLines[0]}</span>
              <span className="block text-[#0B6E6E] text-4xl sm:text-7xl">{content.titleLines[1]}</span>
            </h1>
          </div>

          <div className="lg:col-span-5">
            <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-md">{content.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
