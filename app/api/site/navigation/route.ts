import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET() {
  const items = await prisma.siteNavigationItem.findMany({orderBy: {order: "asc"}});
  return NextResponse.json(items);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  if (!Array.isArray(body)) return NextResponse.json({error: "Expected an array"}, {status: 400});

  const normalized = body.map((item: {href: string; label: string; order: number; isVisible?: boolean}) => ({
    href: item.href,
    label: item.label,
    order: item.order,
    isVisible: item.isVisible ?? true,
  }));

  await prisma.$transaction(async (tx) => {
    const hrefs = normalized.map((item) => item.href);

    await Promise.all(
      normalized.map((item) =>
        tx.siteNavigationItem.upsert({
          where: {href: item.href},
          update: {label: item.label, order: item.order, isVisible: item.isVisible},
          create: item,
        })
      )
    );

    await tx.siteNavigationItem.deleteMany({
      where: {
        href: {notIn: hrefs.length ? hrefs : ["__none__"]},
      },
    });
  });

  const items = await prisma.siteNavigationItem.findMany({orderBy: {order: "asc"}});
  return NextResponse.json(items);
}
