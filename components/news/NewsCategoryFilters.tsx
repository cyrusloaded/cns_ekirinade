"use client";

type Props = {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
};

export default function NewsCategoryFilters({categories, activeCategory, onChange}: Props) {
  return (
    <section className="mb-10 lg:mb-12">
      <div className="flex flex-wrap gap-3 sm:gap-4">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button key={category} type="button" onClick={() => onChange(category)} aria-pressed={isActive} className={`rounded-full px-5 py-2 text-sm font-semibold transition-all sm:px-6 ${isActive ? "bg-primary text-white/90 shadow-md" : "bg-gray-200 text-slate-600 hover:bg-primary-fixed-dim"}`}>
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
}
