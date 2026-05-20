import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET() {
  const submissions = await prisma.contactSubmission.findMany({orderBy: {createdAt: "desc"}});
  return NextResponse.json(submissions);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.fullName || !body.email || !body.message) {
    return NextResponse.json({error: "Missing required fields"}, {status: 400});
  }

  const submission = await prisma.contactSubmission.create({
    data: {
      fullName: body.fullName,
      email: body.email,
      phoneNumber: body.phoneNumber || null,
      inquiryType: body.inquiryType || null,
      message: body.message,
    },
  });

  return NextResponse.json(submission, {status: 201});
}
