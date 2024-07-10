import crypto from "crypto";
import { parseBase64toString } from "../../types";
import { config } from "../../config";

export function generateHmacSignature(
  reqBody: string,
  secretKey: string
): string {
  const key = parseBase64toString(secretKey);
  const hmac = crypto.createHmac("sha256", key);
  hmac.update(reqBody);
  return hmac.digest("base64");
}
