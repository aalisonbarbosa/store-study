import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Meus produtos</h3>
        <Link
          href="/admin/products/new"
          className="bg-blue-700 px-4 py-2 rounded-md text-white"
        >
          Adicionar produto
        </Link>
      </div>
    </div>
  );
}
