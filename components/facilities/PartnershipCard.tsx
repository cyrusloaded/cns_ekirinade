import {facilitiesIconMap} from "./icon-map";

type PartnershipCardProps = {
  icon: string;
  title: string;
  description: string;
};

export default function PartnershipCard({icon, title, description}: PartnershipCardProps) {
  const Icon = facilitiesIconMap[icon];

  return (
    <div className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border-l-4 border-secondary shadow-sm">
      <span className="material-symbols-outlined text-primary text-4xl mb-4">{Icon ? <Icon size={35} className="mb-5" /> : null}</span>
      <h3 className="text-lg sm:text-xl font-headline font-bold text-primary mb-2">{title}</h3>
      <p className="text-sm sm:text-md text-slate-700 leading-relaxed">{description}</p>
    </div>
  );
}
