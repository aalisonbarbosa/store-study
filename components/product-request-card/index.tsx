import Image from "next/image";
import ApproveRejectButtons from "./approve-reject-buttons";

interface IProduct {
  id: string;
  imageUrl: string;
  title: string;
  owner: string;
  description: string;
  price: number;
}

export default function ProductRequestCard({
  product,
  token,
}: {
  product: IProduct;
  token: string;
}) {
  return (
    <div className="flex bg-white shadow h-32 p-4 rounded-md">
      <div className="flex items-center gap-4 w-3/4">
        <div>
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={56}
            height={56}
            className="rounded-md"
          />
        </div>
        <div>
          <h3 className="font-bold">{product.title}</h3>
          <span className="text-sm text-stone-400">{product.owner}</span>
          <p>
            {product.description.length > 40
              ? product.description.slice(0, 40) + "..."
              : product.description}
          </p>
          <span className="font-bold text-blue-700 text-xl">
            {product.price}
          </span>
        </div>
      </div>
      <div className="relative flex items-center justify-center gap-4 w-1/4">
        <ApproveRejectButtons productId={product.id} token={token} />
      </div>
    </div>
  );
}
