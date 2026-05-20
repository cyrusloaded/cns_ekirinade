import Image from "next/image";
import type {AdmissionPageContent} from "@/types/cms";

export default function AdmissionsHero({content}: {content: AdmissionPageContent["hero"]}) {
  return (
    <header className="relative overflow-hidden bg-[#F2F4F7] px-4 py-24 sm:px-6 sm:py-16 lg:px-8 lg:py-36">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative z-10 text-left">
          <span className="mb-5 inline-block rounded-full bg-[#B8EEFA] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#14313A] sm:text-xs sm:tracking-[0.22em]">{content.badge}</span>
          <h1 className="mb-5 font-headline text-4xl font-extrabold leading-[1.05] tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-[5.4rem]">
            {content.titleLines[0]}
            <br />
            {content.titleLines[1]} <span className="text-secondary">{content.highlight}</span>.
          </h1>
          <p className="max-w-[650px] text-base font-medium leading-relaxed text-on-surface-variant sm:text-lg md:text-xl">{content.description}</p>
        </div>

        <div className="relative pb-14 sm:pb-16 lg:pb-0">
          <div className="relative aspect-[1.1/1] overflow-hidden rounded-2xl shadow-xl sm:aspect-[1.35/1] sm:rounded-3xl lg:aspect-[1.42/1] lg:shadow-2xl">
            <Image src={content.image.src} alt={content.image.alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>

          <div className="absolute bottom-0 left-4 z-20 w-[calc(100%-2rem)] rounded-xl border-l-4 border-secondary bg-white p-5 shadow-xl sm:left-8 sm:max-w-[390px] sm:p-6 lg:-bottom-7 lg:-left-7 lg:p-7 lg:shadow-2xl">
            <p className="font-headline text-base font-extrabold italic leading-snug text-primary sm:text-lg">&quot;{content.quote}&quot;</p>
          </div>
        </div>
      </div>
    </header>
  );
}
