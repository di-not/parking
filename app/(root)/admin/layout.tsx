"use client";

import { useReduxStates } from "@/shared/redux/hooks/useReduxStates";
import { Roles } from "@/shared/redux/slices/auth.slice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { role } = useReduxStates();
    const router = useRouter();

    useEffect(() => {
        if (role !== Roles.ADMIN) {
            router.push("/login");
        }
    }, [role, router]);

    if (role === Roles.ADMIN) {
        return <>{children}</>;
    }
    return null;
}
