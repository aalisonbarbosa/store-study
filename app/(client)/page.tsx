import { getApprovedProducts } from "@/modules/products";

import { ProductCard as IProductCard } from "@/modules/products";

import FiltersPanel from "@/components/product/filters-panel";
import ProductCard from "@/components/product/product-card";

export default async function Home() {
  const products: IProductCard[] = await getApprovedProducts();

  return (
    <div className="flex justify-between gap-8">
      <div className="w-1/4">
        <FiltersPanel />
      </div>
      <div className="grid grid-cols-3 gap-8 w-3/4">
        {products.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    </div>
  );
}
