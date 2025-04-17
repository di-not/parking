"use client";
import { ParkElements } from "@/@types/enums";
import { useEffect, useState } from "react";

interface ParkProps {
    columns: number;
    rows: number;
}

const Park: React.FC<ParkProps> = ({ columns, rows }) => {
    const [cells, setCells] = useState<ParkElements[][]>(
        [...Array(rows)].map((element, index) => {
            return [...Array(columns)].map(() => {
                return ParkElements.R;
            });
        })
    );
    const [active, setActive] = useState<ParkElements>(ParkElements.D);
    return (
        <div className="  bg-[#000]/25 backdrop-blur-3xl rounded-4xl p-6 shadow-[0.1px_0px_2px_0px_rgba(255,255,255,255.25)]">
            <div className="flex gap-5">
                <button
                    className="w-[50px] h-[50px] bg-green-600"
                    onClick={() => {
                        setActive(ParkElements.D);
                    }}
                ></button>
                <button
                    className="w-[50px] h-[50px] bg-gray-500"
                    onClick={() => {
                        setActive(ParkElements.R);
                    }}
                ></button>
                <button
                    className="w-[50px] h-[50px] bg-amber-950"
                    onClick={() => {
                        setActive(ParkElements.P);
                    }}
                ></button>
            </div>
            <div
                style={{
                    gridTemplateColumns: `repeat(${columns},130px)`,
                    gridTemplateRows: `repeat(${rows},130px)`,
                }}
                className={`grid max-w-[1000px] max-h-[1000px] w-full h-full gap-1`}
            >
                {cells.map((element1, index1) =>
                    element1.map((element2, index2) => (
                        <button
                            className="cursor-pointer"
                            style={{
                                backgroundColor: `${
                                    element2 === ParkElements.D
                                        ? "green"
                                        : element2 === ParkElements.R
                                        ? "gray"
                                        : element2 === ParkElements.P
                                        ? "#461901"
                                        : "white"
                                }`,
                            }}
                            key={index2}
                            onClick={() => {
                                const a = cells.map((e) => e);
                                a[index1][index2] = active;
                                setCells(a);
                            }}
                        ></button>
                    ))
                )}
            </div>
        </div>
    );
};
export { Park };
