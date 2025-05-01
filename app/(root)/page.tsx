"use client";
import { Header } from "@/shared/components/shared/Header";
import { ListSearch } from "@/shared/components/ui/ListSearch";
import { useActions } from "@/shared/redux/hooks/useActions";
import { useReduxStates } from "@/shared/redux/hooks/useReduxStates";
import { useState } from "react";

export default function Home() {
    return (
        <div className="w-full">
            <Header />
            <Foo />
        </div>
    );
}
const Foo = () => {
    const { fetchParkings } = useActions();
    const [page, setPage] = useState(0);

    //Функции стейт менеджера
    const { parkingStatus, parkingArray } = useReduxStates();

    // useEffect(() => {
    //     setPage(0);
    // }, [search]);
    console.log(`aaaa`);
    return (
        <>
            <ListSearch
                page={page}
                fetchFunction={fetchParkings}
                search={""}
                status={parkingStatus}
                parkings={parkingArray}
            />
            <button
                onClick={() => {
                    setPage(page + 1);
                }}
            >
                sssssssss
            </button>
        </>
    );
};
