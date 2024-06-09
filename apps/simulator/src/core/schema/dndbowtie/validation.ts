import { z } from 'zod'

const ValuesSchema = z.object({
    id: z.number(),
    container: z.string(),
    text: z.string()
})


export const RowSchema = z.object({
    'dndbowtie': z.record(z.string(), z.array(ValuesSchema).min(1, { message: "This field is required" }))
})

export type DNDBowtieValidationType = z.infer<typeof RowSchema>