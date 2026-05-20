import CollectionManager from "@/components/admin/CollectionManager";

export default function AdminGalleryPage() {
  return (
    <CollectionManager
      pageSlug="gallery"
      collectionPath={["items"]}
      title="Gallery Manager"
      subtitle="Create, edit, update, publish, and delete gallery images from the website."
      itemLabel="Gallery Item"
      searchPlaceholder="Search gallery..."
      titleKey="title"
      descriptionKey="category"
      imageKey="image"
      primaryTagKey="category"
      secondaryTagKey="icon"
      newItem={{id: Date.now(), title: "New Gallery Image", category: "Campus Life", image: "", alt: "", icon: "Image", className: "", imageClassName: "aspect-[4/3]", featured: false, hasAccent: false, published: true}}
    />
  );
}
