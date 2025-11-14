import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "O nome do produto é obrigatório."),
  description: z.string().min(1, "A descrição é obrigatória."),
  price: z.number().int("O preço deve ser um número inteiro."),
  stock: z.number().int().min(1, "O estoque deve ser pelo menos 1."),
  categoryId: z.string().min(1, "A categoria é obrigatória."),
  image: z
    .any()
    .refine(
      (files) =>
        files?.length === 1 &&
        ["image/png", "image/jpeg", "image/webp"].includes(files[0]?.type),
      "Formato de imagem inválido ou ausente."
    ),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export const rejectProductSchema = z.object({
  reason: z.string().min(1, "O motivo é obrigatório."),
});

export type RejectProductSchema = z.infer<typeof rejectProductSchema>;
