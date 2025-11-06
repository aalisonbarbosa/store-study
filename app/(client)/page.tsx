import FiltersPanel from "@/components/filters-panel";
import Header from "@/components/client-header";
import ProductCard from "@/components/product-card";

interface Product {
  name: string;
  category: string;
  price: number;
}

const products: Product[] = [
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
  {
    name: "produto3",
    category: "eletronico",
    price: 133
  },
  {
    name: "produto4",
    category: "eletronico",
    price: 123
  },
  {
    name: "produto5",
    category: "eletronico",
    price: 1257
  },
]

export default function Home() {

  return (
    <div className="flex justify-between gap-8">
      <div className="w-1/4">
        <FiltersPanel />
      </div>
      <div className="grid grid-cols-3 gap-8 w-3/4">
        {
          products.map((p, i) => (
            <ProductCard product={p} key={i} />
          ))
        }
      </div>
    </div>
  );
}
