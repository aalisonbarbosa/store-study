import OrderTable from "@/components/orders-table"

const dataTable = [
    {
        date: '2024-01-15', price: '899,99', status: 'Processando'
    },
    {
        date: '2024-01-15', price: '899,99', status: 'Processando'
    },
    {
        date: '2024-01-15', price: '899,99', status: 'Processando'
    },
    {
        date: '2024-01-15', price: '899,99', status: 'Processando'
    },
    {
        date: '2024-01-15', price: '899,99', status: 'Processando'
    },
]

export default function OrdersPage() {
    return (
        <>
            <h1 className="text-xl font-bold">Meus Pedidos</h1>
            <OrderTable orders={dataTable}/>
        </>
    )
}