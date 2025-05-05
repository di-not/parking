"use client";

import useAuth from "@/shared/hooks/useAuth";
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const auth = useAuth();
    return <>{auth && children}</>;
}
