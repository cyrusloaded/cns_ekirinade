import CollectionManager from "@/components/admin/CollectionManager";

export default function AdminProgrammesPage() {
  return (
    <CollectionManager
      pageSlug="programmes"
      collectionPath={["programmes"]}
      title="Programmes Manager"
      subtitle="Create, edit, update, publish, and delete academic programme records."
      itemLabel="Programme"
      searchPlaceholder="Search programmes..."
      titleKey="title"
      descriptionKey="description"
      imageKey="image"
      primaryTagKey="duration"
      secondaryTagKey="noteTitle"
      newItem={{title: "New Programme", slug: "new-programme", duration: "", description: "", body: [""], noteTitle: "", note: "", image: "", alt: "", published: true}}
    />
  );
}
