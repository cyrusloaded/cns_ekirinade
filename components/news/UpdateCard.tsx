import Link from "next/link";
import Image from "next/image";
import {ExternalLink} from "lucide-react";
import type {NewsPageContent} from "@/types/cms";
import {makeItemHref} from "@/lib/slug";

export default function UpdateCard({item}: {item: NewsPageContent["updates"][number]}) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-surface-container-lowest shadow-sm transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-video overflow-hidden">
        <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute left-4 top-4 z-10"><span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur-md">{item.category}</span></div>
      </div>
      <div className={`border-l-4 p-6 sm:p-8 ${item.accent}`}>
        <span className="mb-2 block text-xs text-on-surface-variant">{item.date}</span>
        <h4 className="mb-4 text-xl font-bold leading-tight text-primary transition-colors group-hover:text-secondary">{item.title}</h4>
        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-on-surface-variant">{item.excerpt}</p>
        <Link href={makeItemHref("/news", item.title, item.slug, item.href)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary">Read More<ExternalLink size={20} className="text-sm" /></Link>
      </div>
    </article>
  );
}
