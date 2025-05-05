"use client";
import { authService } from "@/services/authService";
import { Primaryinput } from "@/shared/components/ui/Primaryinput";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Login() {
    const form = useForm<{ password: string; login: string }>();

    const onSubmit: SubmitHandler<{ password: string; login: string }> = async (
        data
    ) => {
        const auth = await authService.logIn(data.login, data.password);
        if(auth?.status === 202){
            redirect('/admin')
        }
    };

    return (
        <div className="flex gap-10 justify-center items-center m-auto">
            <div
                className="bg-[#000]/20 backdrop-blur-3xl rounded-4xl p-4 shadow-[0px_0px_1px_1px_rgba(255,255,255,0.25)] 
        inset-shadow-[0px_0px_20px_2px_rgba(255,255,255,0.25)] w-[450px] h-[500px]  "
            >
                <h1 className="text-white font-bold text-3xl mt-10 text-center">
                    Вход Администратора
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
    inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] mt-2 mb-5 
    text-center text-xl text-white font-semibold justify-center
    transition delay-50 duration-300 ease-in-out 
    hover:inset-shadow-[0px_0px_25px_3px_rgba(255,255,255,0.55)] 
    hover:shadow-[0px_0px_10px_4px_rgba(255,255,255,0.35)]"
                    >
                        Войти
                    </button>
                    <p className="text-white text-lg text-center font-bold mt-6">
                        Сменить пользователя
                    </p>
                    <div className="flex justify-between gap-4">
                        <Link
                            href="/admin/login"
                            className="flex text-white shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] 
                inset-shadow-[0px_0px_12px_2px_rgba(255,255,255,0.25)] p-2 w-full text-xl font-medium bg-black/30 rounded-full 
                placeholder:text-white/50  focus:outline-1 outline-[#fff]/30 outline-offset-0 justify-center"
                        >
                            Админ
                        </Link>
                        <Link
                            href="/moderator/login"
                            className="flex bg-white/30 p-2 rounded-full 
                        shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] 
    inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] 
    text-center text-xl text-white font-semibold justify-center
    transition delay-50 duration-300 ease-in-out  w-full
    hover:inset-shadow-[0px_0px_25px_3px_rgba(255,255,255,0.55)] 
    hover:shadow-[0px_0px_10px_4px_rgba(255,255,255,0.35)]"
                        >
                            Модератор
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
