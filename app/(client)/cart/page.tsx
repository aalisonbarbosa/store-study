import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
    const products = [
        {
            name: "produto1",
            category: "eletronico",
            price: 1024
        },
        {
            name: "produto2",
            category: "eletronico",
            price: 1499
        },
    ]

    return (
        <>
            <h1 className="text-xl font-bold">Carrinho de Compras</h1>
            <div className="bg-white h-80 flex flex-col justify-center items-center gap-4 rounded-lg shadow">
                <ShoppingCart size={64} className="text-stone-300" />
                <h3 className="font-bold">Seu carrinho está vazio</h3>
                <p className="text-stone-400">Adicione alguns produtos para começar suas compras</p>
                <button >
                    <Link href="/" className="bg-blue-700 text-white py-2 px-4 rounded-md">Continuar Comprando</Link>
                </button>
            </div>
        </>
    )
}