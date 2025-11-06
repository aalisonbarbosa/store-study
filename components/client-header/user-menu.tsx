"use client"

import { User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(prev => !prev)} className="bg-blue-200 p-2 rounded-full cursor-pointer">
                <User className="text-blue-700" />
            </button>
            {
                isOpen &&
                <div className="absolute top-12 right-0 bg-white w-40 p-4 rounded-lg shadow">
                    <ul className="space-y-4">
                        <li className="hover:text-blue-500 duration-200">
                            <Link href="/profile">Meu Perfil</Link>
                        </li>
                        <li className="hover:text-blue-500 duration-200">
                            <Link href="/orders">Meus Pedidos</Link>
                        </li>
                        <li className="hover:text-blue-500 duration-200">Sair</li>
                    </ul>
                </div>}
        </div>
    )
}