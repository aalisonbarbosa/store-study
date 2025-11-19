import Header from "@/components/client/client-header";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
import { getCart } from "@/modules/cart";
import { CartProvider } from "@/context/cart-context";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default async function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  const cart = await getCart();

  if (session) {
    switch (session.user.role) {
      case "ADMIN":
        redirect("/admin");

      case "SELLER":
        redirect("/seller");

      default:
        break;
    }
  }

  return (
    <html lang="pt-br" className={inter.className}>
      <body>
        <CartProvider initialCart={cart}>
          <Header />
          <main className="bg-stone-50 min-h-[calc(100vh-80px)] px-16 py-8 space-y-8">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
