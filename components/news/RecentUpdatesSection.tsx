import {Orbit} from "lucide-react";
import UpdateCard from "./UpdateCard";
import type {NewsPageContent} from "@/types/cms";

type Props = {
  updates: NewsPageContent["updates"];
  hasMore: boolean;
  onLoadMore: () => void;
};

export default function RecentUpdatesSection({updates, hasMore, onLoadMore}: Props) {
  return (
    <section className="mt-16 lg:mt-24">
      <div className="mb-10 flex items-center gap-4 lg:mb-12">
        <h3 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">Recent <span className="text-secondary">Updates</span></h3>
        <div className="h-[2px] flex-grow bg-gradient-to-r from-secondary-container to-transparent opacity-30" />
      </div>
      {updates.length === 0 ? (
        <div className="rounded-3xl bg-surface-container-low px-6 py-12 text-center">
          <h4 className="text-xl font-bold text-primary">No updates found</h4>
          <p className="mt-2 text-sm text-on-surface-variant">There are no stories in this category yet.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">{updates.map((item) => <UpdateCard key={item.id} item={item} />)}</div>
          {hasMore && <div className="mt-12 flex justify-center lg:mt-16"><button type="button" onClick={onLoadMore} className="group flex items-center gap-3 rounded-full bg-surface-container-high px-8 py-4 font-bold text-primary shadow-sm transition-all hover:bg-primary hover:text-on-primary sm:px-10">Load More Stories<Orbit className="transition-transform group-hover:rotate-90" /></button></div>}
        </>
      )}
    </section>
  );
}
