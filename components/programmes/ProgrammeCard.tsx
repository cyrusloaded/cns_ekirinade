import Link from "next/link";
import {ArrowRight, Clock5} from "lucide-react";
import {makeItemHref} from "@/lib/slug";

type Props = {
  title: string;
  slug?: string;
  href?: string;
  duration: string;
  description: string;
  noteTitle: string;
  note: string;
};

export default function ProgrammeCard({
  title,
  slug,
  href,
  duration,
  description,
  noteTitle,
  note,
}: Props) {
  return (
    <div className="md:col-span-4 bg-white rounded-tl-none rounded-bl-none rounded-[2rem] p-6 md:p-8 relative">
      {/* Accent line */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>

      <h2 className="font-headline text-xl md:text-2xl font-bold text-primary mb-3">
        {title}
      </h2>

      <div className="flex items-center gap-2 mb-4 text-secondary text-sm font-bold">
        <Clock5 className="text-secondary" size={20} strokeWidth={3} />
        {duration}
      </div>

      <p className="text-slate-600 text-sm mb-6 leading-relaxed">
        {description}
      </p>

      <div className="pt-4 border-t border-outline-variant/20">
        <p className="text-sm font-bold text-primary mb-2">{noteTitle}</p>
        <p className="text-sm text-slate-600">{note}</p>
        <Link href={makeItemHref("/programmes", title, slug, href)} className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-secondary hover:underline">
          Learn More <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
