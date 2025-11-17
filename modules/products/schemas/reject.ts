import z from "zod";

export const rejectProductSchema = z.object({
  reason: z.string().min(1, "O motivo é obrigatório."),
});

export type RejectProductSchema = z.infer<typeof rejectProductSchema>;
