"use client";

import { usePathname } from "next/navigation"

export default function Title() {
    const path = usePathname().split("/")[2];

    const titles: Record<string, string> = {
        dashboard: "Dashboard",
        products: "Meus produtos",
        orders: "Pedidos",
        requests: "Solicitações de produtos",
        profile: "Perfil"
    };


    return <h1 className="font-bold text-xl">{titles[path]}</h1>;
}