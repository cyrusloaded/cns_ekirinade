import {admissionIconMap} from "./icon-map";

type AdmissionStepCardProps = {
  number: string;
  icon: string;
  title: string;
  description: string;
};

export default function AdmissionStepCard({number, icon, title, description}: AdmissionStepCardProps) {
  const Icon = admissionIconMap[icon];

  return (
    <div className="bg-[#E0E3E6]/30 p-6 md:p-8 rounded-xl relative group hover:bg-primary transition-colors duration-300">
      <span className="text-5xl font-black text-[#320056]/10 group-hover:text-white/10 absolute top-4 right-6">{number}</span>
      <span className="material-symbols-outlined text-secondary mb-4 group-hover:text-secondary-fixed-dim">{Icon ? <Icon size={20} className="mb-4" /> : null}</span>
      <h3 className="font-headline font-bold text-primary mb-2 group-hover:text-white">{title}</h3>
      <p className="text-xs text-on-surface-variant group-hover:text-white/70">{description}</p>
    </div>
  );
}
