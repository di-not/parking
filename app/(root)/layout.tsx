"use client";

import useAuth from "@/shared/hooks/useAuth";
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const auth = useAuth();
    return (
        <div className=" flex min-h-screen sm:font-[family-name:var(--font-base)]">
            <main className=" gap-[32px] row-start-2  w-full min-h-full flex">
                {auth && children}
            </main>
        </div>
    );
}
