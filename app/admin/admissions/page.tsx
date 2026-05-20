import CollectionManager from "@/components/admin/CollectionManager";
import SubmissionsManager from "@/components/admin/SubmissionsManager";

export default function AdminAdmissionsPage() {
  return (
    <div className="space-y-10">
      <CollectionManager
        pageSlug="admission"
        collectionPath={["journey", "steps"]}
        title="Admissions Content Manager"
        subtitle="Create, edit, update, publish, and delete admission journey steps. Admission applications are listed below."
        itemLabel="Admission Step"
        searchPlaceholder="Search admission steps..."
        titleKey="title"
        descriptionKey="description"
        imageKey="image"
        primaryTagKey="number"
        secondaryTagKey="icon"
        newItem={{number: "01", icon: "FileText", title: "New Admission Step", description: "", published: true}}
      />
      <div className="px-4 pb-10 sm:px-6 lg:px-10">
        <SubmissionsManager />
      </div>
    </div>
  );
}
