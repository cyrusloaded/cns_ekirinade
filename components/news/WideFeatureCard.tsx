type WideFeatureCardProps = {
  category: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export default function WideFeatureCard({
  category,
  title,
  description,
  image,
  alt,
}: WideFeatureCardProps) {
  return (
    <article className="group relative col-span-12 overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm transition-all duration-500 hover:shadow-2xl">
      <div className="flex flex-col md:flex-row">
        <div className="relative min-h-[240px] w-full overflow-hidden md:min-h-[400px] md:w-2/3">
          <img
            src={image}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="relative flex w-full flex-col justify-center bg-surface-container-low p-6 sm:p-8 lg:p-10 md:w-1/3">
          <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-secondary">
            {category}
          </span>
          <h3 className="mb-4 text-2xl font-bold text-primary sm:text-3xl">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-on-surface-variant sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
