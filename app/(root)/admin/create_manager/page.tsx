"use client";
import $api from "@/http";
import { authService } from "@/services/authService";
import { Primaryinput } from "@/shared/components/ui/Primaryinput";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
type RegisterType = {
    email: string;
    login: string;
    password: string;
    repeat_password: string;
};
export default function CreateManagerPage() {
    const form = useForm<RegisterType>();

    const onSubmit: SubmitHandler<RegisterType> = async (data) => {
        const regManage = await $api.post("/manager", data);
        console.log(data, "не авторизированно");
    };
    const router = useRouter();

    const handleBack = () => {
        try {
            router.back();
        } catch (e) {
            router.push("/admin");
        }
    };
    return (
        <div className="flex gap-10 justify-center items-center m-auto">
            <div
                className="bg-[#000]/20 backdrop-blur-3xl rounded-4xl p-4 shadow-[0px_0px_1px_1px_rgba(255,255,255,0.25)] 
        inset-shadow-[0px_0px_20px_2px_rgba(255,255,255,0.25)] w-[450px] h-[500px] flex flex-col justify-center items-center"
            >
                <button
                    onClick={handleBack}
                    className=" text-white 
                text-[20px] font-medium bg-white/30 w-fit px-4 rounded-full h-[50px] shadow-[0px_3px_8px_0px_rgba(0,0,0,0.20)] 
            inset-shadow-[0px_0px_10px_7px_rgba(255,255,255,0.25)] mx-auto p-2 mt-2 mb-3"
                >
                    ← Работа с менеджерами
                </button>
                <h1 className="text-white font-bold text-3xl mt-5 text-center">
                    Регистрация менеджера
                </h1>
                <form
                    className="flex flex-col gap-3 p-8 m-auto mt-1"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <Primaryinput
                        register={form.register("email", {})}
                        placeholder={"Почта"}
                    />
                    <Primaryinput
                        register={form.register("login", {})}
                        placeholder={"Логин"}
                    />
                    <Primaryinput
                        register={form.register("password", {})}
                        placeholder={"Пароль"}
                    />
                    <Primaryinput
                        register={form.register("repeat_password", {})}
                        placeholder={"Повторите пароль"}
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
                        Зарегистрировать
                    </button>
                </form>
            </div>
        </div>
    );
}
