import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET() {
  const applications = await prisma.admissionApplication.findMany({orderBy: {createdAt: "desc"}});
  return NextResponse.json(applications);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.fullName || !body.email) {
    return NextResponse.json({error: "Missing required fields"}, {status: 400});
  }

  const application = await prisma.admissionApplication.create({
    data: {
      fullName: body.fullName,
      email: body.email,
      phoneNumber: body.phoneNumber || null,
      programmeOfInterest: body.programmeOfInterest || null,
      previousQualifications: body.previousQualifications || null,
      statement: body.statement || null,
    },
  });

  return NextResponse.json(application, {status: 201});
}
