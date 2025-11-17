import { getPendingProduct } from "@/modules/products";

import ProductRequestCard from "@/components/admin/product-request-card";

export default async function RequestsPage() {
  const products = await getPendingProduct();

  return (
    <div className="p-8 space-y-8 min-h-[calc(100vh-80px)]">
      <h3 className="text-lg font-bold">Solicitações de produtos</h3>

      <div className="space-y-4">
        {products.length === 0 && <p>Nenhum produto encontrado.</p>}
        {products.map((p) => (
          <ProductRequestCard product={p} key={p.id} />
        ))}
      </div>
    </div>
  );
}
