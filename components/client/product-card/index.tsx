import Image from "next/image";
import AddToCart from "./add-to-cart-button";
import type { ProductCard } from "@/modules/products";

export default function ProductCard({ product }: { product: ProductCard }) {
  return (
    <div className="w-full h-96 rounded-lg hover:shadow-xl duration-300 bg-white border-2 border-stone-200">
      <div className="w-full h-3/5 rounded-t-lg overflow-hidden relative">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover z-0"
        />
      </div>

      <div className="flex justify-center items-center p-4 h-2/5">
        <div className="space-y-1 w-full">
          <h3 className="font-bold">{product.title}</h3>
          <p className="text-sm text-stone-500">{product.Category.name}</p>
          <div className="flex justify-between items-center">
            <span className="text-blue-700 font-bold text-xl">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <AddToCart productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
