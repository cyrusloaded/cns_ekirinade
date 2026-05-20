import Link from "next/link";
import {Download, SquarePen} from "lucide-react";
import {Button} from "../ui/button";
import type {ProgrammesPageContent} from "@/types/cms";

export default function CTASection({content}: {content: ProgrammesPageContent["cta"]}) {
  return (
    <section className="mx-auto max-w-screen-2xl px-4 py-14 text-center sm:px-6 md:py-16 lg:py-20">
      <h2 className="mb-3 text-2xl font-extrabold leading-tight text-primary sm:text-3xl md:text-4xl">{content.title}</h2>
      <p className="mx-auto mb-8 max-w-[620px] text-sm font-semibold leading-relaxed text-on-surface-variant sm:text-base">{content.description}</p>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        <Button asChild className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-primary px-8 py-6 text-sm font-extrabold text-white shadow-lg sm:w-auto sm:min-w-[210px]">
          <Link href={content.primary.href}>
            <SquarePen size={18} strokeWidth={2.8} />
            {content.primary.label}
          </Link>
        </Button>

        <Link href={content.secondary.href} className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#E7E9ED] px-8 py-4 text-sm font-extrabold text-primary transition-colors hover:bg-[#DEE1E6] sm:w-auto sm:min-w-[230px]">
          <Download size={18} strokeWidth={2.8} />
          {content.secondary.label}
        </Link>
      </div>
    </section>
  );
}
