import {HeartPulse} from "lucide-react";
import type {NewsPageContent} from "@/types/cms";

export default function NewsSidebar({retreatCard, keyDates}: {retreatCard: NewsPageContent["retreatCard"]; keyDates: NewsPageContent["keyDates"]}) {
  return (
    <aside className="flex h-full flex-col gap-8">
      <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[2rem] bg-primary p-6 text-primary sm:min-h-[300px] sm:p-8">
        <div className="relative z-10">
          <h3 className="text-white mb-4 text-2xl font-bold">{retreatCard.title}</h3>
          <p className="text-white/70 mb-6 text-md leading-relaxed">{retreatCard.description}</p>
        </div>
        <div className="relative z-10"><button className="rounded-full bg-teal-500 px-6 py-3 text-xs font-extrabold uppercase tracking-widest text-primary transition-colors hover:bg-teal-400">Register Now</button></div>
        <span className="material-symbols-outlined absolute bottom-3 right-3 text-[180px] text-white/10 sm:text-[200px]"><HeartPulse size={120} /></span>
      </div>
      <div className="rounded-[2rem] bg-surface-container-low p-6 sm:p-8">
        <h4 className="mb-6 border-b border-outline-variant/30 pb-4 text-lg font-bold text-primary">Key Dates</h4>
        <div className="space-y-6">
          {keyDates.map((item) => (
            <div key={`${item.month}-${item.day}-${item.title}`} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border border-outline-variant/10 bg-white shadow-sm">
                <span className="text-xs font-bold text-secondary">{item.month}</span>
                <span className="text-lg font-extrabold leading-none text-primary">{item.day}</span>
              </div>
              <div>
                <h5 className="text-sm font-bold text-primary">{item.title}</h5>
                <p className="text-xs text-on-surface-variant">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
