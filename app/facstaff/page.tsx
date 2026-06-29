import FacultyStaffHeader from "@/components/facstaff/FacultyStaffHeader";
import FacultyStaffDirectory from "@/components/facstaff/FacultyStaffDirectory";
import {getPageContent} from "@/lib/cms";
import type {FacultyPageContent} from "@/types/cms";

export default async function FacStaffPage() {
  const page = await getPageContent<FacultyPageContent>("facstaff");

  return (
    <div className="bg-surface font-body text-on-surface">
      <main className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
        <FacultyStaffHeader content={page.content.header} />
        <FacultyStaffDirectory
          categories={page.content.categories}
          staff={page.content.staff}
        />
      </main>
    </div>
  );
}
