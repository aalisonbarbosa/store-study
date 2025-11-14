import { getPendingProduct } from "@/actions/products";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProductRequestCard from "@/components/product-request-card";
import { getServerSession } from "next-auth";

interface IProduct {
  id: string;
  imageUrl: string;
  title: string;
  owner: string;
  description: string;
  price: number;
}

export default async function RequestsPage() {
  const session = await getServerSession(authOptions);
  const products: IProduct[] | [] = await getPendingProduct(
    session?.user.accessToken!
  );

  return (
    <div className="p-8 space-y-8 min-h-[calc(100vh-80px)]">
      <h3 className="text-lg font-bold">Solicitações de produtos</h3>

      <div className="space-y-4">
        {products.length === 0 && <p>Nenhum produto encontrado.</p>}
        {products.map((p) => (
          <ProductRequestCard product={p} token={session?.user.accessToken!} key={p.id} />
        ))}
      </div>
    </div>
  );
}
