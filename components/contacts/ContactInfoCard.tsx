import {Stethoscope} from "lucide-react";
import type {ContactPageContent} from "@/types/cms";
import {contactIconMap} from "./icon-map";
import ContactInfoItem from "./ContactInfoItem";

export default function ContactInfoCard({content}: {content: ContactPageContent["infoCard"]}) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm sm:rounded-[2rem] sm:p-8 lg:p-10">
      <div className="absolute left-0 top-0 h-full w-1 bg-secondary" />

      <div className="relative z-10">
        <h3 className="mb-6 font-headline text-xl font-bold text-primary sm:mb-8 sm:text-2xl">{content.title}</h3>

        <div className="space-y-5 sm:space-y-6">
          {content.items.map((item) => {
            const Icon = contactIconMap[item.icon];
            return <ContactInfoItem key={item.title} icon={Icon ? <Icon size={18} /> : null} title={item.title} lines={item.lines} />;
          })}
        </div>
      </div>

      <Stethoscope className="absolute -bottom-3 -right-3 h-20 w-20 rotate-12 text-primary/5 sm:h-28 sm:w-28" />
    </div>
  );
}
