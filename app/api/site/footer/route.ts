import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET() {
  const footer = await prisma.siteFooter.findUnique({where: {key: "default"}});
  return NextResponse.json(footer);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const footer = await prisma.siteFooter.upsert({
    where: {key: "default"},
    update: {content: body},
    create: {key: "default", content: body},
  });
  return NextResponse.json(footer);
}
