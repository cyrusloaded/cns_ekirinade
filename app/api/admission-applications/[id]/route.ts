import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const application = await prisma.admissionApplication.findUnique({ where: { id } });

  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  return NextResponse.json(application);
}

export async function DELETE(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await prisma.admissionApplication.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
