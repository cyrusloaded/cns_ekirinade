import type {GalleryPageContent} from "@/types/cms";
import {galleryIconMap} from "./icon-map";
import GalleryCard from "./GalleryCard";
import FeaturedLibraryCard from "./FeaturedLibraryCard";

export default function GalleryGrid({
  activeFilter,
  items,
  featuredLibrary,
}: {
  activeFilter: string;
  items: GalleryPageContent["items"];
  featuredLibrary: GalleryPageContent["featuredLibrary"];
}) {
  const filteredItems =
    activeFilter === "All Moments"
      ? items
      : items.filter((item) => item.category === activeFilter);

  return (
    <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-12 gap-5 sm:gap-6 lg:gap-8">
        {filteredItems.map((item) => {
          const Icon = galleryIconMap[item.icon] || galleryIconMap.BookOpen;
          return (
            <GalleryCard
              key={item.id}
              title={item.title}
              category={item.category}
              image={item.image}
              alt={item.alt}
              icon={Icon}
              className={item.className}
              imageClassName={item.imageClassName}
              featured={item.featured}
              hasAccent={item.hasAccent}
            />
          );
        })}
        {(activeFilter === "All Moments" ||
          activeFilter === featuredLibrary.category) && (
          <FeaturedLibraryCard content={featuredLibrary} />
        )}
      </div>
    </section>
  );
}
