import { z } from 'zod';

const itemSchema = z.object({
  Label: z.string(),
  Value: z.union([z.number(), z.boolean()]),
  XValue: z.number(),
});

export const RegSATASchema = z.object({
  regSata: z.array(itemSchema).refine(
    data => {
      return data.filter(item => item.Value === true).length >= 2;
    },
    {
      message: 'At least 2 items must have Value set to true',
    },
  ),
});

export type RegularSATAValidationType = z.infer<typeof RegSATASchema>;
