import Link from "next/link";

export default function registerPage() {
    return (
        <main className="flex flex-col justify-center items-center min-h-screen px-16 py-8 space-y-8 bg-stone-100">
            <div className="text-center space-y-4">
                <h1 className="font-bold text-3xl text-blue-500">StudyCart</h1>
                <p className="font-bold text-2xl">Acesse sua conta StudyCart</p>
                <p className="text-stone-600">Entre para continuar suas compras</p>
            </div>

            <div className="bg-white h-min w-sm p-8 rounded-xl space-y-8 border-2 border-stone-200">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Nome Completo</label>
                    <input type="text" placeholder="Digite seu nome..." id="name" className="w-full border-2 border-stone-200 p-2 rounded-md"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Digite seu email..." id="email" className="w-full border-2 border-stone-200 p-2 rounded-md"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Senha</label>
                    <input type="password" placeholder="Digite sua senha..." id="password" className="w-full border-2 border-stone-200 p-2 rounded-md"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                    <input type="password" placeholder="Confirme sua senha..." id="confirmPassword" className="w-full border-2 border-stone-200 p-2 rounded-md"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="type">Tipo de Conta</label>
                    <select name="type" id="type" className="w-full border-2 border-stone-200 p-2 rounded-md cursor-pointer">
                        <option value="">Selecione o tipo de conta</option>
                        <option value="CUSTOMER">Cliente</option>
                        <option value="SELLER">Vendedor</option>
                    </select>
                </div>
                <button className="w-full bg-blue-500 text-white rounded-md py-2 cursor-pointer">Cadastrar-se</button>
                <p className="text-center text-sm text-stone-600">Já tem uma conta?<Link href="/login" className="text-blue-500"> Faça login</Link></p>
            </div>
            <p className="text-sm text-stone-600">&copy; StudyCart - 2025</p>
        </main>
    )
}