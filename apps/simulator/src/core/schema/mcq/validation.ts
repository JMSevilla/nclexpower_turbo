import { requiredString } from '@/core/schema/requiredString';
import { z } from "zod";

export const RowSchema = z.object({
    mcqss: requiredString("This field is required to answer").transform(value => parseInt(value)),
})

export type McqSsValidationType = z.infer<typeof RowSchema>;