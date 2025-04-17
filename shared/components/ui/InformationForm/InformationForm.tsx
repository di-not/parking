"use client";
import { TopologyType } from "@/@types/tomologyType";
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

interface InformationFormProps {}

type InformationFormType = Omit<TopologyType, "cells">;

const InformationForm: React.FC<InformationFormProps> = () => {
    const formStates = useForm<InformationFormType>();

    const onSubmit: SubmitHandler<InformationFormType> = (data) =>
        console.log(data);

    return (
        <div className="mt-9">
            <form
                onSubmit={formStates.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <Primaryinput
                    register={formStates.register("name")}
                    placeholder="Название"
                />
                <Primaryinput
                    register={formStates.register("address")}
                    placeholder="Адрес"
                />
                <Primaryinput
                    register={formStates.register("width", {
                        required: true,
                        max: 6,
                        min: 1,
                    })}
                    placeholder="Длина"
                    type={"number"}
                />
                <Primaryinput
                    register={formStates.register("height", {
                        required: true,
                        max: 6,
                        min: 0,
                    })}
                    placeholder="Ширина"
                    type={"number"}
                />
                <Select>
                    <SelectTrigger className="flex justify-between font-medium items-center shadow-sm p-[11px] pl-5 pr-6 w-full bg-black/30 
                    rounded-full text-white/50 text-[16px] focus:outline-1! outline-[#fff]/30! outline-offset-0! ">
                        <SelectValue placeholder="Менеджер" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#000]/25 backdrop-blur-3xl rounded-4xl shadow-[0px_0px_0.4px_0px_rgba(255,255,255,255.25)] max-h-[250px]">
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
                {/* <button type="submit" >cf,vbn</button> */}
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
                className="text-white shadow-sm p-2.5 pl-5 pr-14 w-full text-[16px] font-medium bg-black/30 rounded-full placeholder:text-white/50 text-lg focus:outline-1 outline-[#fff]/30 outline-offset-0"
                placeholder={placeholder ? placeholder : ""}
            />
        </div>
    );
};
