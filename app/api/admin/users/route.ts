import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { getAdminSession } from "@/lib/auth";

// GET /api/admin/users — list all admins (Super Admin only)
export async function GET(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await prisma.adminUser.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
      isActive: true,
      lastLogin: true,
      createdAt: true,
      createdBy: true,
      creator: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ users });
}

// POST /api/admin/users — create a sub-admin (Super Admin only)
export async function POST(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
  };

  const { name, username, email, password } = body;

  if (!name || !username || !email || !password) {
    return NextResponse.json(
      { error: "Name, username, email, and password are all required." },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  // Check uniqueness
  const existing = await prisma.adminUser.findFirst({
    where: { OR: [{ email: email.toLowerCase() }, { username }] },
  });
  if (existing) {
    const field = existing.email === email.toLowerCase() ? "email" : "username";
    return NextResponse.json(
      { error: `An admin with this ${field} already exists.` },
      { status: 409 }
    );
  }

  const newAdmin = await prisma.adminUser.create({
    data: {
      name,
      username,
      email: email.toLowerCase(),
      passwordHash: await hashPassword(password),
      role: "SUB_ADMIN",
      isActive: true,
      createdBy: session.id,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ user: newAdmin }, { status: 201 });
}
