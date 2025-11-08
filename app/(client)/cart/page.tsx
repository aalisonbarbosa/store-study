import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ShoppingCart } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return (
    <>
      <h1 className="text-xl font-bold">Carrinho de Compras</h1>
      <div className="bg-white h-80 flex flex-col justify-center items-center gap-4 rounded-lg shadow">
        <ShoppingCart size={64} className="text-stone-300" />
        <h3 className="font-bold">Seu carrinho está vazio</h3>
        <p className="text-stone-400">
          Adicione alguns produtos para começar suas compras
        </p>
        <button>
          <Link
            href="/"
            className="bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Continuar Comprando
          </Link>
        </button>
      </div>
    </>
  );
}
