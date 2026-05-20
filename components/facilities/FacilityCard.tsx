import Link from "next/link";
import {ArrowRight} from "lucide-react";
import Image from "next/image";
import {makeItemHref} from "@/lib/slug";

type FacilityCardProps = {
  title: string;
  slug?: string;
  href?: string;
  description: string;
  image: string;
  alt?: string;
  tag?: string;
  large?: boolean;
  linkText?: string;
  chips?: string[];
};

export default function FacilityCard({title, slug, href, description, image, alt, tag, large = false, linkText, chips = []}: FacilityCardProps) {
  return (
    <div className={`bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col ${large ? "md:col-span-2" : ""}`}>
      <div className={large ? "h-64 relative" : "h-48 relative"}>
        <Image src={image} alt={alt || title} fill className="object-cover" />
        {tag ? <div className="absolute bottom-4 left-4 bg-primary text-white/80 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{tag}</div> : null}
      </div>

      <div className="p-6 md:p-8 flex-grow">
        <h3 className={`font-headline font-bold text-primary mb-3 ${large ? "text-2xl" : "text-xl"}`}>{title}</h3>
        <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">{description}</p>

        {large ? (
          <ul className="flex flex-wrap gap-2 mt-4">
            {chips.map((item) => (
              <li key={item} className="bg-[#E0E3E6] text-on-surface-variant px-3 py-1 rounded-full text-xs font-medium">{item}</li>
            ))}
          </ul>
        ) : null}

        {linkText ? (
          <Link className="inline-flex items-center text-secondary font-bold text-sm mt-4 hover:underline" href={makeItemHref("/facilities", title, slug, href)}>
            {linkText}
            <span className="material-symbols-outlined ml-1 text-sm"><ArrowRight size={16} /></span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
