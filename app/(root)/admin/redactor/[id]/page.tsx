"use client";

import { redirect, useParams } from "next/navigation";
import useFetch from "@/shared/hooks/useFetch";
import { useActions } from "@/shared/redux/hooks/useActions";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import exitIcon from "@/public/images/exit.svg";
import barrierIcon from "@/public/images/barrier.svg";
import { TopologyType } from "@/@types/topologyType";
import { Primaryinput } from "@/shared/components/ui/Primaryinput";
import roadIcon from "@/public/images/road.svg";
import decorIcon from "@/public/images/decor.svg";
import parkingIcon from "@/public/images/parking.svg";
import Image from "next/image";
import { ParkElementButton } from "@/shared/components/ui/ParkElementButton";
import useCells from "@/shared/hooks/useCells";
import { ParkElements } from "@/@types/enums";
import calculateCellStyle from "@/lib/utils/calculateCellStyle";
import { SelectManager } from "@/shared/components/ui/InformationForm/InformationForm";
import $api from "@/http";

export default function Redactor() {
    const params = useParams();
    const id = params?.id as string | undefined;
    const { data, loading, error } = useFetch(`parking/${id}`, true);

    if (!id) redirect("/not-found");
    if (!data) return <></>; // Если данных нет, возвращаем null

    console.log(data, "это в редакторе1");

    return (
        <div className="container">
            <div className="flex justify-center my-10 gap-8">
                <div
                    className="bg-[#000]/20 backdrop-blur-3xl rounded-4xl p-6 
            shadow-[0px_0px_1px_1px_rgba(255,255,255,0.25)] 
            inset-shadow-[0px_0px_20px_2px_rgba(255,255,255,0.25)] "
                >
                    <ParkInEditor data={data} id={id} />
                </div>
            </div>
        </div>
    );
}

const ParkInEditor: React.FC<{ data: any ,id:string}> = ({ data ,id}) => {
    const formStates = useForm<TopologyType>({
        defaultValues: {
            name: data.name,
            address: data.address,
            width: data.width,
            height: data.height,
            day_tariff: data.day_tariff,
            night_tariff: data.night_tariff,
            cells: data.cells,
            manager_id: data.manager.id.toString(),
        },
    });

    const [cells, setCells] = useCells(formStates.watch());

    const onSubmit: SubmitHandler<TopologyType> = (data) => {      
        
        const res = $api.patch(`/parking/${id}`,data)
    }
    
    
    //Константы
    const height = formStates.getValues("height");
    const width = formStates.getValues("width");
    const condition =
        width &&
        height &&
        width >= 4 &&
        height >= 4 &&
        width <= 6 &&
        height <= 6;

    const [active, setActive] = useState<ParkElements>(ParkElements.D);

    const cellStyle = condition
        ? calculateCellStyle(height, width)
        : cells.length > 0
        ? calculateCellStyle(cells.length, cells[0].length)
        : {};

    return (
        <div className="flex gap-10 w-full">
            <div className="">
                <div
                    className="flex gap-5 mb-5 bg-white/30 p-2.5 pl-4 rounded-full shadow-[0px_3px_8px_0px_rgba(0,0,0,0.20)] 
        inset-shadow-[0px_0px_10px_7px_rgba(255,255,255,0.25)]
        "
                >
                    <ParkElementButton
                        setActive={setActive}
                        active={active}
                        parkElement={ParkElements.D}
                        alt="декор"
                        src={decorIcon}
                    />
                    <ParkElementButton
                        setActive={setActive}
                        active={active}
                        parkElement={ParkElements.R}
                        alt="дорога"
                        src={roadIcon}
                    />
                    <ParkElementButton
                        setActive={setActive}
                        active={active}
                        parkElement={ParkElements.P}
                        alt="парковка"
                        src={parkingIcon}
                    />
                </div>
                <div
                    style={cellStyle}
                    className={`grid w-[840px] max-h-[1300px] min-h-[600px] justify-center  gap-1.5`}
                >
                    {cells.map((element1, index1) => {
                        return element1.map((element2, index2) => (
                            <button
                                className="cursor-pointer shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] bg-black/30 flex justify-center
                         items-center rounded-xl inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.1)] transition delay-50 duration-300 ease-in-out
                         hover:inset-shadow-[0px_0px_40px_0.1px_rgba(255,255,255,0.1)] hover:-translate-y-0.5 "
                                key={index2}
                                onClick={() => {
                                    console.log(`;jgf`);
                                    const a = cells.map((row) => [...row]);
                                    a[index1][index2] = active;
                                    setCells(a);
                                    formStates.setValue("cells", a);
                                }}
                            >
                                {element2 === ParkElements.D ? (
                                    <Image
                                        width={70}
                                        height={70}
                                        alt="декор"
                                        src={decorIcon}
                                        className="invert-[100%] brightness-[0%]"
                                    />
                                ) : element2 === ParkElements.R ? (
                                    <Image
                                        width={70}
                                        height={70}
                                        alt="дорога"
                                        src={roadIcon}
                                        className="invert-[100%] brightness-[0%]"
                                    />
                                ) : element2 === ParkElements.P ? (
                                    <Image
                                        width={70}
                                        height={70}
                                        alt="дорога"
                                        src={parkingIcon}
                                        className="invert-[100%] brightness-[0%]"
                                    />
                                ) : element2 === ParkElements.O ? (
                                    <Image
                                        width={70}
                                        height={70}
                                        alt="въезд"
                                        src={exitIcon}
                                        className="invert-[100%] brightness-[0%]"
                                    />
                                ) : element2 === ParkElements.I ? (
                                    <Image
                                        width={70}
                                        height={70}
                                        alt="выезд"
                                        src={barrierIcon}
                                        className="invert-[100%] brightness-[0%]"
                                    />
                                ) : (
                                    <></>
                                )}
                            </button>
                        ));
                    })}
                </div>
            </div>
            <div>
                <form
                    onSubmit={formStates.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4  h-full"
                >
                    <Primaryinput
                        register={formStates.register("name", {
                            required: true,
                        })}
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
                    <SelectManager formStates={formStates} />
                    <button
                        type="submit"
                        className={`bg-white/30  rounded-full shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] 
            inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] text-center text-[16px] text-white font-semibold justify-center
            transition delay-50 duration-300 ease-in-out hover:inset-shadow-[0px_0px_25px_3px_rgba(255,255,255,0.55)] 
            hover:shadow-[0px_0px_10px_4px_rgba(255,255,255,0.35)] w-full mt-auto p-[12px_64px] h-fit`}
                    >
                        Изменить
                    </button>
                </form>
            </div>
        </div>
    );
};
