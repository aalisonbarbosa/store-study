import Header from "@/components/admin/admin-header";
import SideBar from "@/components/shared/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  } else {
    switch (session.user.role) {
      case "CUSTOMER":
        redirect("/");

      case "SELLER":
        redirect("/seller");

      default:
        break;
    }
  }

  return (
    <html lang="pt-br" className={inter.className}>
      <body>
        <div className="grid grid-cols-5">
          <SideBar user={{ name: session.user.name!, role: "ADMIN" }} />
          <div className="col-span-4 bg-stone-50 min-h-screen">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
