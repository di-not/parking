"use client";
import { TopologyType } from "@/@types/topologyType";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { useActions } from "@/shared/redux/hooks/useActions";
import { useEffect } from "react";
import { useReduxStates } from "@/shared/redux/hooks/useReduxStates";
import { Primaryinput } from "../Primaryinput";
import useFetch from "@/shared/hooks/useFetch";
import { ManagerType } from "@/app/(root)/admin/manager_dashboard/page";
import $api from "@/http";

interface InformationFormProps {}

type InformationFormType = Omit<TopologyType, "cells">;

const InformationForm: React.FC<InformationFormProps> = () => {
    //Функции стейт менджера
    const { topology } = useReduxStates();
    const { setTopologyWithoutCells } = useActions();

    //Регистрация формы и заполнение начальными значениями
    const { cells, ...topologyWithoutCells } = topology;
    const formStates = useForm<InformationFormType>({
        defaultValues: topologyWithoutCells,
    });
    useEffect(() => {
        setTopologyWithoutCells(formStates.getValues());
    }, [formStates.watch()]);

    const onSubmit: SubmitHandler<InformationFormType> = (data) => {
        data.manager.id = Number(data.manager.id);
        const res = $api.post(`/parking`, { ...data, ...topology });

        setTopologyWithoutCells(data);
    };

    return (
        <div className="mt-9 h-[calc(100%_-_65px)]">
            <form
                onSubmit={formStates.handleSubmit(onSubmit)}
                className="flex flex-col gap-4  "
            >
                <Primaryinput
                    register={formStates.register("name", { required: true })}
                    placeholder="Название"
                />
                <Primaryinput
                    register={formStates.register("address", {
                        required: true,
                    })}
                    placeholder="Адрес"
                />
                <Primaryinput
                    register={formStates.register("width", {
                        required: true,
                        max: 6,
                        min: 4,
                        valueAsNumber: true,
                    })}
                    placeholder="Длина"
                    type={"number"}
                />
                <Primaryinput
                    register={formStates.register("height", {
                        required: true,
                        max: 6,
                        min: 4,
                        valueAsNumber: true,
                    })}
                    placeholder="Ширина"
                    type={"number"}
                />
                <Primaryinput
                    register={formStates.register("day_tariff", {
                        required: true,
                        max: 1000,
                        min: 0,
                        valueAsNumber: true,
                    })}
                    placeholder="Дневной тариф"
                    type={"number"}
                />
                <Primaryinput
                    register={formStates.register("night_tariff", {
                        required: true,
                        max: 1000,
                        valueAsNumber: true,
                        min: 0,
                    })}
                    placeholder="Ночной тариф"
                    type={"number"}
                />
                <SelectManager formStates={formStates} />
                <button
                    onClick={() => {
                        formStates.reset({
                            name: "",
                            address: "",
                            width: 4,
                            height: 4,
                            day_tariff: 0,
                            night_tariff: 0,
                        });
                    }}
                    type="button"
                    className="flex bg-white/30 p-3 rounded-full shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] 
            inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] text-center text-[16px] text-white font-semibold justify-center
            transition delay-50 duration-300 ease-in-out hover:inset-shadow-[0px_0px_25px_3px_rgba(255,255,255,0.55)] hover:shadow-[0px_0px_10px_4px_rgba(255,255,255,0.35)]"
                >
                    Очистить форму
                </button>

                <button
                    type="submit"
                    className="flex mt-10 bg-white/30 p-3 rounded-full shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] 
            inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] text-center text-[16px] text-white font-semibold justify-center
            transition delay-50 duration-300 ease-in-out hover:inset-shadow-[0px_0px_25px_3px_rgba(255,255,255,0.55)] hover:shadow-[0px_0px_10px_4px_rgba(255,255,255,0.35)]"
                >
                    Создать парковку
                </button>
            </form>
        </div>
    );
};
export { InformationForm };

export const SelectManager = ({ formStates }: any) => {
    const { data, loading, error } = useFetch(`/manager`, true);
    return (
        <Select
            onValueChange={(v) => {
                formStates.setValue("manager.id", v);
            }}
            value={formStates.getValues("manager.id")}
        >
            <SelectTrigger
                className="flex justify-between font-medium items-center shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] p-[11px] pl-5 pr-6 w-full bg-black/30   
                    inset-shadow-[0px_0px_12px_2px_rgba(255,255,255,0.25)]
                    rounded-full text-white text-[16px] focus:outline-1! outline-[#fff]/30! outline-offset-0! "
            >
                <SelectValue placeholder="Менеджер" />
            </SelectTrigger>
            <SelectContent
                className="bg-[#000]/25 absolute backdrop-blur-3xl rounded-4xl shadow-[1px_0px_1px_0px_rgba(255,255,255,0.25)] 
                    inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.25)] max-h-[250px]"
            >
                <SelectGroup className="p-2 gap-1 ">
                    <SelectLabel
                        key="-1"
                        className="text-white/50 text-sm font-normal"
                    >
                        Менеджеры
                    </SelectLabel>
                    {data ? (
                        data.map((element: ManagerType, index: number) => (
                            <SelectItem
                                value={`${element.manager_id}`}
                                key={element.manager_id}
                            >
                                {element.manager_login}
                            </SelectItem>
                        ))
                    ) : (
                        <SelectItem value={`загрузка`}>загрузка</SelectItem>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
