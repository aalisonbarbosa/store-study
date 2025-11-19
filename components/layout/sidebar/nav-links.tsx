"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Clock,
  LayoutPanelTop,
  LucideIcon,
  Package,
  ShoppingBag,
  User,
} from "lucide-react";
import LogoutButton from "./logout-button";

interface Links {
  href: string;
  label: string;
  icon: LucideIcon;
  role: "ADMIN" | "SELLER";
}

interface User {
  name: string;
  role: "ADMIN" | "SELLER";
}

export default function NavLinks({ user }: { user: User }) {
  const path = usePathname();

  const links: Links[] = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutPanelTop,
      role: "ADMIN",
    },
    {
      href: "/admin/products",
      label: "Meus produtos",
      icon: Package,
      role: "ADMIN",
    },
    {
      href: "/admin/orders",
      label: "Pedidos",
      icon: ShoppingBag,
      role: "ADMIN",
    },
    {
      href: "/admin/requests",
      label: "Solicitações",
      icon: Clock,
      role: "ADMIN",
    },
    { href: "/admin/profile", label: "Perfil", icon: User, role: "ADMIN" },
    {
      href: "/seller",
      label: "Dashboard",
      icon: LayoutPanelTop,
      role: "SELLER",
    },
    {
      href: "/seller/products",
      label: "Meus produtos",
      icon: Package,
      role: "SELLER",
    },
    {
      href: "/seller/orders",
      label: "Pedidos",
      icon: ShoppingBag,
      role: "SELLER",
    },
    { href: "/seller/profile", label: "Perfil", icon: User, role: "SELLER" },
  ];

  return (
    <nav>
      <ul>
        {links.map((link, i) => {
          if (link.role === user.role) {
            return (
              <li key={i}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 pl-8 py-4 hover:bg-blue-100 hover:text-blue-700 duration-200 ${
                    path === link.href
                      ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                      : null
                  }`}
                >
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          }
        })}
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}
