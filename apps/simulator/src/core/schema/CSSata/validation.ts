import { z } from "zod";

const itemSchema = z.object({
  label: z.string(),
  value: z.boolean(),
  xvalue: z.number()
});

export const CsSATASchema = z.object({
  csSata: z.array(itemSchema)
  .refine((data) => data.filter(item => item.value).length > 0, ({
    message: "must have atleast 1 answer",
  }))
});

export type CaseStudySATAValidationType = z.infer<typeof CsSATASchema>;