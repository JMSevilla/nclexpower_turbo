import { z } from "zod";

export const RowSchema = z.object({
    hcp: z.array(z.string().min(3, { message: "Highlighted text must be atleast minimum of 3 characters" })).min(1, { message: "Must hightlight atleast one phrases or text" })
});

export type HCPValidationType = z.infer<typeof RowSchema>