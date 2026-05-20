import CollectionManager from "@/components/admin/CollectionManager";

export default function AdminFacultyPage() {
  return (
    <CollectionManager
      pageSlug="facstaff"
      collectionPath={["staff"]}
      title="Faculty Manager"
      subtitle="Create, edit, publish, and delete faculty and staff profiles."
      itemLabel="Staff Profile"
      searchPlaceholder="Search faculty..."
      titleKey="name"
      descriptionKey="description"
      imageKey="image"
      primaryTagKey="category"
      secondaryTagKey="role"
      newItem={{id: Date.now(), name: "New Staff Member", role: "", category: "Nursing Faculty", email: "", description: "", image: "", alt: "", featured: false, published: true}}
    />
  );
}
