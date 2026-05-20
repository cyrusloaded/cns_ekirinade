import StudentPortalComingSoon from "@/components/StudentPortalComingSoon";
import {prisma} from "@/lib/prisma";

export default async function StudentPortalPage() {
  const setting = await prisma.portalSetting.findUnique({where: {key: "student-portal"}}).catch(() => null);

  return (
    <StudentPortalComingSoon
      title={setting?.title || "Student Portal Coming Soon"}
      description={setting?.description || "The student portal is being prepared and will be available soon."}
      launchAt={setting?.launchAt?.toISOString() || null}
    />
  );
}
