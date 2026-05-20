type FeaturedNewsCardProps = {
  title: string;
  category: string;
  image: string;
  alt: string;
  icon?: string;
  hasAccent?: boolean;
};

export default function FeaturedNewsCard({
  title,
  category,
  image,
  alt,
  icon,
  hasAccent = false,
}: FeaturedNewsCardProps) {
  return (
    <article className="group relative col-span-12 overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm transition-all duration-500 hover:shadow-2xl md:col-span-8">
      {hasAccent && (
        <div className="absolute left-0 top-0 z-10 h-full w-1 bg-secondary" />
      )}

      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
        <img
          src={image}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex items-end justify-between gap-4 p-5 sm:p-6 lg:p-8">
        <div>
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-secondary">
            {category}
          </span>
          <h3 className="text-xl font-bold text-primary sm:text-2xl lg:text-3xl">
            {title}
          </h3>
        </div>

        {icon && (
          <span className="material-symbols-outlined text-4xl text-primary/10 transition-colors duration-300 group-hover:text-secondary">
            {icon}
          </span>
        )}
      </div>
    </article>
  );
}
