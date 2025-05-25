"use client";
import { TopologyType } from "@/@types/topologyType";
import Link from "next/link";

interface parkCardProps {
    element: TopologyType & {
        id: number;
    };
}
const parkCard: React.FC<parkCardProps> = ({ element }) => {
    return (
        <li
            className="w-full bg-[#000]/20 backdrop-blur-3xl rounded-4xl 
                    shadow-[0px_0px_1px_1px_rgba(255,255,255,0.25)] transition delay-50 duration-300 ease-in-out
                inset-shadow-[0px_0px_20px_2px_rgba(255,255,255,0.25)]  cursor-pointer
                hover:inset-shadow-[0px_0px_20px_5px_rgba(255,255,255,0.4)] h-[370px] "
        >
            <Link href={`/admin/park/${element.id}`} className="flex flex-col h-full p-6 ">
                <ul className="flex flex-col justify-center gap-2 mb-6 items-center m-auto">
                    {element.cells.map((string, index) => (
                        <li className="flex  gap-2" key={index}>
                            {string.map((_, index_) => (
                                <div
                                    key={index_}
                                    className="w-7.5 h-7.5 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] bg-black/30 rounded-sm 
                            inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.1)] transition delay-50 duration-300 ease-in-out
                             hover:inset-shadow-[0px_0px_40px_0.1px_rgba(255,255,255,0.1)] hover:-translate-y-0.5"
                                ></div>
                            ))}
                        </li>
                    ))}
                </ul>
                <div className="mt-auto pt-4 border-t-[2px] border-white/20 rounded-lg">
                    <p className="text-white text-2xl font-bold ">
                        {element.name}
                    </p>
                    <p className="text-white text-lg">{element.address}</p>
                </div>
            </Link>
        </li>
    );
};
export default parkCard;
