'use client'
import { ListSearch } from "@/shared/components/ui/ListSearch";
import { useActions } from "@/shared/redux/hooks/useActions";
import { useReduxStates } from "@/shared/redux/hooks/useReduxStates";
import { useState } from "react";

const IndexPage: React.FC= () => {
    const { fetchParkings } = useActions();

    // Функции стейт менеджера
    const { parkingStatus, parkingArray, searchValue } = useReduxStates();

    // useEffect(() => {
    //     setPage(0);
    // }, [search]);
    console.log(parkingArray)
    return (
        <div className="container">
            <div
                className="my-4 flex bg-white/30 p-3 px-8 rounded-full 
        shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] min-w-[290px]
    inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] mb-7"
            >
                <p className=" text-white font-semibold text-3xl ">
                    Все парковки
                </p>
            </div>
            {searchValue ? (
                <ListSearch
                    fetchFunction={fetchParkings}
                    search={""}
                    status={parkingStatus}
                    parkings={parkingArray}
                />
            ) : (
                <></>
            )}
        </div>
    );
};
export default IndexPage;
