"use client";

import ProductForm from "@/components/product-form";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <SessionProvider>
      <div className="p-8 space-y-8">
        <div className="flex items-center">
          <span className="space-x-4">
            <Link href="/seller/products" className="text-blue-700">
              Meus produtos
            </Link>
            <span className="text-stone-400">{">"}</span>
            <span className="text-stone-400">Adicionar produto</span>
          </span>
        </div>
        <div className="min-h-[calc(100vh-168px)] flex justify-center items-center">
          <ProductForm />
        </div>
      </div>
    </SessionProvider>
  );
}
