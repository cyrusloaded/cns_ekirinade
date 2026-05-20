import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {createResetToken} from "@/lib/password";
import {sendPasswordResetEmail} from "@/lib/mailer";

function getBaseUrl(request: Request) {
  return process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
}

export async function POST(request: Request) {
  const {email} = (await request.json()) as {email?: string};

  if (!email) {
    return NextResponse.json({error: "Email is required."}, {status: 400});
  }

  const user = await prisma.adminUser.findUnique({where: {email: email.toLowerCase().trim()}});

  // Always return a neutral success message so attackers cannot confirm admin emails.
  if (!user) {
    return NextResponse.json({success: true, message: "If the email exists, a reset link has been sent."});
  }

  const {token, tokenHash} = createResetToken();
  await prisma.passwordResetToken.create({
    data: {
      tokenHash,
      userId: user.id,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  });

  const resetLink = `${getBaseUrl(request)}/admin/reset-password?token=${token}`;
  const mailResult = await sendPasswordResetEmail({to: user.email, resetLink});

  return NextResponse.json({
    success: true,
    message: "If the email exists, a reset link has been sent.",
    ...(process.env.NODE_ENV !== "production" && !mailResult.sent ? {devResetLink: mailResult.previewUrl} : {}),
  });
}
