import { z } from 'zod';

const itemSchema = z.object({
  Label: z.string(),
  Value: z.union([z.number(), z.boolean()]),
  XValue: z.number(),
});

export const RegSATASchema = z.object({
  regSata: z.array(itemSchema).refine(
    data => {
      return data.some(item => item.Value === true);
    },
    {
      message: 'At least one item must have Value set to true',
    },
  ),
});

export type RegularSATAValidationType = z.infer<typeof RegSATASchema>;
