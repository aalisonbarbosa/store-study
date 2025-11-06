import { EyeIcon } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <main className="flex flex-col justify-center items-center h-screen px-16 py-8 space-y-8 bg-stone-100">
            <div className="text-center space-y-4">
                <h1 className="font-bold text-3xl text-blue-500">StudyCart</h1>
                <p className="font-bold text-2xl">Acesse sua conta StudyCart</p>
                <p className="text-stone-600">Entre para continuar suas compras</p>
            </div>

            <div className="bg-white h-min w-sm p-8 rounded-xl space-y-8 border-2 border-stone-200">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Digite seu email..." id="email" className="w-full border-2 border-stone-200 p-2 rounded-md" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Senha</label>
                    <div className="relative">
                        <input type="password" placeholder="Digite sua senha..." id="password" className="w-full border-2 border-stone-200 p-2 rounded-md" />
                        <button className="absolute right-2 top-2 cursor-pointer">
                            <EyeIcon className="text-stone-500" />
                        </button>
                    </div>
                </div>
                <div className="space-y-2">
                    <button className="w-full px-8 py-2 bg-blue-500 text-white rounded-md cursor-pointer">Entrar</button>
                    <p className="text-center text-stone-600">ou</p>
                    <button className="w-full px-8 py-2 border-2 border-stone-200 rounded-md cursor-pointer"><Link href="/register">Criar nova conta</Link></button>
                </div>
            </div>
            <p className="text-sm text-stone-600">&copy; StudyCart - 2025</p>
        </main>
    )
}