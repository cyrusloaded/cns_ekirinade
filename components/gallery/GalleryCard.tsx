import Image from "next/image";
import {type LucideIcon} from "lucide-react";

type GalleryCardProps = {
  title: string;
  category: string;
  image: string;
  alt: string;
  icon: LucideIcon;
  className?: string;
  imageClassName?: string;
  featured?: boolean;
  hasAccent?: boolean;
};

export default function GalleryCard({
  title,
  category,
  image,
  alt,
  icon: Icon,
  className = "",
  imageClassName = "aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3]",
  featured = false,
  hasAccent = false,
}: GalleryCardProps) {
  return (
    <article
      className={`group relative col-span-12 overflow-hidden rounded-xl sm:rounded-2xl z-10 bg-white shadow-sm ring-1 ring-slate-200/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${className}`}>
      {hasAccent && (
        <div className="absolute left-0 top-0 z-20 h-full w-1 bg-[#005768] sm:w-1.5" />
      )}
      <div className={`relative w-full overflow-hidden ${imageClassName}`}>
        <Image
          src={image}
          alt={alt}
          fill
          unoptimized
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1535px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#320056]/80 via-[#320056]/10 to-transparent opacity-70 sm:opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div
        className={`flex items-end justify-between gap-3 sm:gap-4 ${featured ? "p-4 sm:p-5 lg:p-6 xl:p-8" : "p-4 sm:p-5 lg:p-6"}`}>
        <div className="min-w-0 flex-1">
          <span className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#005768] sm:text-[11px] lg:text-xs">
            {category}
          </span>
          <h3
            className={`text-[#320056] font-bold leading-tight break-words ${featured ? "text-lg sm:text-xl md:text-2xl lg:text-3xl" : "text-base sm:text-lg md:text-xl lg:text-2xl"}`}>
            {title}
          </h3>
        </div>
        <div className="shrink-0 self-end">
          <Icon
            className={`text-[#320056]/15 transition-colors duration-300 group-hover:text-[#005768] ${featured ? "h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10" : "h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8"}`}
          />
        </div>
      </div>
    </article>
  );
}
