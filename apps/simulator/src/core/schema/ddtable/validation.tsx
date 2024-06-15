import { z } from "zod";

export const DDTableSchema = z.object({
    Neurologic: z.number(),
    Respiratory: z.number(),
    Cardiovascular: z.number()
});

export type DDTableValidationType = z.infer<typeof DDTableSchema>;
