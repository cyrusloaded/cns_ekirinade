import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, Calendar, Clock, Tag} from "lucide-react";
import type {DetailContentItem} from "@/lib/content-items";

export default function ContentDetailPage({item}: {item: DetailContentItem}) {
  return (
    <main className="bg-surface font-body text-on-surface pt-28 pb-20">
      <article className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <Link href={item.backHref} className="mb-8 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-secondary hover:underline">
          <ArrowLeft size={18} /> {item.backLabel}
        </Link>

        <header className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            {item.eyebrow ? <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.24em] text-secondary">{item.eyebrow}</p> : null}
            <h1 className="font-headline text-4xl font-black leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl">{item.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-on-surface-variant sm:text-lg">{item.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {item.category ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-secondary"><Tag size={15} /> {item.category}</span>
              ) : null}
              {item.date ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary"><Calendar size={15} /> {item.date}</span>
              ) : null}
              {item.duration ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary"><Clock size={15} /> {item.duration}</span>
              ) : null}
            </div>
          </div>

          {item.image ? (
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] bg-surface-container-low shadow-xl shadow-primary/5">
                <Image src={item.image} alt={item.imageAlt || item.title} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
              </div>
            </div>
          ) : null}
        </header>

        <section className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="space-y-6 text-base leading-8 text-on-surface-variant sm:text-lg">
                {item.body.map((paragraph, index) => (
                  <p key={`${item.slug}-${index}`}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {item.meta?.length ? (
            <aside className="lg:col-span-4">
              <div className="sticky top-28 rounded-[2rem] bg-surface-container-low p-6 sm:p-8">
                <h2 className="mb-5 font-headline text-xl font-extrabold text-primary">Quick Details</h2>
                <dl className="space-y-4">
                  {item.meta.map((meta, index) => (
                    <div key={`${meta.label}-${index}`} className="rounded-2xl bg-white p-4 shadow-sm">
                      <dt className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">{meta.label}</dt>
                      <dd className="mt-1 text-sm font-bold text-primary">{meta.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          ) : null}
        </section>
      </article>
    </main>
  );
}
