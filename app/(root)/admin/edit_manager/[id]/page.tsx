"use client";

import { redirect, useParams, useRouter } from "next/navigation";
import useFetch from "@/shared/hooks/useFetch";
import { Primaryinput } from "@/shared/components/ui/Primaryinput";
import $api from "@/http";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

type EditFormStates = {
    login: string;
    email: string;
    password: string;
};

export default function EditManagerPage() {
    const params = useParams();
    const id = params?.id as string | undefined;

    if (!id) redirect("/not-found");

    const { data, loading, error } = useFetch(`manager/${id}`, true);
    const form = useForm<EditFormStates>();

    useEffect(() => {
        if (data) {
            form.setValue("login", data.manager_login);
            form.setValue("email", data.manager_email);
            form.setValue("password", "");
        }
    }, [data]);
    const router = useRouter();

    const handleBack = () => {
        try {
            router.back();
        } catch (e) {
            router.push("/admin");
        }
    };
    if (!data) {
        return <></>;
    }

    const onSubmit: SubmitHandler<EditFormStates> = async (formData) => {
        try {
            const response = await $api.patch(`/manager/${id}`, formData);
        } catch (err) {
            console.error("Ошибка:", err);
        }
    };

    return (
        <div className="flex gap-10 justify-center items-center m-auto">
            <div className="bg-[#000]/20 backdrop-blur-3xl rounded-4xl p-4 shadow-[0px_0px_1px_1px_rgba(255,255,255,0.25)] 
            inset-shadow-[0px_0px_20px_2px_rgba(255,255,255,0.25)] w-[450px] h-[500px] justify-center flex flex-col  ">
                <button
                    onClick={handleBack}
                    className=" text-white 
                text-[20px] font-medium bg-white/30 w-fit px-4 rounded-full h-[50px] shadow-[0px_3px_8px_0px_rgba(0,0,0,0.20)] 
            inset-shadow-[0px_0px_10px_7px_rgba(255,255,255,0.25)] mx-auto p-2 mt-2 "
                >
                    ← Работа с менеджерами
                </button>
                <h1 className="text-white font-bold text-3xl mt-10 text-center">
                    Редактирование менеджера
                </h1>
                <form
                    className="flex flex-col gap-3 p-8 m-auto mt-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <Primaryinput
                        register={form.register("email")}
                        placeholder="Почта"
                    />
                    <Primaryinput
                        register={form.register("login")}
                        placeholder="Логин"
                    />
                    <Primaryinput
                        register={form.register("password")}
                        placeholder="Пароль"
                    />

                    <button
                        type="submit"
                        className="flex bg-white/30 p-2 rounded-full shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] mt-2 mb-5 text-center text-xl text-white font-semibold justify-center transition delay-50 duration-300 ease-in-out hover:inset-shadow-[0px_0px_25px_3px_rgba(255,255,255,0.55)] hover:shadow-[0px_0px_10px_4px_rgba(255,255,255,0.35)]"
                    >
                        Сохранить
                    </button>
                </form>
            </div>
        </div>
    );
}
