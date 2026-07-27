import crypto from "crypto";

const TOKEN_SECRET = process.env.DOWNLOAD_TOKEN_SECRET || "propbench-pdf-download-secret-key-2025";
const DEFAULT_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes

export interface DownloadTokenPayload {
  purchaseId: string;
  email: string;
  expiresAt: number; // timestamp ms
}

/**
 * Generates an HMAC-SHA256 signed download token valid for 15 minutes.
 */
export function generateDownloadToken(purchaseId: string, email: string): string {
  const expiresAt = Date.now() + DEFAULT_EXPIRY_MS;
  const payloadStr = JSON.stringify({ purchaseId, email, expiresAt });
  const base64Payload = Buffer.from(payloadStr).toString("base64url");

  const signature = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(base64Payload)
    .digest("base64url");

  return `${base64Payload}.${signature}`;
}

/**
 * Verifies HMAC signature and 15-minute expiration of a download token.
 */
export function verifyDownloadToken(token: string): DownloadTokenPayload | null {
  try {
    if (!token || !token.includes(".")) return null;
    const [base64Payload, signature] = token.split(".");

    const expectedSignature = crypto
      .createHmac("sha256", TOKEN_SECRET)
      .update(base64Payload)
      .digest("base64url");

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payloadStr = Buffer.from(base64Payload, "base64url").toString("utf-8");
    const payload: DownloadTokenPayload = JSON.parse(payloadStr);

    if (Date.now() > payload.expiresAt) {
      return null; // Expired after 15 minutes
    }

    return payload;
  } catch {
    return null;
  }
}
