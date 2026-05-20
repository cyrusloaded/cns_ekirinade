import CollectionManager from "@/components/admin/CollectionManager";

export default function AdminNewsPage() {
  return (
    <CollectionManager
      pageSlug="news"
      collectionPath={["updates"]}
      title="News & Events Manager"
      subtitle="Create, update, publish, and delete news posts, articles, blog entries, and events."
      itemLabel="Article"
      searchPlaceholder="Search articles..."
      titleKey="title"
      descriptionKey="excerpt"
      imageKey="image"
      primaryTagKey="category"
      secondaryTagKey="date"
      newItem={{id: Date.now(), category: "News", date: "", title: "New Article", slug: "new-article", excerpt: "", body: [""], image: "", alt: "", accent: "", published: true}}
    />
  );
}
