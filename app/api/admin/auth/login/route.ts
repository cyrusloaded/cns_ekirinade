import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {setAdminSessionCookie} from "@/lib/auth";
import {verifyPassword} from "@/lib/password";

export async function POST(request: Request) {
  const {email, password} = (await request.json()) as {email?: string; password?: string};

  if (!email || !password) {
    return NextResponse.json({error: "Email and password are required."}, {status: 400});
  }

  const user = await prisma.adminUser.findUnique({where: {email: email.toLowerCase().trim()}});
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({error: "Invalid admin email or password."}, {status: 401});
  }

  await setAdminSessionCookie(user.id, user.email);
  return NextResponse.json({success: true, user: {id: user.id, email: user.email, name: user.name, role: user.role}});
}
