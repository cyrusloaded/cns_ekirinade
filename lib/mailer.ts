type ResetMailParams = {
  to: string;
  resetLink: string;
};

export async function sendPasswordResetEmail({to, resetLink}: ResetMailParams) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || "CNS Ekinrin Admin <no-reply@ekinrin-ng.com>";

  if (!host || !user || !pass) {
    console.log("Password reset link for local development:", resetLink);
    return {sent: false, previewUrl: resetLink};
  }

  const nodemailerModule = await import("nodemailer");
  const nodemailer = nodemailerModule.default ?? nodemailerModule;
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {user, pass},
  });

  await transporter.sendMail({
    from,
    to,
    subject: "Reset your CNS Ekinrin admin password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #191c1e;">
        <h2 style="color: #320056;">Reset your admin password</h2>
        <p>Click the button below to reset your password. This link expires in 1 hour.</p>
        <p><a href="${resetLink}" style="background:#320056;color:#fff;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:700;">Reset Password</a></p>
        <p>If the button does not work, copy and paste this link into your browser:</p>
        <p style="word-break:break-all;">${resetLink}</p>
      </div>
    `,
  });

  return {sent: true};
}
