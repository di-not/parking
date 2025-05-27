import { CarStatus, ParkElements } from "@/@types/enums";
import { useReduxStates } from "@/shared/redux/hooks/useReduxStates";
import { useEffect, useMemo, useRef, useState } from "react";
import _ from "lodash";
import { CarAnimate } from "@/shared/components/shared/CarAnimate";
import { ParkElenmentComponent } from "@/shared/components/ui/parkElenmentComponent";
import { SimulationControlPanel } from "@/shared/components/shared/simulationControlPanel";
interface simulationPageProps {
    socketRef: any;
}

export type ChildMethods = {
    createNewObject: () => void;
};

const SimulationPageComponent: React.FC<simulationPageProps> = ({
    socketRef,
}) => {
    const { simulation } = useReduxStates();

    const [park, setPark] = useState<ParkElements[][]>(
        simulation.parking.cells
    );
    const [carStatus, setCarStatus] = useState<CarStatus | "">("");
    const [counterPark, setCounterPark] = useState(0);
    const [earned, setEarned] = useState(0);

    const childRef = useRef<ChildMethods>(null);

    useEffect(() => {
        socketRef.current.onmessage = (event: any) => {
            if (event.data !== "ok") {
                const message = JSON.parse(event.data);

                if (message.event === "arrive") {
                    childRef.current?.createNewObject();
                    setTimeout(() => {
                        socketRef.current.send(`park ${message.car_id}`);
                    }, 3500);
                    console.log(`arrive`);
                }
                if (message.event === "park") {
                    let newPark = _.cloneDeep(park);
                    newPark[message.park_x][message.park_y] = ParkElements.C;
                    setCounterPark((prev) => prev + 1);
                    setPark((prev) => {
                        const current = _.cloneDeep(prev);
                        current[message.park_x][message.park_y] =[message.park_x][message.park_y] = ParkElements.C;
                        return current;
                    });
                    setCarStatus(CarStatus.PARK);
                    setTimeout(() => {
                        setCarStatus("");
                    }, 500);
                    console.log(`park`);
                }
                if (message.event === "leave") {
                    setPark((prev) => {
                        const current = _.cloneDeep(prev);
                        current[message.park_x][message.park_y] =
                            simulation.parking.cells[message.park_x][
                                message.park_y
                            ];
                        return current;
                    });
                    setCounterPark((prev) => prev - 1);
                    setEarned(message.price + earned);
                    console.log(`leave`);
                }
                if (message.event === "drove-away") {
                    setCarStatus(CarStatus.DROVEAWAY);
                    setTimeout(() => {
                        setCarStatus("");
                    }, 500);
                    console.log(`drove-away`);
                }
            }
        };
    }, [park, counterPark, earned, carStatus]);

    const countOfParks = useMemo(() => {
        return simulation.parking.cells
            .flat()
            .filter((el) => el === ParkElements.P).length;
    }, []); // Пустой массив зависимостей

    const sendWSMessage = (message: string) => {
        if (socketRef.current?.readyState === WebSocket.OPEN)
            socketRef.current.send(message);
    };

    return (
        <div className="m-auto">
            <div className="mb-5 flex gap-5">
                <div
                    className={`bg-white/30  rounded-full shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] 
            inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] text-center text-[16px] text-white font-semibold justify-center p-[12px_64px] h-full`}
                >
                    <p>{`Места: ${counterPark} / ${countOfParks}`}</p>
                </div>
                <div
                    className={`bg-white/30  rounded-full shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] 
            inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] text-center text-[16px] text-white font-semibold justify-center p-[12px_64px] h-full`}
                >
                    <p>{`Зарaботано: ${earned.toFixed(2)}`}</p>
                </div>
            </div>
            <ul
                className="flex gap-2 flex-col shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] bg-black/30 justify-center
                 w-fit p-6 items-center rounded-xl inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.1)]"
            >
                {park.map((cols, indexCols) => (
                    <li className="flex gap-2 " key={indexCols}>
                        {cols.map((element, indexRows) => (
                            <ParkElenmentComponent
                                key={indexRows}
                                element={element}
                            />
                        ))}
                    </li>
                ))}
            </ul>
            <SimulationControlPanel
                sendMessage={sendWSMessage}
                socket={socketRef.current}
            />
            <div className="flex flex-col mt-5 gap-1 relative">
                <CarAnimate ref={childRef} />
                <div className="text absolute text-xl text-white bottom-[-30px]">
                    {carStatus === CarStatus.DROVEAWAY ? (
                        <>мимо</>
                    ) : carStatus === CarStatus.PARK ? (
                        <>запарковался</>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};
export { SimulationPageComponent };
