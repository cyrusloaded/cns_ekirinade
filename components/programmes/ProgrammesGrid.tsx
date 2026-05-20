import type {ProgrammesPageContent} from "@/types/cms";
import ProgrammeCard from "./ProgrammeCard";
import FeaturedProgramme from "./FeaturedProgramme";

export default function ProgrammesGrid({
  featuredProgramme,
  programmes,
}: {
  featuredProgramme: ProgrammesPageContent["featuredProgramme"];
  programmes: ProgrammesPageContent["programmes"];
}) {
  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-8 mt-16 mb-20 md:mb-28">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        <FeaturedProgramme content={featuredProgramme} />
        {programmes.map((item) => (
          <ProgrammeCard key={`${item.title}-${item.duration}`} {...item} />
        ))}
      </div>
    </section>
  );
}
