import { z } from "zod";

export const RowSchema = z.object({
    hcp: z.array(
        z.string().min(2, { message: "Highlighted text must be atleast minimum of 2 characters" })
    ).min(1, { message: "Must hightlight atleast 1 phrases or text" })
});

export type HCPValidationType = z.infer<typeof RowSchema>