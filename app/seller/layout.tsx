import Header from "@/components/layout/header/admin-header";
import SideBar from "@/components/layout/sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function SellerLayout({
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

      case "ADMIN":
        redirect("/admin");

      default:
        break;
    }
  }

  return (
    <html>
      <body>
        <div className="grid grid-cols-5">
          <SideBar user={{ name: session.user.name!, role: "SELLER" }} />
          <div className="col-span-4">
            <Header />
            <div className="min-h-[calc(100vh-80px)] bg-stone-50">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
