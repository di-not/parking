import { useEffect, useState } from "react";
import { useReduxStates } from "../redux/hooks/useReduxStates";
import { redirect, usePathname } from "next/navigation";
import { useActions } from "../redux/hooks/useActions";
import { authService } from "@/services/authService";

export default function useAuth( ) {
    const [appLoading, setAppLoading] = useState(true);
    const { isAuthenticated, role } = useReduxStates();
    const pathname = usePathname();

    const { setAuth, setRole } = useActions();
    useEffect(() => {
        if (isAuthenticated) {
            const check = async () => {
                const auth = await authService.chechRoleAndAuth();

                if (auth) {
                    setAuth(true);
                    setAppLoading(false);
                    setRole(auth.role);
                } else {
                    setAuth(false);
                    setRole(null);
                    setAppLoading(true);
                }
            };
            check();
        } else {
            if (pathname !== "/admin/login") {
                redirect("/admin/login");
            }
            setAppLoading(false);
        }
    }, [isAuthenticated]);
    return !appLoading;
}
