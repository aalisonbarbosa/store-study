import Header from "@/components/layout/header/admin-header";
import SideBar from "@/components/layout/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

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
    <html>
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
