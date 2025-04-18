"use client";
import { TopologyType } from "@/@types/topologyType";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
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

interface InformationFormProps {}

type InformationFormType = Omit<TopologyType, "cells">;

const InformationForm: React.FC<InformationFormProps> = () => {
    const { topology } = useReduxStates();
    const { setTopologyWithoutCells } = useActions();
    const { cells, ...obj } = topology;
    const formStates = useForm<InformationFormType>({
        defaultValues: obj,
    });

    const onSubmit: SubmitHandler<InformationFormType> = (data) =>
        setTopologyWithoutCells(data);

    useEffect(() => {
        setTopologyWithoutCells(formStates.getValues());
    }, [formStates.watch()]);

    return (
        <div className="mt-9 h-[calc(100%_-_65px)]">
            <form
                onSubmit={formStates.handleSubmit(onSubmit)}
                className="flex flex-col gap-4  top-[40px] sticky"
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
                    })}
                    placeholder="Длина"
                    type={"number"}
                />

                <Primaryinput
                    register={formStates.register("height", {
                        required: true,
                        max: 6,
                        min: 4,
                    })}
                    placeholder="Ширина"
                    type={"number"}
                />
                <Primaryinput
                    register={formStates.register("day_tariff", {
                        required: true,
                        max: 1000,
                        min: 0,
                    })}
                    placeholder="Дневной тариф"
                    type={"number"}
                />
                <Primaryinput
                    register={formStates.register("night_tariff", {
                        required: true,
                        max: 1000,
                        min: 0,
                    })}
                    placeholder="Ночной тариф"
                    type={"number"}
                />
                <Select>
                    <SelectTrigger
                        className="flex justify-between font-medium items-center shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] p-[11px] pl-5 pr-6 w-full bg-black/30   
                    inset-shadow-[0px_0px_5px_0.1px_rgba(255,255,255,0.1)]
                    rounded-full text-white text-[16px] focus:outline-1! outline-[#fff]/30! outline-offset-0! "
                    >
                        <SelectValue placeholder="Менеджер" />
                    </SelectTrigger>
                    <SelectContent
                        className="bg-[#000]/25 absolute backdrop-blur-3xl rounded-4xl shadow-[1px_0px_1px_0px_rgba(255,255,255,0.25)] 
                    inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.25)] max-h-[250px]"
                    >
                        <SelectGroup className="p-2 gap-1 ">
                            <SelectLabel className="text-white/50 text-sm font-normal">
                                Менеджеры
                            </SelectLabel>
                            <SelectItem value="manager1">Менеджер1</SelectItem>
                            <SelectItem value="manager2">Менеджер2</SelectItem>
                            <SelectItem value="manager3">Менеджер3</SelectItem>
                            <SelectItem value="manager4">Менеджер4</SelectItem>
                            <SelectItem value="manager5">Менеджер5</SelectItem>
                            <SelectItem value="manager6">Менеджер6</SelectItem>
                            <SelectItem value="manager7">Менеджер7</SelectItem>
                            <SelectItem value="manager8">Менеджер8</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

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

export type PrimaryinputType = {
    register: any;
    type?: "number" | "text";
    placeholder?: string;
};
const Primaryinput: React.FC<PrimaryinputType> = ({
    register,
    placeholder,
    type,
}) => {
    return (
        <div className="">
            <input
                {...register}
                type={type ? type : "text"}
                className="text-white shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] inset-shadow-[0px_0px_5px_0.1px_rgba(255,255,255,0.1)] p-2.5 pl-5 pr-14 w-full text-[16px] font-medium bg-black/30 rounded-full placeholder:text-white/50 text-lg focus:outline-1 outline-[#fff]/30 outline-offset-0"
                placeholder={placeholder ? placeholder : ""}
            />
        </div>
    );
};
