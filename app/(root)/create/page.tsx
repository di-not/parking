"use client";
import { useEffect, useState } from "react";

enum elements {
    D = "decoration",
    R = "road",
    P = "park",
}

export default function Create() {
    const columns = 5;
    const rows = 5;
    const [cells, setCells] = useState<elements[][]>(
        [...Array(rows)].map((element, index) => {
            return [...Array(columns)].map(() => {
                return elements.R;
            });
        })
    );
    const [active, setActive] = useState<elements>(elements.D);
    return (
        <>
            <div className="flex gap-5">
                <button
                    className="w-[50px] h-[50px] bg-green-600"
                    onClick={() => {
                        setActive(elements.D);
                    }}
                ></button>
                <button
                    className="w-[50px] h-[50px] bg-gray-500"
                    onClick={() => {
                        setActive(elements.R);
                    }}
                ></button>
                <button
                    className="w-[50px] h-[50px] bg-amber-950"
                    onClick={() => {
                        setActive(elements.P);
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
                                    element2 === elements.D
                                        ? "green"
                                        : element2 === elements.R
                                        ? "gray"
                                        : element2 === elements.P
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
        </>
    );
}
