"use client";

import ProductForm from "@/components/product-form";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <SessionProvider>
      <div>
        <div className="flex items-center pl-8 py-8">
          <span className="space-x-4">
            <Link href="/seller/products" className="text-blue-700">
              Meus produtos
            </Link>
            <span className="text-stone-400">{">"}</span>
            <span className="text-stone-400">Adicionar produto</span>
          </span>
        </div>
        <div className="min-h-[calc(100vh-168px)] py-8 flex justify-center items-center">
          <ProductForm />
        </div>
      </div>
    </SessionProvider>
  );
}
