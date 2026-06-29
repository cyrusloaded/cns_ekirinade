"use client";

type GalleryFiltersProps = {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

export default function GalleryFilters({
  filters,
  activeFilter,
  onFilterChange,
}: GalleryFiltersProps) {
  return (
    <section className="sticky sm:top-20.5 z-20 bg-gray-200 rounded-lg mx-auto mb-8 max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8 lg:mb-10">
      <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 sm:overflow-visible overflow-x-auto scrollbar-hide">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => onFilterChange(filter)}
              className={`rounded-full px-2 py-2 text-[10px] font-extrabold uppercase tracking-widest transition-all w-full sm:w-auto sm:px-7 sm:py-3 sm:text-xs cursor-pointer ${
                isActive
                  ? "bg-[#320056] text-white"
                  : "text-slate-500 hover:text-[#320056]"
              }`}>
              {filter}
            </button>
          );
        })}
      </div>
    </section>
  );
}
