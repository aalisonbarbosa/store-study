import z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório."),
    email: z.string().email("Email inválido."),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z.string(),
    role: z.enum(["CUSTOMER", "SELLER"], "Tipo da conta é obrigatório."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email("Email inválido."),
  password: z.string().min(1, "A senha é obrigatória."),
});

export type LoginSchema = z.infer<typeof loginSchema>;
