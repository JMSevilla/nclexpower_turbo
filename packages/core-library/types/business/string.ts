export function parseJSONtoString(value: string) {
  try {
    const parsedValue = JSON.parse(value);
    return parsedValue;
  } catch (e) {
    return null;
  }
}

export function isJSON(value: string) {
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
}
