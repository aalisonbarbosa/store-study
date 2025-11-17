"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { approveProduct, rejectProduct, RejectProductSchema, rejectProductSchema } from "@/modules/products";

interface Props {
  productId: string;
}

export default function ApproveRejectButtons({ productId }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RejectProductSchema>({
    resolver: zodResolver(rejectProductSchema),
  });

  async function onsubmit(formData: RejectProductSchema) {
    try {
      await rejectProduct(productId, formData.reason);
    } catch (err) {
      console.error(err);
      setError("root", { message: "Erro interno no servidor." });
    }
  }

  const [visible, setVisible] = useState(false);

  return (
    <>
      <button
        onClick={() => approveProduct(productId)}
        className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-md cursor-pointer"
      >
        <Check /> Aprovar
      </button>
      <button
        onClick={() => setVisible((prev) => !prev)}
        className="flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-md cursor-pointer"
      >
        <X /> Rejeitar
      </button>

      {visible && (
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="absolute top-0 transform translate-y-1/2 bg-white w-72 p-4 space-y-2 rounded-md z-10 border-2 border-stone-200"
        >
          <textarea
            id="reason"
            rows={3}
            className="border-2 border-stone-200 rounded-md resize-none w-full p-2"
            placeholder="Informe o motivo..."
            {...register("reason")}
          ></textarea>
          {errors.reason && (
            <p className="text-sm text-red-500">{errors.reason.message}</p>
          )}
          {errors.root && (
            <p className="text-sm text-red-500">{errors.root.message}</p>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setVisible((prev) => !prev);
                reset();
              }}
              type="button"
              className="border-2 border-stone-400 p-2 rounded-md cursor-pointer"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className=" bg-red-100 text-red-800 p-2 rounded-md cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Carregando..." : "Confirmar"}
            </button>
          </div>
        </form>
      )}
    </>
  );
}
