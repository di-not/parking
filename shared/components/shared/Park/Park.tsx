"use client";
import { ParkElements } from "@/@types/enums";
import Image from "next/image";
import { useState } from "react";
import roadIcon from "@/public/images/road.svg";
import decorIcon from "@/public/images/decor.svg";
import parkingIcon from "@/public/images/parking.svg";
import exitIcon from "@/public/images/exit.svg";
import barrierIcon from "@/public/images/barrier.svg";
import { ParkElementButton } from "../../ui/ParkElementButton";
import { useReduxStates } from "@/shared/redux/hooks/useReduxStates";
import calculateCellStyle from "@/lib/utils/calculateCellStyle";
import { useActions } from "@/shared/redux/hooks/useActions";
import useCells from "@/shared/hooks/useCells";
import { useRouter } from "next/navigation";

interface ParkProps {}

const Park: React.FC<ParkProps> = () => {
    //Функции стейт менджера
    const { topology } = useReduxStates();
    const { setTopologyCells } = useActions();

    //Константы
    const height = topology.height;
    const width = topology.width;
    const condition =
        width &&
        height &&
        width >= 4 &&
        height >= 4 &&
        width <= 6 &&
        height <= 6;

    //Обработка логики ячеек
    const [cells, setCells] = useCells(topology);

    const [active, setActive] = useState<ParkElements>(ParkElements.D);

    const cellStyle = condition
        ? calculateCellStyle(height, width)
        : cells.length > 0
        ? calculateCellStyle(cells.length, cells[0].length)
        : {};

    const router = useRouter();

    const handleBack = () => {
        try {
            router.back();
        } catch (e) {
            router.push("/admin");
        }
    };
    return (
        <div
            className="bg-[#000]/20 backdrop-blur-3xl rounded-4xl p-6 shadow-[0px_0px_1px_1px_rgba(255,255,255,0.25)] 
        inset-shadow-[0px_0px_20px_2px_rgba(255,255,255,0.25)] "
        >
            <div className="flex gap-6">
                <button
                    onClick={handleBack}
                    className=" text-white 
                text-[30px] font-medium bg-white/30 max-w-[70px] w-full rounded-full h-[70px] shadow-[0px_3px_8px_0px_rgba(0,0,0,0.20)] 
            inset-shadow-[0px_0px_10px_7px_rgba(255,255,255,0.25)] "
                >
                    ←
                </button>
                <div
                    className=" w-full flex gap-5 mb-5 bg-white/30 p-2.5 pl-4 rounded-full shadow-[0px_3px_8px_0px_rgba(0,0,0,0.20)] 
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
                    <ParkElementButton
                        setActive={setActive}
                        active={active}
                        parkElement={ParkElements.O}
                        alt="выезд"
                        src={exitIcon}
                    />
                    <ParkElementButton
                        setActive={setActive}
                        active={active}
                        parkElement={ParkElements.I}
                        alt="въезд"
                        src={barrierIcon}
                    />
                </div>
            </div>
            <div
                style={cellStyle}
                className={`grid w-[840px] max-h-[1300px] min-h-[600px] justify-center  gap-1.5`}
            >
                {cells.map((element1, index1) =>
                    element1.map((element2, index2) => (
                        <button
                            className="cursor-pointer shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] bg-black/30 flex justify-center
                             items-center rounded-xl inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.1)] transition delay-50 duration-300 ease-in-out
                             hover:inset-shadow-[0px_0px_40px_0.1px_rgba(255,255,255,0.1)] hover:-translate-y-0.5 "
                            key={index2}
                            onClick={() => {
                                const a = cells.map((row) => [...row]);
                                a[index1][index2] = active;
                                setCells(a);
                                setTopologyCells(a);
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
                    ))
                )}
            </div>
        </div>
    );
};
export { Park };
