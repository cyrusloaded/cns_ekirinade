import {createHash, randomBytes, scryptSync, timingSafeEqual} from "crypto";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;
  const hashBuffer = Buffer.from(hash, "hex");
  const suppliedHash = scryptSync(password, salt, 64);
  return hashBuffer.length === suppliedHash.length && timingSafeEqual(hashBuffer, suppliedHash);
}

export function createResetToken() {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashResetToken(token);
  return {token, tokenHash};
}

export function hashResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
