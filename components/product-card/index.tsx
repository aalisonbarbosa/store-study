interface Product {
    product: {
        name: string;
        category: string;
        price: number;
    }
}

export default function ProductCard({ product }: Product) {
    return (
        <div className="w-full h-96 rounded-lg hover:shadow-xl duration-300 bg-white border-2 border-stone-200">
            <div className="bg-stone-300 w-full h-3/5 rounded-t-lg"></div>
            
            <div className="flex justify-center items-center p-4 h-2/5">
                <div className="space-y-1 w-full">
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-sm">{product.category}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-blue-700 font-bold text-xl">R$ {product.price}</span>
                        <button className="text-sm bg-blue-700 text-stone-50 p-2 rounded-md z-10 cursor-pointer">Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}