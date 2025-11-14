"use client";

import { loginSchema, LoginSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  async function onSubmit(credentials: LoginSchema) {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
      });

      if (!res?.ok) {
        setError("root", { message: "Email ou senha inválidos." });
        return;
      }

      router.push("/");
    } catch (err) {
      console.error(err);
      setError("root", {
        message: "Erro inesperado no servidor.",
      });
    }
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen px-16 py-8 space-y-8 bg-stone-100">
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Digite seu email..."
            id="email"
            {...register("email")}
            className="w-full border-2 border-stone-200 p-2 rounded-md"
          />
          {errors.email && (
            <p className="text-sm text-red-700">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Senha</label>
          <div className="relative">
            <input
              type="password"
              placeholder="Digite sua senha..."
              id="password"
              {...register("password")}
              className="w-full border-2 border-stone-200 p-2 rounded-md"
            />
            <button className="absolute right-2 top-2 cursor-pointer">
              <EyeIcon className="text-stone-500" />
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-700">{errors.password.message}</p>
          )}
          {errors.root && (
            <p className="text-sm text-red-700">{errors.root.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <button
            className="w-full px-8 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Carregando..." : "Entrar"}
          </button>
          <p className="text-center text-stone-600">ou</p>
          <button
            className="w-full px-8 py-2 border-2 border-stone-200 rounded-md cursor-pointer"
            type="button"
          >
            <Link href="/register">Criar nova conta</Link>
          </button>
        </div>
      </form>
      <p className="text-sm text-stone-600">&copy; StudyCart - 2025</p>
    </main>
  );
}
