import { z } from "zod";

export function requiredString(message = "Required") {
  return z.string({ required_error: message }).min(1, { message });
}
