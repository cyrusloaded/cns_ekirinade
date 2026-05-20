import Image from "next/image";
import {CircleCheck} from "lucide-react";
import type {FacilitiesPageContent} from "@/types/cms";
import FacilityCard from "./FacilityCard";
import {facilitiesIconMap} from "./icon-map";

export default function CampusFacilities({content}: {content: FacilitiesPageContent["campusFacilities"]}) {
  const UsersIcon = facilitiesIconMap.Users;

  return (
    <section className="py-16 md:py-24 bg-surface-container-low">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl  font-extrabold text-primary tracking-tight">{content.title}</h2>
          <p className="text-sm sm:text-lg text-slate-700 mt-4 max-w-2xl mx-auto">{content.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FacilityCard large tag={content.featured.tag} title={content.featured.title} slug={content.featured.slug} description={content.featured.description} image={content.featured.image} alt={content.featured.alt} chips={content.featured.chips} linkText="Learn More" />
          {content.items.map((item) => <FacilityCard key={item.title} {...item} />)}

          <div className="md:col-span-2 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-secondary">{UsersIcon ? <UsersIcon /> : null}</span>
              </div>

              <h3 className="text-2xl  font-bold text-primary mb-3">{content.clinic.title}</h3>
              <p className="text-sm sm:text-md text-slate-700 leading-relaxed mb-6">{content.clinic.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-primary">
                {content.clinic.benefits.map((benefit) => (
                  <span key={benefit} className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-secondary text-sm"><CircleCheck size={15} /></span>
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image src={content.clinic.image} alt={content.clinic.title} fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
