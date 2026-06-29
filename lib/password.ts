// lib/password.ts

import {createHash, randomBytes, scrypt, timingSafeEqual} from "crypto";

import {promisify} from "util";

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");

  const hash = (await scryptAsync(password, salt, 64)) as Buffer;

  return `${salt}:${hash.toString("hex")}`;
}

export async function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");

  if (!salt || !hash) return false;

  const hashBuffer = Buffer.from(hash, "hex");

  const suppliedHash = (await scryptAsync(password, salt, 64)) as Buffer;

  return (
    hashBuffer.length === suppliedHash.length &&
    timingSafeEqual(hashBuffer, suppliedHash)
  );
}

export function createResetToken() {
  const token = randomBytes(32).toString("base64url");

  return {
    token,
    tokenHash: hashResetToken(token),
  };
}

export function hashResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
