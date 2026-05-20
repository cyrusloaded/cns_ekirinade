import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(_: NextRequest, context: {params: Promise<{slug: string}>}) {
  const {slug} = await context.params;
  const page = await prisma.sitePage.findUnique({where: {slug}});
  if (!page) return NextResponse.json({error: "Page not found"}, {status: 404});
  return NextResponse.json(page);
}

export async function PUT(request: NextRequest, context: {params: Promise<{slug: string}>}) {
  const {slug} = await context.params;
  const body = await request.json();
  const page = await prisma.sitePage.upsert({
    where: {slug},
    update: {
      title: body.title,
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
      content: body.content,
    },
    create: {
      slug,
      title: body.title,
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
      content: body.content,
    },
  });
  return NextResponse.json(page);
}

export async function DELETE(_: NextRequest, context: {params: Promise<{slug: string}>}) {
  const {slug} = await context.params;
  await prisma.sitePage.delete({where: {slug}});
  return NextResponse.json({success: true});
}
