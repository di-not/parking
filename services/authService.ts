import $api from "@/http";

export const authService = {
    logIn: async (login: string, password: string) => {
        try {
            
            const res= await $api.post("/login", {
                login: login,
                password: password,
            });
            return res
        } catch (error) {
            console.log(`ошибка`);
        }
    },
};
