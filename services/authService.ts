import $api from "@/http";
import { useActions } from "@/shared/redux/hooks/useActions";
import { useReduxStates } from "@/shared/redux/hooks/useReduxStates";
import { Roles } from "@/shared/redux/slices/auth.slice";

export const authService = {
    logIn: async (login: string, password: string) => {
        try {
            const res = await $api.post("/login", {
                login: login,
                password: password,
            });

            if (res.status === 202) {
                const role = await $api.get<{ role: string; userID: number }>(
                    "/role"
                );

                if (role.status === 200)
                    return {
                        role:
                            role.data.role === "admin"
                                ? Roles.ADMIN
                                : Roles.MANAGER,
                    };
                else return null;
            } else {
                return null;
            }
        } catch (error) {
            console.log(`ошибка`);
            return null;
        }
    },
    chechRoleAndAuth: async () => {
        try {
            const role = await $api.get<{ role: string; userID: number }>(
                "/role"
            );
            if (role.status === 200) {
                return {
                    role:
                        role.data.role === "admin"
                            ? Roles.ADMIN
                            : Roles.MANAGER,
                };
            } else {
                return null;
            }
        } catch {
            console.log(`ошибка`);
            return null;
        }
    },
};
