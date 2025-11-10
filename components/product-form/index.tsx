"use client";

import {
  CreateProductSchema,
  createProductSchema,
} from "@/schemas/products-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ICategory {
  id: string;
  name: string;
}

export default function ProductForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });

  async function onsubmit(data: CreateProductSchema) {
    const formData = new FormData();

    formData.append("title", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("categoryId", data.categoryId);
    formData.append("image", data.image[0]);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      router.push(
        `${session?.user.role === "SELLER" ? "/seller" : "/admin"}/products`
      );
    } catch (err) {
      console.error(err);
      setError("root", { message: "Erro ao criar produto." });
    }
  }

  const image = watch("image");

  const [categories, setCategories] = useState<ICategory[] | []>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error(err.message);
        setCategories([]);
      });
  }, []);

  return (
    <form
      className="flex flex-col gap-4 bg-white p-8 rounded-xl w-lg"
      onSubmit={handleSubmit(onsubmit)}
    >
      <h2 className="text-xl font-bold">Adicionar Novo Produto</h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="name">Nome do Produto</label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="w-full border-2 border-stone-200 p-2 rounded-md"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          {...register("description")}
          rows={3}
          className="w-full border-2 border-stone-200 p-2 resize-none rounded-md"
        ></textarea>
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="flex justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="price">Preço (R$)</label>
          <input
            type="number"
            id="price"
            {...register("price", { valueAsNumber: true })}
            className="w-full border-2 border-stone-200 p-2 rounded-md"
          />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="stock">Estoque</label>
          <input
            type="number"
            id="stock"
            {...register("stock", { valueAsNumber: true })}
            className="w-full border-2 border-stone-200 p-2 rounded-md"
          />
          {errors.stock && (
            <p className="text-sm text-red-500">{errors.stock.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category">Categoria</label>
        <select
          id="category"
          {...register("categoryId")}
          className="w-full border-2 border-stone-200 p-2 rounded-md"
        >
          <option value="">Selecione uma categoria</option>
          {categories.length > 0
            ? categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))
            : null}
        </select>
        {errors.categoryId && (
          <p className="text-sm text-red-500">{errors.categoryId.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p>Imagem do Produto</p>
        <label
          htmlFor="image"
          className="text-stone-400 w-full flex flex-col items-center justify-center gap-2 py-4 border-2 border-dashed border-stone-200 rounded-md"
        >
          <Upload size={32} />
          <p className="text-sm">
            Clique para fazer upload ou arraste uma imagem
          </p>
        </label>
        <input
          type="file"
          id="image"
          accept="image/jpeg, image/png, image/webp"
          {...register("image")}
          className="hidden"
        />
        {image && image.length > 0 && (
          <p className="text-sm text-stone-600">{image[0].name}</p>
        )}

        {errors.image && (
          <p className="text-sm text-red-500">{String(errors.image.message)}</p>
        )}

        {errors.root && (
          <p className="text-sm text-red-500">{String(errors.root.message)}</p>
        )}
      </div>

      <div className="flex justify-between items-center">
        <button
          className="bg-blue-700 text-white py-2 px-4 rounded-md w-full"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Carregando..."
            : "Enviar para aprovação do administrador"}
        </button>
        <Link
          href="/seller/products"
          className="py-2 px-4 border-2 border-stone-200 rounded-md"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
