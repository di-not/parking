"use client";
import $api from "@/http";
import { Header } from "@/shared/components/shared/Header";
import { ListSearch } from "@/shared/components/ui/ListSearch";
import { useActions } from "@/shared/redux/hooks/useActions";
import { useReduxStates } from "@/shared/redux/hooks/useReduxStates";

import { useEffect, useState } from "react";

import { getCookie, setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { Statuses } from "@/@types/enums";
import { redirect } from "next/navigation";
export default function Home() {
    return (
        <div className="w-full">
            <Header />
            <Foo />
        </div>
    );
}

// На клиенте
export function ClientComponent() {}

const Foo = () => {
    const { fetchParkings } = useActions();
    const [page, setPage] = useState(0);

    //Функции стейт менеджера
    const { parkingStatus, parkingArray, searchValue } = useReduxStates();

    
    // useEffect(() => {
    //     setPage(0);
    // }, [search]);

    

    return (
        <div className="container">
            <div
                className="my-4 flex bg-white/30 p-3 px-8 rounded-full 
        shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] min-w-[290px]
    inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)]"
            >
                <p className=" text-white font-semibold text-3xl">
                    Все парковки
                </p>
            </div>
            {searchValue ? (
                <ListSearch
                    page={page}
                    fetchFunction={fetchParkings}
                    search={""}
                    status={parkingStatus}
                    parkings={parkingArray}
                />
            ) : (
                <></>
            )}
            <button
                onClick={() => {
                    setPage(page + 1);
                }}
            >
                sssssssss
            </button>
        </div>
    );
};
