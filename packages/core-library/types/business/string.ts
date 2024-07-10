export function parseJSONtoString(value: string) {
  try {
    const parsedValue = JSON.parse(value);
    return parsedValue;
  } catch (e) {
    return null;
  }
}

export function parseBase64toString(base64String: string): string {
  return Buffer.from(base64String, "base64").toString("utf-8");
}
