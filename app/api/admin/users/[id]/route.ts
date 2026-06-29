import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { getAdminSession } from "@/lib/auth";

// PATCH /api/admin/users/[id] — update a sub-admin
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "SUPER_ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const target = await prisma.adminUser.findUnique({ where: { id: params.id } });
  if (!target) return NextResponse.json({ error: "Admin not found." }, { status: 404 });

  // Cannot edit another Super Admin
  if (target.role === "SUPER_ADMIN") {
    return NextResponse.json({ error: "Cannot modify a Super Admin account." }, { status: 403 });
  }

  const body = (await request.json()) as {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    isActive?: boolean;
  };

  const updateData: Record<string, unknown> = {};
  if (body.name) updateData.name = body.name;
  if (body.username) updateData.username = body.username;
  if (body.email) updateData.email = body.email.toLowerCase();
  if (typeof body.isActive === "boolean") updateData.isActive = body.isActive;
  if (body.password) {
    if (body.password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }
    updateData.passwordHash = await hashPassword(body.password);
  }

  const updated = await prisma.adminUser.update({
    where: { id: params.id },
    data: updateData,
    select: { id: true, name: true, username: true, email: true, role: true, isActive: true },
  });

  return NextResponse.json({ user: updated });
}

// DELETE /api/admin/users/[id] — remove a sub-admin
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "SUPER_ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const target = await prisma.adminUser.findUnique({ where: { id: params.id } });
  if (!target) return NextResponse.json({ error: "Admin not found." }, { status: 404 });
  if (target.role === "SUPER_ADMIN") {
    return NextResponse.json({ error: "Cannot delete a Super Admin account." }, { status: 403 });
  }
  if (target.id === session.id) {
    return NextResponse.json({ error: "Cannot delete your own account." }, { status: 400 });
  }

  await prisma.adminUser.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
