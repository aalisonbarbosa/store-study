import Header from "@/components/client-header";

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body>
                <Header />
                <main className="bg-stone-100 min-h-[calc(100vh-80px)] px-16 py-8 space-y-8">{children}</main>
            </body>
        </html>
    );
}