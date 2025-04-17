"use client";
import { ParkElements } from "@/@types/enums";
import Image from "next/image";
import { useState } from "react";
import roadIcon from "@/public/images/road.svg";
import decorIcon from "@/public/images/decor.svg";
import parkingIcon from "@/public/images/parking.svg";
import { ParkElementButton } from "../../ui/ParkElementButton";
import { useActions } from "@/shared/redux/hooks/useActions";

interface ParkProps {
    columns: number;
    rows: number;
}

const Park: React.FC<ParkProps> = ({ columns, rows }) => {
    const [cells, setCells] = useState<ParkElements[][]>(
        [...Array(rows)].map((element, index) => {
            return [...Array(columns)].map(() => {
                return ParkElements.EMPTY;
            });
        })
    );
    const [active, setActive] = useState<ParkElements>(ParkElements.D);

    const maxBlockSizeWithoutPaddingsAndGaps = 800;

    const cellStyle = {
        gridTemplateColumns: `repeat(${columns},${Math.ceil(
            maxBlockSizeWithoutPaddingsAndGaps / columns
        )}px)`,
        gridTemplateRows: `repeat(${rows},${Math.ceil(
            maxBlockSizeWithoutPaddingsAndGaps / columns
        )}px)`,
    };

    const {} = useActions()
    return (
        <div
            className="bg-[#000]/30 backdrop-blur-3xl rounded-4xl p-6 shadow-[0px_0px_1px_1px_rgba(255,255,255,0.25)] 
        inset-shadow-[0px_0px_20px_2px_rgba(255,255,255,0.25)]"
        >

            <div
                className="flex gap-5 mb-5 bg-white/30 p-2.5 pl-4 rounded-full shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] 
            inset-shadow-[0px_0px_15px_10px_rgba(255,255,255,0.25)]"
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
                className={`grid max-w-[860px] max-h-[1000px] w-full h-full gap-1.5`}
            >
                {cells.map((element1, index1) =>
                    element1.map((element2, index2) => (
                        <button
                            className="cursor-pointer shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] bg-black/30 flex justify-center
                             items-center rounded-xl inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.1)]"
                            key={index2}
                            onClick={() => {
                                const a = cells.map((e) => e);
                                a[index1][index2] = active;
                                setCells(a);
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
