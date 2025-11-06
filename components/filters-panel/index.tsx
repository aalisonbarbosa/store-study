const categories = [
    {
        name: "Eletronicos"
    },
    {
        name: "Roupas"
    },
    {
        name: "Casa"
    },
]

const order = [
    {
        name: "Maior preço"
    },
    {
        name: "Menor preço"
    },
    {
        name: "Mais vendidos"
    },
]

export default function FiltersPanel() {
    return (
        <div className="flex flex-col justify-between bg-white h-92 p-6 rounded-lg">
            <h2 className="font-semibold text-lg">Filtros</h2>

            <div className="flex flex-col gap-2">
                <label htmlFor="category">Categoria</label>
                <select id="category" className="p-2 border-2 border-stone-200 rounded-lg">
                    <option value="">Todas</option>
                    {
                        categories.map((c, i) => (
                            <option value={c.name} key={i}>{c.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="price">Preço</label>
                <input type="range" id="price" className="accent-blue-700"/>
                <div className="flex justify-between items-center text-stone-500 text-sm">
                    <span>R$ 0</span>
                    <span>R$ 1000+</span>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="order">Ordener por</label>
                <select id="order" className="p-2 border-2 border-stone-200 rounded-lg">
                    <option value="">Mais relevantes</option>
                    {
                        order.map((o, i) => (
                            <option value={o.name} key={i}>{o.name}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}