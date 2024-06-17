import crypto from "crypto";

export function nonce() {
  return crypto.randomBytes(16).toString("base64");
}
