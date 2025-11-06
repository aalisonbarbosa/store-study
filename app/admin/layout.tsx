import Header from "@/components/admin-header";
import SideBar from "@/components/sidebar";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = { name: "alison", role: "ADMIN" } as const;

    return (
        <html>
            <body>
                <div className="grid grid-cols-5">
                    <SideBar user={user} />
                    <div className="col-span-4 bg-stone-100 min-h-screen space-y-8">
                        <Header />
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}