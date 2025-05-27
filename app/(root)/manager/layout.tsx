"use client";

import { useReduxStates } from "@/shared/redux/hooks/useReduxStates";
import { Roles } from "@/shared/redux/slices/auth.slice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ManagerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { role } = useReduxStates();
    const router = useRouter();

    useEffect(() => {
        if (role !== Roles.MANAGER) {
            router.push("/login");
        }
    }, [role, router]);

    if (role === Roles.MANAGER) {
        return <>{children}</>;
    }
    return null;
}
