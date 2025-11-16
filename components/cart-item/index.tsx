import Image from "next/image";
import CartItemQuantity from "./cart-item-quantity";

interface ICartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  Product: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
  };
}

export default function CartItem({ item }: { item: ICartItem }) {
  return (
    <div className="flex justify-between items-center p-4 bg-white border border-stone-200 rounded-md">
      <div className="flex items-center gap-4">
        <Image
          src={item.Product.imageUrl}
          alt={item.Product.title}
          width={56}
          height={56}
          className="rounded-md"
        />
        <div>
          <h3 className="font-semibold">{item.Product.title}</h3>
          <span className="text-stone-500 text-sm">
            {item.Product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>
      <CartItemQuantity item={item} />
    </div>
  );
}
