import { getApprovedProducts } from "@/actions/products";
import FiltersPanel from "@/components/filters-panel";
import ProductCard from "@/components/product-card";

interface IProduct {
  id: string;
  title: string;
  imageUrl: string;
  Category: {
    id: string;
    name: string;
  };
  price: number;
}

export default async function Home() {
  const products: IProduct[] | [] = await getApprovedProducts();

  return (
    <div className="flex justify-between gap-8">
      <div className="w-1/4">
        <FiltersPanel />
      </div>
      <div className="grid grid-cols-3 gap-8 w-3/4">
        {products.map((p, i) => (
          <ProductCard product={p} key={i} />
        ))}
      </div>
    </div>
  );
}
