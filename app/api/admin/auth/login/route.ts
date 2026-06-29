import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {setAdminSessionCookie} from "@/lib/auth";
import {verifyPassword} from "@/lib/password";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      identifier?: string;
      email?: string;
      password?: string;
    };

    // Support both old `email` field and new `identifier` (username or email)
    const identifier = (body.identifier ?? body.email ?? "")
      .toLowerCase()
      .trim();
    const password = body.password ?? "";

    if (!identifier || !password) {
      return NextResponse.json(
        {error: "Username/email and password are required."},
        {status: 400},
      );
    }

    // Look up by email OR username
    const user = await prisma.adminUser.findFirst({
      where: {
        OR: [{email: identifier}, {username: identifier}],
      },
    });

    if (!user) {
      return NextResponse.json(
        {error: "Invalid credentials. Please try again."},
        {status: 401},
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        {error: "This account has been deactivated. Contact your Super Admin."},
        {status: 403},
      );
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        {error: "Invalid credentials. Please try again."},
        {status: 401},
      );
    }

    // Update lastLogin
    await prisma.adminUser.update({
      where: {id: user.id},
      data: {lastLogin: new Date()},
    });

    await setAdminSessionCookie(user.id, user.email, user.role);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      {error: "An unexpected error occurred. Please try again."},
      {status: 500},
    );
  }
}
