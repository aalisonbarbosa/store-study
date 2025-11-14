import { getProductsByUser } from "@/actions/products";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";

interface IProduct {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  stock: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  Category: {
    id: string;
    name: string;
  };
  User: {
    id: string;
    name: string;
  };
}

export default async function ProductsTable() {
  const products: IProduct[] | [] = await getProductsByUser();

  if (!products?.length) return <p>Nenhum produto encontrado.</p>;

  return (
    <div className="overflow-hidden rounded-xl border border-stone-200">
      <table className="w-full border-collapse">
        <thead className="bg-stone-100">
          <tr>
            {["Produto", "Preço", "Status", "Estoque", "Ações"].map(
              (header, i) => (
                <th
                  key={i}
                  className="p-3 text-left uppercase font-medium text-stone-500"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="text-sm">
          {products.map((p) => (
            <tr key={p.id}>
              <td className="p-3 flex items-center gap-4">
                <Image
                  src={p.imageUrl}
                  alt={p.title}
                  width={48}
                  height={48}
                  className="rounded-md"
                />
                <div className="flex flex-col gap-2">
                  <span className="font-semibold">{p.title}</span>
                  <span className="text-stone-600">{p.Category.name}</span>
                </div>
              </td>
              <td className="p-3">{p.price}</td>
              <td className="p-3">{OrderStatusBadge(p.status)}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3">
                <div className="flex items-center gap-4">
                  <button className="text-blue-700">Editar</button>
                  <button className="text-red-800">Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OrderStatusBadge(status: "PENDING" | "APPROVED" | "REJECTED") {
  const statusMap = {
    PENDING: {
      label: "Pendente",
      color: "bg-stone-200 text-stone-700",
    },
    APPROVED: {
      label: "Aprovado",
      color: "bg-green-100 text-green-800",
    },
    REJECTED: {
      label: "Rejeitado",
      color: "bg-red-100 text-red-800",
    },
  };

  const { label, color } = statusMap[status];

  return (
    <p className={`px-3 py-1 w-min text-sm font-medium rounded-full ${color}`}>
      {label}
    </p>
  );
}
