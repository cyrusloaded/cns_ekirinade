import {cookies} from "next/headers";
import {createHmac, timingSafeEqual} from "crypto";
import {prisma} from "@/lib/prisma";

const SESSION_COOKIE = "admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const RESET_TOKEN_BYTES = 32;

function getSecret() {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "replace-this-secret-in-production";
}

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function signPayload(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export {createResetToken, hashPassword, hashResetToken, verifyPassword} from "@/lib/password";

export function createSessionToken(userId: string, email: string) {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = base64Url(JSON.stringify({userId, email, expiresAt}));
  return `${payload}.${signPayload(payload)}`;
}

export function verifySessionToken(token?: string) {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = signPayload(payload);
  if (expected.length !== signature.length || !timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {userId: string; email: string; expiresAt: number};
    if (!data.userId || !data.email || Date.now() > data.expiresAt) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = verifySessionToken(token);
  if (!session) return null;
  const user = await prisma.adminUser.findUnique({where: {id: session.userId}, select: {id: true, email: true, name: true, role: true}});
  return user;
}

export async function setAdminSessionCookie(userId: string, email: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(userId, email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 0, path: "/"});
}

