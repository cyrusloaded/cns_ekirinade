import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const pages = await prisma.sitePage.findMany({ orderBy: { title: "asc" } });
  return NextResponse.json(pages);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.slug || !body.title) {
    return NextResponse.json(
      { error: "slug and title are required" },
      { status: 400 }
    );
  }

  const page = await prisma.sitePage.create({
    data: {
      slug: body.slug,
      title: body.title,
      seoTitle: body.seoTitle || null,
      seoDescription: body.seoDescription || null,
      content: body.content || {},
    },
  });

  return NextResponse.json(page, { status: 201 });
}
