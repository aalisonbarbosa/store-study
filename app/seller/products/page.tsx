import ProductsTable from "@/components/products-table";
import { ProductsTableSkeleton } from "@/components/products-table/products-table-skeleton";
import Link from "next/link";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <div className="p-8 space-y-8 min-h-[calc(100vh-80px)]">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Meus produtos</h3>
        <Link
          href="/seller/products/new"
          className="bg-blue-700 px-4 py-2 rounded-md text-white"
        >
          Adicionar produto
        </Link>
      </div>
      <Suspense fallback={<ProductsTableSkeleton />}>
        <ProductsTable />
      </Suspense>
    </div>
  );
}
