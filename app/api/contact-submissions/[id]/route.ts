import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const submission = await prisma.contactSubmission.findUnique({ where: { id } });

  if (!submission) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }

  return NextResponse.json(submission);
}

export async function DELETE(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await prisma.contactSubmission.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
