import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "ssh_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

function getCredentials() {
  return {
    username: process.env.ADMIN_USERNAME ?? "admin",
    password: process.env.ADMIN_PASSWORD ?? "change-me-now",
    secret: process.env.ADMIN_SESSION_SECRET ?? "replace-this-admin-session-secret",
  };
}

function sign(payload: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function validateAdminCredentials(username: string, password: string) {
  const creds = getCredentials();
  return username === creds.username && password === creds.password;
}

export function createAdminSession(username: string) {
  const { secret } = getCredentials();
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${username}.${expiresAt}`;
  const signature = sign(payload, secret);
  return `${payload}.${signature}`;
}

export function verifyAdminSession(sessionValue: string | undefined) {
  if (!sessionValue) return false;

  const [username, expiresRaw, signature] = sessionValue.split(".");
  if (!username || !expiresRaw || !signature) return false;

  const expiresAt = Number(expiresRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Math.floor(Date.now() / 1000)) return false;

  const { secret } = getCredentials();
  const expected = sign(`${username}.${expiresAt}`, secret);
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  return verifyAdminSession(session);
}

export const adminSessionCookieName = SESSION_COOKIE;

