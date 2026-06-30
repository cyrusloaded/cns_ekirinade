// import {NextResponse} from "next/server";
// import {prisma} from "@/lib/prisma";

// const key = "student-portal";

// export async function GET() {
//   const setting = await prisma.portalSetting.findUnique({where: {key}});
//   return NextResponse.json(setting ?? {
//     key,
//     title: "Student Portal Coming Soon",
//     description: "The student portal is being prepared and will be available soon.",
//     launchAt: null,
//     isEnabled: true,
//   });
// }

// export async function PUT(request: Request) {
//   const body = (await request.json()) as {title?: string; description?: string; launchAt?: string | null; isEnabled?: boolean};
//   const setting = await prisma.portalSetting.upsert({
//     where: {key},
//     update: {
//       title: body.title || "Student Portal Coming Soon",
//       description: body.description || "The student portal is being prepared and will be available soon.",
//       launchAt: body.launchAt ? new Date(body.launchAt) : null,
//       isEnabled: body.isEnabled ?? true,
//     },
//     create: {
//       key,
//       title: body.title || "Student Portal Coming Soon",
//       description: body.description || "The student portal is being prepared and will be available soon.",
//       launchAt: body.launchAt ? new Date(body.launchAt) : null,
//       isEnabled: body.isEnabled ?? true,
//     },
//   });

//   return NextResponse.json(setting);
// }

import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {revalidatePath} from "next/cache";

const key = "student-portal";

export async function GET() {
  const setting = await prisma.portalSetting.findUnique({where: {key}});
  return NextResponse.json(
    setting ?? {
      key,
      title: "Student Portal Coming Soon",
      description:
        "The student portal is being prepared and will be available soon.",
      launchAt: null,
      isEnabled: true,
    },
  );
}

export async function PUT(request: Request) {
  const body = (await request.json()) as {
    title?: string;
    description?: string;
    launchAt?: string | null;
    isEnabled?: boolean;
  };
  const setting = await prisma.portalSetting.upsert({
    where: {key},
    update: {
      title: body.title || "Student Portal Coming Soon",
      description:
        body.description ||
        "The student portal is being prepared and will be available soon.",
      launchAt: body.launchAt ? new Date(body.launchAt) : null,
      isEnabled: body.isEnabled ?? true,
    },
    create: {
      key,
      title: body.title || "Student Portal Coming Soon",
      description:
        body.description ||
        "The student portal is being prepared and will be available soon.",
      launchAt: body.launchAt ? new Date(body.launchAt) : null,
      isEnabled: body.isEnabled ?? true,
    },
  });

  revalidatePath("/student-portal");

  return NextResponse.json(setting);
}
