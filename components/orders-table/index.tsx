interface OrdersProps {
    date: string;
    price: string;
    status: string;
}

export default function OrderTable({ orders }: { orders: OrdersProps[] }) {
    return (
        <table className="bg-white w-full text-left rounded-xl shadow">
            <thead>
                <tr>
                    <th className="py-2 px-4 text-stone-600 uppercase font-medium">Pedido</th>
                    <th className="py-2 px-4 text-stone-600 uppercase font-medium">Data</th>
                    <th className="py-2 px-4 text-stone-600 uppercase font-medium">Total</th>
                    <th className="py-2 px-4 text-stone-600 uppercase font-medium">Status</th>
                    <th className="py-2 px-4 text-stone-600 uppercase font-medium">Ações</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map((order, i) => (
                        <tr key={i} className="border-t-2 border-stone-200/50">
                            <td className="p-4 text-stone-800">{i}</td>
                            <td className="p-4 text-stone-400">{order.date}</td>
                            <td className="p-4 text-stone-800">{order.price}</td>
                            <td className="p-4 text-sm text-stone-800">{order.status}</td>
                            <td className="p-4 text-sm text-blue-500">
                                <button className="cursor-pointer">Ver Detalhes</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}