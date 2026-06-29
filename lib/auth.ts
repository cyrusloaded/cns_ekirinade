// lib/auth.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

const JWT_SECRET = process.env.JWT_SECRET ?? "change_this_secret_at_least_32_chars";
const COOKIE_NAME = "admin_session";

interface SessionPayload {
  id: string;
  email: string;
  role: string;
}

// ── Set session cookie (called after successful login) ──
export async function setAdminSessionCookie(userId: string, email: string, role = "ADMIN") {
  const token = jwt.sign({ id: userId, email, role }, JWT_SECRET, {
    expiresIn: "7d",
  });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

// ── Clear session cookie (logout) ──
export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// ── Read session from request cookies (for API routes) ──
export async function getAdminSession(
  request: NextRequest
): Promise<SessionPayload | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET) as SessionPayload;
    return payload;
  } catch {
    return null;
  }
}
