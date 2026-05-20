import Link from "next/link";
import Image from "next/image";
import {ArrowRight, Calendar, Church} from "lucide-react";
import type {NewsPageContent} from "@/types/cms";
import {makeItemHref} from "@/lib/slug";

export default function FeaturedStory({content}: {content: NewsPageContent["featuredStory"]}) {
  return (
    <section className="group relative">
      <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-sm transition-all duration-500 hover:shadow-xl">
        <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
          <Image src={content.image} alt={content.alt || content.title} fill priority sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw" className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
        </div>
        <div className="relative p-4 sm:-mt-24 sm:p-6 lg:-mt-32 lg:p-10">
          <div className="rounded-2xl bg-white p-5 shadow-2xl sm:p-6 lg:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary">{content.category}</span>
              <span className="flex items-center gap-1 text-xs text-on-surface-variant"><Calendar size={16} />{content.date}</span>
            </div>
            <h2 className="mb-4 text-2xl font-extrabold leading-tight text-primary sm:text-3xl lg:text-4xl">{content.title}</h2>
            <p className="mb-6 max-w-2xl text-sm leading-relaxed text-on-surface-variant sm:text-base">{content.description}</p>
            <Link href={makeItemHref("/news", content.title, content.slug, content.href)} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-tight text-secondary transition-all hover:gap-4">Read Full Story<ArrowRight size={25} className="transition-all group-hover:translate-x-1" /></Link>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 opacity-5 text-primary"><Church size={130} className="material-symbols-outlined text-7xl sm:text-8xl" /></div>
      </div>
    </section>
  );
}
