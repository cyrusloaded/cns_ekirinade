import Link from "next/link";
import {ArrowUpRight, MoveRight, Stethoscope, UsersRound} from "lucide-react";
import Image from "next/image";
import type {LandingProgrammePreview} from "@/types/cms";
import {makeItemHref} from "@/lib/slug";

const fallbackContent: LandingProgrammePreview = {
  header: {
    title: "Our Professional Paths",
    description: "Specialized training for the future of healthcare",
    viewAllLabel: "View All Programmes",
    viewAllHref: "/programmes",
  },
  cards: [
    {
      title: "General Nursing",
      slug: "general-nursing-rn",
      category: "Nursing Science",
      duration: "3-Year Programme",
      description: "Comprehensive clinical training to become a compassionate Registered Nurse.",
      image: {src: "/path1.png", alt: "Nursing"},
      icon: "Stethoscope",
      ctaLabel: "Learn More",
    },
    {
      title: "Midwifery",
      slug: "post-basic-midwifery",
      category: "Midwifery",
      duration: "2-Year Programme",
      description: "Specialized care in maternal and newborn health with clinical expertise.",
      image: {src: "/path2.png", alt: "Midwifery"},
      icon: "UsersRound",
      ctaLabel: "Learn More",
    },
  ],
};

function ProgrammeIcon({name}: {name?: string}) {
  if (name === "UsersRound") return <UsersRound className="text-[#005768]" size={18} />;
  return <Stethoscope className="text-[#005768]" size={18} />;
}

export default function ProgrammesSection({content}: {content?: LandingProgrammePreview}) {
  const section = content || fallbackContent;

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-surface-container-low">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-10 sm:mb-12 lg:flex-row lg:justify-between lg:items-end">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#320056] font-extrabold">
              {section.header.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-2">
              {section.header.description}
            </p>
          </div>

          <Link
            href={section.header.viewAllHref || "/programmes"}
            className="text-[#005768] text-base sm:text-lg font-bold flex items-center gap-2 hover:underline">
            {section.header.viewAllLabel}
            <ArrowUpRight size={18} className="sm:w-5 sm:h-5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {section.cards.map((card) => (
            <div key={card.title} className="bg-white rounded-3xl sm:rounded-4xl p-3 sm:p-4 group cursor-pointer hover:shadow-2xl transition-all">
              {/* Image (reduced height) */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[5/3] rounded-3xl sm:rounded-4xl overflow-hidden mb-4 sm:mb-5">
                <Image
                  src={card.image.src}
                  alt={card.image.alt || card.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[#320056] text-xs font-bold">
                  {card.duration}
                </div>
              </div>

              {/* Content */}
              <div className="px-2 sm:px-4 pb-4 sm:pb-5">
                <div className="flex items-center gap-2 sm:gap-3 mb-3">
                  <ProgrammeIcon name={card.icon} />
                  <span className="uppercase text-xs sm:text-sm text-[#005768] font-bold tracking-widest">
                    {card.category}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl text-[#320056] font-bold mb-2">
                  {card.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 mb-4">
                  {card.description}
                </p>

                <Link href={makeItemHref("/programmes", card.title, card.slug, card.href)} className="text-sm sm:text-base text-[#320056] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                  {card.ctaLabel || "Learn More"} <MoveRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
