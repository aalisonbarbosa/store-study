import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import OrderTable from "@/components/orders/orders-table";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const dataTable = [
  {
    date: "2024-01-15",
    price: "899,99",
    status: "Processando",
  },
  {
    date: "2024-01-15",
    price: "899,99",
    status: "Processando",
  },
  {
    date: "2024-01-15",
    price: "899,99",
    status: "Processando",
  },
  {
    date: "2024-01-15",
    price: "899,99",
    status: "Processando",
  },
  {
    date: "2024-01-15",
    price: "899,99",
    status: "Processando",
  },
];

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");
  
  return (
    <>
      <h1 className="text-xl font-bold">Meus Pedidos</h1>
      <OrderTable orders={dataTable} />
    </>
  );
}
