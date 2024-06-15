export function parseJSONtoString(value: string) {
  try {
    const parsedValue = JSON.parse(value);
    return parsedValue;
  } catch (e) {
    return null;
  }
}
