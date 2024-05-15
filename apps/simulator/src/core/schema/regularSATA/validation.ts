import { z } from "zod";

const itemSchema = z.object({
  label: z.string(),
  value: z.boolean(),
  xvalue: z.number()
});

export const RegSATASchema = z.object({
  regSata: z.array(itemSchema)
  .refine(data => data.filter(item => item.value).length === 3, {
    path: ['regSata'],
    message: "Select three items",
  })
});

export type RegularSATAValidationType = z.infer<typeof RegSATASchema>;
