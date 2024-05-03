import { z } from "zod";

export const mcqGSchema = z.object({
    mcqGroup: z.array(
        z.object({
            rowTitle: z.string().optional(),
            chOne: z.boolean().optional(),
            chTwo: z.boolean().optional(),
            chThree: z.boolean().optional()
        }).refine(row => row.chOne || row.chTwo || row.chThree)
    )
})

export type MCQGValidationType = z.infer<typeof mcqGSchema>;