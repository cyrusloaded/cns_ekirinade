"use client";

type GalleryFiltersProps = {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

export default function GalleryFilters({filters, activeFilter, onFilterChange}: GalleryFiltersProps) {
  return (
    <section className="mx-auto mb-8 max-w-screen-2xl px-4 sm:px-6 lg:px-8 lg:mb-12">
      <div className="flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button key={filter} type="button" onClick={() => onFilterChange(filter)} className={`shrink-0 rounded-full px-5 py-3 text-xs font-extrabold uppercase tracking-widest transition-all sm:px-7 lg:px-8 ${isActive ? "bg-[#320056] text-white shadow-xl shadow-[#320056]/20" : "bg-white text-slate-500 shadow-sm hover:bg-[#320056]/5 hover:text-[#320056]"}`}>
              {filter}
            </button>
          );
        })}
      </div>
    </section>
  );
}
