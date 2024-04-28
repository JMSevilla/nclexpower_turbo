import { z } from "zod";

export const RowSchema = z.object({
    wordChoice1: z.array(
        z.object({
            id: z.number(),
            text: z.string()
        })
    ).min(1),
    wordChoice2: z.array(
        z.object({
            id: z.number(),
            text: z.string()
        })
    ).min(1),

})


export type DNDValidationType = z.infer<typeof RowSchema>