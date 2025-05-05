import { useEffect } from "react";

import { ParkElements, Statuses } from "@/@types/enums";
import { TopologyType } from "@/@types/topologyType";

type ListSearchType = {
    page: number;
    status: Statuses;
    fetchFunction: Function;
    parkings: (TopologyType & { id: number })[][];
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
                    <ul className={""}>
                        {firstLoadingOrError
                            ? [...Array(8)].map((_, index) => (
                                  <div className="" key={index}>
                                      aboba
                                  </div>
                              ))
                            : parkings.map((element, index) => (
                                  <div className="">aboba1111</div>
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
