"use client";
import { Statuses } from "@/@types/enums";
import useFetch from "@/shared/hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import ParkDisplay from "./parkDisplay";
import InfoDisplay from "./infoDisplay";
import { SimulateOptionsModal } from "../ui/SimulateOptionsModal";
import { useActions } from "@/shared/redux/hooks/useActions";

const ManagerPark: React.FC = () => {
    const { data, loading, error } = useFetch("/parking", true);
    const { setInitial } = useActions();

    // useEffect(() => {
    //     if (data) setInitial();
    // }, [data]);

    if (!data) return <>ошибка</>;

    return (
        <div className="flex gap-10">
            <div className="container">
                <div className="flex justify-center my-10 gap-8">
                    <ParkDisplay parkData={data[0]} />
                    <div className="">
                        <InfoDisplay parkData={data[0]} manager />
                        <SimulateOptionsModal topology={data[0]} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export { ManagerPark };
