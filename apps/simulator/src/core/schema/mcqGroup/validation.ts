import { z } from "zod";

export const mcqGSchema = z.object({
    mcqGroup: z.array(
        z.object({
            rowTitle: z.string().optional(),
            chOne: z.boolean().optional(),
            chTwo: z.boolean().optional(),
            chThree: z.boolean().optional(),
            chFour: z.boolean().optional(),
            chFive: z.boolean().optional(),
            chSix: z.boolean().optional(),
            chSeven: z.boolean().optional(),
            chEight: z.boolean().optional()
        }).refine(row => row.chOne
            || row.chTwo || row.chThree
            || row.chFour || row.chFive
            || row.chSix || row.chSeven
            || row.chEight)
    )
})

export type MCQGValidationType = z.infer<typeof mcqGSchema>;