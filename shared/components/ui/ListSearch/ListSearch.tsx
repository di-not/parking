"use client";
import { useEffect } from "react";

import { ParkElements, Statuses } from "@/@types/enums";
import { TopologyType } from "@/@types/topologyType";
import ParkCard from "../parkCard";

type ListSearchType = {
    page: number;
    status: Statuses;
    fetchFunction: Function;
    parkings: (TopologyType & { id: number })[];
    search: string;
};

const ListSearch: React.FC<ListSearchType> = ({
    page,
    status,
    fetchFunction,
    parkings,
    search,
}) => {
    useEffect(() => {
        fetchFunction({
            page,
            search,
        });
    }, [page]);

    const successAndEmpty =
        parkings && parkings.length === 0 && status === Statuses.SUCCESS;
    const firstLoadingOrError =
        (status === Statuses.LOADING || status === Statuses.ERROR) &&
        page === 0;

    return (
        <>
            {!successAndEmpty ? (
                <>
                    <ul className="grid grid-cols-[repeat(4_,1fr)] justify-between gap-x-8 gap-y-6">
                        {firstLoadingOrError
                            ? [...Array(8)].map((_, index) => (
                                  <li className="" key={index}>
                                      aboba
                                  </li>
                              ))
                            : parkings.map((element, _) => (
                                  <ParkCard element={element} key={element.id}/>
                              ))}
                    </ul>
                    {status === Statuses.LOADING && <div className={""}></div>}
                </>
            ) : (
                <div className={"styles.empty_block"}>
                    {/* <Empty /> */}
                    <p className={""}>Ничего не найдено...</p>
                </div>
            )}
        </>
    );
};
export { ListSearch };
