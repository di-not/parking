"use client";

import Image from "next/image";
import roadIcon from "@/public/images/road.svg";
import decorIcon from "@/public/images/decor.svg";
import parkingIcon from "@/public/images/parking.svg";
import calculateCellStyle from "@/lib/utils/calculateCellStyle";
import { ParkElements } from "@/@types/enums";

import exitIcon from "@/public/images/exit.svg";
import barrierIcon from "@/public/images/barrier.svg";
interface Props {
    parkData:any
}

const ParkDisplay: React.FC<Props> = ({parkData}) => {

    //Константы
    const height = parkData.height;
    const width = parkData.width;
    const condition =
        width &&
        height &&
        width >= 4 &&
        height >= 4 &&
        width <= 6 &&
        height <= 6;

    const cellStyle = condition
        ? calculateCellStyle(height, width)
        : parkData.cells.length > 0
        ? calculateCellStyle(parkData.cells.length, parkData.cells[0].length)
        : {};
    console.log(parkData)
    
    return (
        <div
            style={cellStyle}
            className={`grid  min-h-[600px] justify-center gap-1.5 
            rounded-4xl bg-[#000]/20 backdrop-blur-3xl p-6 
shadow-[0px_0px_1px_1px_rgba(255,255,255,0.25)] 
inset-shadow-[0px_0px_20px_2px_rgba(255,255,255,0.25)]`}
        >
            {parkData.cells.map((element1: [], index: number) =>
                element1.map((element2: ParkElements, index_: number) => (
                    <button
                        className="cursor-pointer shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] bg-black/30 flex justify-center
                 items-center rounded-xl inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.1)] transition delay-50 duration-300 ease-in-out
                 hover:inset-shadow-[0px_0px_40px_0.1px_rgba(255,255,255,0.1)] hover:-translate-y-0.5 "
                        key={index_}
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
    );
};
export default ParkDisplay;
