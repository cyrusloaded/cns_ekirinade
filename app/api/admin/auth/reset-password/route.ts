import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {hashPassword, hashResetToken} from "@/lib/password";

export async function POST(request: Request) {
  const {token, password} = (await request.json()) as {token?: string; password?: string};

  if (!token || !password) {
    return NextResponse.json({error: "Reset token and new password are required."}, {status: 400});
  }

  if (password.length < 6) {
    return NextResponse.json({error: "Password must be at least 6 characters."}, {status: 400});
  }

  const resetRecord = await prisma.passwordResetToken.findUnique({where: {tokenHash: hashResetToken(token)}, include: {user: true}});
  if (!resetRecord || resetRecord.usedAt || resetRecord.expiresAt < new Date()) {
    return NextResponse.json({error: "This reset link is invalid or expired."}, {status: 400});
  }

  await prisma.$transaction([
    prisma.adminUser.update({where: {id: resetRecord.userId}, data: {passwordHash: hashPassword(password)}}),
    prisma.passwordResetToken.update({where: {id: resetRecord.id}, data: {usedAt: new Date()}}),
  ]);

  return NextResponse.json({success: true, message: "Password reset successfully. You can now log in."});
}
