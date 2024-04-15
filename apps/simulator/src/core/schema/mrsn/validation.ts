import { z } from "zod";

export const RowSchema = z.object({
  mrsn: z
    .array(
      z.object({
        label: z.string(),
        value: z.any(),
        xvalue: z.number(),
      })
    )
    .min(4, { message: "mrsn array must contain a minimum of 4 elements" }),
});

export type MrsnValidationType = z.infer<typeof RowSchema>;
