type NewsCardProps = {
  title: string;
  category: string;
  image: string;
  alt: string;
  imageClassName?: string;
  className?: string;
  hasAccent?: boolean;
  icon?: string;
};

export default function NewsCard({
  title,
  category,
  image,
  alt,
  imageClassName = "aspect-square",
  className = "",
  hasAccent = false,
  icon,
}: NewsCardProps) {
  return (
    <article
      className={`group relative col-span-12 overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm transition-all duration-500 hover:shadow-2xl sm:col-span-6 lg:col-span-4 ${className}`}
    >
      {hasAccent && (
        <div className="absolute left-0 top-0 z-10 h-full w-1 bg-secondary" />
      )}

      <div className={`relative overflow-hidden ${imageClassName}`}>
        <img
          src={image}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="relative min-h-[120px] p-5 sm:p-6">
        <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-secondary">
          {category}
        </span>
        <h3 className="pr-10 text-lg font-bold text-primary sm:text-xl">
          {title}
        </h3>

        {icon && (
          <span className="material-symbols-outlined absolute bottom-4 right-4 text-5xl text-primary/5">
            {icon}
          </span>
        )}
      </div>
    </article>
  );
}