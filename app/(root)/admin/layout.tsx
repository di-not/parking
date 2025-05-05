
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Главная",
};export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <div className=" flex min-h-screen sm:font-[family-name:var(--font-base)]">
            <main className=" gap-[32px] row-start-2  w-full min-h-full flex">
                 {children}
            </main>
        </div>
    );
}
