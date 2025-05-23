"use client";
import { authService } from "@/services/authService";
import { Primaryinput } from "@/shared/components/ui/Primaryinput";
import { useActions } from "@/shared/redux/hooks/useActions";
import { redirect } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Login() {
    const form = useForm<{ password: string; login: string }>();

    const { setAuth, setRole } = useActions();

    const onSubmit: SubmitHandler<{ password: string; login: string }> = async (
        data
    ) => {
        const auth = await authService.logIn(data.login, data.password);
        if (auth) {
            setAuth(true);
            setRole(auth.role);
            if (auth.role === "admin") redirect("/admin");
            else redirect("/manager");
        }
    };

    return (
        <div className="flex gap-10 justify-center items-center m-auto">
            <div
                className="bg-[#000]/20 backdrop-blur-3xl rounded-4xl p-4 shadow-[0px_0px_1px_1px_rgba(255,255,255,0.25)] 
        inset-shadow-[0px_0px_20px_2px_rgba(255,255,255,0.25)] w-[450px] h-[400px]  "
            >
                <h1 className="text-white font-bold text-3xl mt-10 text-center">
                    Авторизация
                </h1>
                <form
                    className="flex flex-col gap-3 p-8 m-auto mt-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <Primaryinput
                        register={form.register("login", {})}
                        placeholder={"Логин"}
                    />
                    <Primaryinput
                        register={form.register("password", {})}
                        placeholder={"Пароль"}
                    />
                    <button
                        className="flex bg-white/30 p-2 rounded-full 
                        shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] 
    inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] mt-8 mb-5 
    text-center text-xl text-white font-semibold justify-center
    transition delay-50 duration-300 ease-in-out 
    hover:inset-shadow-[0px_0px_25px_3px_rgba(255,255,255,0.55)] 
    hover:shadow-[0px_0px_10px_4px_rgba(255,255,255,0.35)]"
                    >
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
}
