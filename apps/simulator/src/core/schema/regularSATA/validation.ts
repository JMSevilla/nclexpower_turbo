import { z } from "zod";

const itemSchema = z.object({
  label: z.string(),
  value: z.boolean(),
  xvalue: z.number()
});

export const RegSATASchema = z.object({
  regSata: z.array(itemSchema)
  .refine((data) => data.filter(item => item.value).length > 0, ({
    message: "must have atleast 1 answer",
  }))
});

export type RegularSATAValidationType = z.infer<typeof RegSATASchema>;