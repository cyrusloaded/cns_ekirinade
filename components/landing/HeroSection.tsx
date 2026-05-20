import Link from "next/link";
import {ArrowRight, BadgeCheck, Landmark} from "lucide-react";
import Image from "next/image";
import {Button} from "../ui/button";
import type {LandingPageContent} from "@/types/cms";

export default function HeroSection({content}: {content: LandingPageContent["hero"]}) {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-[#F2F4F7] overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#005768]/5 px-5 py-2 rounded-full">
              <Landmark className="w-6 h-6 text-[#005768]" />
              <span className="text-[#005768] font-semibold text-xs uppercase tracking-widest">{content.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-[#320056]">
              {content.titleLines[0]} <br />
              <span className="text-[#005768]">{content.highlightLine}</span> <br />
              {content.titleLines[1]} <br />
              {content.titleLines[2]} <br />
              {content.titleLines[3]}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-lg leading-relaxed">{content.description}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-gradient-to-r from-[#320056] to-[#410171] text-white px-8 py-7 cursor-pointer rounded-2xl font-semibold shadow-lg hover:scale-[1.02] transition">
                <Link href={content.primaryCta.href}>{content.primaryCta.label} <ArrowRight /></Link>
              </Button>

              <Button asChild variant="outline" className="border border-gray-300 text-[#320056] px-8 py-7 cursor-pointer rounded-2xl font-semibold hover:bg-white transition">
                <Link href={content.secondaryCta.href}>{content.secondaryCta.label}</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
              <Image src={content.image.src} alt={content.image.alt} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>

            <div className="absolute bottom-6 left-4 sm:left-[-4%] bg-white p-6 rounded-2xl shadow-xl w-[260px] z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-[#005768]/10 rounded-xl flex items-center justify-center">
                  <BadgeCheck className="w-7 h-7 text-[#005768] bg-white rounded-full" />
                </div>
                <h3 className="font-bold text-[#320056] text-lg leading-tight">{content.floatingCard.title.split(" ").slice(0, 1).join(" ")} <br /> {content.floatingCard.title.split(" ").slice(1).join(" ")}</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{content.floatingCard.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
