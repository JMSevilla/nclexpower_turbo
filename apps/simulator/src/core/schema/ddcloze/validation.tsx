import { z } from "zod";

export const DDClozeSchema = z.object({
    firstSelectField: z.number(),
    secondSelectField: z.number(),
    thirdSelectField: z.number()
});

export type DDClozeValidationType = z.infer<typeof DDClozeSchema>;
