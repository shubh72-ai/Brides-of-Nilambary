import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "nilambary_admin_session";

async function sha256(value: string) {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function hmac(value: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { hash: "SHA-256", name: "HMAC" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function verifyAdminPassword(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    return { ok: false, reason: "Admin credentials are not configured." };
  }

  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
    return { ok: false, reason: "Invalid admin credentials." };
  }

  const incomingHash = await sha256(password);
  return incomingHash === adminPasswordHash
    ? { ok: true, reason: "" }
    : { ok: false, reason: "Invalid admin credentials." };
}

export async function createAdminToken(email: string) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  const payload = {
    email,
    exp: Date.now() + 1000 * 60 * 60 * 8,
  };
  const body = btoa(JSON.stringify(payload));
  const signature = await hmac(body, secret);
  return `${body}.${signature}`;
}

export async function verifyAdminToken(token?: string) {
  const secret = process.env.JWT_SECRET;

  if (!token || !secret || !token.includes(".")) {
    return null;
  }

  const [body, signature] = token.split(".");
  const expected = await hmac(body, secret);

  if (expected !== signature) {
    return null;
  }

  try {
    const payload = JSON.parse(atob(body)) as { email: string; exp: number };
    if (!payload.email || payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const session = await verifyAdminToken(cookieStore.get(cookieName)?.value);

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function isAdminRequest(request: Request) {
  const rawCookie = request.headers.get("cookie") ?? "";
  const token = rawCookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${cookieName}=`))
    ?.split("=")[1];

  return Boolean(await verifyAdminToken(token));
}

export function adminCookieHeader(token: string) {
  return `${cookieName}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 8}`;
}
