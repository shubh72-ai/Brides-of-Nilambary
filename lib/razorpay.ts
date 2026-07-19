import { brand } from "./constants";

export type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
};

function getRazorpayCredentials() {
  return {
    keyId: process.env.RAZORPAY_KEY_ID,
    keySecret: process.env.RAZORPAY_KEY_SECRET,
    publicKey: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
  };
}

export function hasRazorpayCredentials() {
  const credentials = getRazorpayCredentials();
  return Boolean(credentials.keyId && credentials.keySecret && credentials.publicKey);
}

export function depositAmountPaise() {
  return brand.depositAmount * 100;
}

export async function createRazorpayOrder(receipt: string, amount = depositAmountPaise()) {
  const credentials = getRazorpayCredentials();

  if (!credentials.keyId || !credentials.keySecret || !credentials.publicKey) {
    return {
      configured: false as const,
      keyId: credentials.publicKey ?? "",
      order: null,
    };
  }

  const auth = btoa(`${credentials.keyId}:${credentials.keySecret}`);
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    body: JSON.stringify({
      amount,
      currency: brand.currency,
      notes: { brand: brand.name },
      receipt,
    }),
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Razorpay order failed: ${detail}`);
  }

  return {
    configured: true as const,
    keyId: credentials.publicKey,
    order: (await response.json()) as RazorpayOrder,
  };
}

async function hmacSha256Hex(message: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { hash: "SHA-256", name: "HMAC" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!secret) {
    return false;
  }

  const expected = await hmacSha256Hex(`${orderId}|${paymentId}`, secret);
  return expected === signature;
}
