import ProductForm from "@/components/shared/product-form";
import { getSession } from "@/lib/auth";
import Link from "next/link";

export default async function NewProductPage() {
  let session;

  try {
    session = await getSession();
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center">
        <span className="space-x-4">
          <Link href="/admin/products" className="text-blue-700">
            Meus produtos
          </Link>
          <span className="text-stone-400">{">"}</span>
          <span className="text-stone-400">Adicionar produto</span>
        </span>
      </div>
      <div className="min-h-[calc(100vh-168px)] flex justify-center items-center">
        <ProductForm role={session!.user.role} />
      </div>
    </div>
  );
}
