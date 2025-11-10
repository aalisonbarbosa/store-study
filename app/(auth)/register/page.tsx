"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const userSchema = z
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

type UserSchema = z.infer<typeof userSchema>;

export default function registerPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const router = useRouter();

  function onSubmit(formData: UserSchema) {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/register`, formData)
      .then(() => router.push("/login"))
      .catch((err: AxiosError) => {
        if (err.response?.status === 409) {
          setError("email", { message: "Email já está em uso." });
        } else {
          setError("root", { message: "Erro interno no servidor." });
        }
      });
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-screen px-16 py-8 space-y-8 bg-stone-100">
      <div className="text-center space-y-4">
        <h1 className="font-bold text-3xl text-blue-500">StudyCart</h1>
        <p className="font-bold text-2xl">Acesse sua conta StudyCart</p>
        <p className="text-stone-600">Entre para continuar suas compras</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white h-min w-sm p-8 rounded-xl space-y-8 border-2 border-stone-200"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nome Completo</label>
          <input
            type="text"
            placeholder="Digite seu nome..."
            id="name"
            className="w-full border-2 border-stone-200 p-2 rounded-md"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Digite seu email..."
            id="email"
            className="w-full border-2 border-stone-200 p-2 rounded-md"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha..."
            id="password"
            className="w-full border-2 border-stone-200 p-2 rounded-md"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            placeholder="Confirme sua senha..."
            id="confirmPassword"
            className="w-full border-2 border-stone-200 p-2 rounded-md"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="role">Tipo de Conta</label>
          <select
            id="role"
            className="w-full border-2 border-stone-200 p-2 rounded-md cursor-pointer"
            {...register("role")}
          >
            <option value="">Selecione o tipo de conta</option>
            <option value="CUSTOMER">Cliente</option>
            <option value="SELLER">Vendedor</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
          {errors.root && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}
        </div>
        <button
          className="w-full bg-blue-500 text-white rounded-md py-2 cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Carregando..." : "Cadastrar-se"}
        </button>
        <p className="text-center text-sm text-stone-600">
          Já tem uma conta?
          <Link href="/login" className="text-blue-500">
            {" "}
            Faça login
          </Link>
        </p>
      </form>
      <p className="text-sm text-stone-600">&copy; StudyCart - 2025</p>
    </main>
  );
}
