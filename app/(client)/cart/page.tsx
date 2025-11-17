import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShoppingCart } from "lucide-react";

import { getCart } from "@/modules/cart/actions/get-cart";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { CartBase } from "@/modules/cart";

import CartItem from "@/components/client/cart-item";

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  const cart: CartBase | null = await getCart();

  const total = cart?.CartItem.reduce(
    (ac, c) => ac + c.Product.price * c.quantity,
    0
  );

  if (!cart || cart.CartItem.length === 0) {
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

  return (
    <>
      <h1 className="text-xl font-bold">Carrinho de Compras</h1>
      <div className="bg-white border border-stone-200 rounded-md">
        <div className="space-y-4 p-8 ">
          {cart?.CartItem.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>
        <div className="bg-stone-50 p-8 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Total:</h3>
            <span className="text-blue-700 font-semibold text-xl">
              {total?.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <button className="bg-blue-700 text-white w-full py-2 rounded-md cursor-pointer">
            Finalizar compra
          </button>
        </div>
      </div>
    </>
  );
}
