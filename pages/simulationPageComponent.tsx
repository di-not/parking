import roadIcon from "@/public/images/road.svg";
import decorIcon from "@/public/images/decor.svg";
import parkingIcon from "@/public/images/parking.svg";
import exitIcon from "@/public/images/exit.svg";
import barrierIcon from "@/public/images/barrier.svg";
import carIcon from "@/public/images/car.svg";
import Image from "next/image";
import { ParkElements } from "@/@types/enums";
import { useReduxStates } from "@/shared/redux/hooks/useReduxStates";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";

import { CarAnimate } from "@/shared/components/shared/CarAnimate";
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

    const sendMessage = () => {
        if (
            socketRef.current &&
            socketRef.current.readyState === WebSocket.OPEN
        ) {
            socketRef.current.send("start");
        }
    };

    const childRef = useRef<ChildMethods>(null);
    useEffect(() => {
        socketRef.current.onmessage = (event: any) => {
            if (event.data !== "ok") {
                const message = JSON.parse(event.data);

                if (message.event === "arrive") {
                    childRef.current?.createNewObject();
                    socketRef.current.send(`park ${message.car_id}`);
                }
                if (message.event === "park") {
                    let newPark = _.cloneDeep(park);
                    newPark[message.park_x][message.park_y] = ParkElements.C;
                    setPark(newPark);
                }
                if (message.event === "leave") {
                    let newPark = _.cloneDeep(park);
                    newPark[message.park_x][message.park_y] =
                        simulation.parking.cells[message.park_x][
                            message.park_y
                        ];
                    setPark(newPark);
                }
            }
        };
    }, [park]);
    const buttonClass = `bg-white/30  rounded-full shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] 
            inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] text-center text-[16px] text-white font-semibold justify-center
            transition delay-50 duration-300 ease-in-out hover:inset-shadow-[0px_0px_25px_3px_rgba(255,255,255,0.55)] 
            hover:shadow-[0px_0px_10px_4px_rgba(255,255,255,0.35)] w-fit p-[12px_64px] h-full`;
    return (
        <div className="m-auto">
            <div className="">
                <div
                    className={buttonClass}
                    onClick={() => {
                        if (
                            socketRef.current &&
                            socketRef.current.readyState === WebSocket.OPEN
                        )
                            socketRef.current.send("resume");
                    }}
                >
                    {/* <p>{`Места: ${}`}</p> */}
                </div>
            </div>
            <ul
                className="flex gap-2 flex-col shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] bg-black/30 justify-center
                 w-fit p-6 items-center rounded-xl inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.1)]"
            >
                {park.map((cols, indexCols) => (
                    <li className="flex gap-2 " key={indexCols}>
                        {cols.map((element, indexRows) => (
                            <div
                                key={indexRows}
                                className="w-[120px] h-[120px] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] bg-black/30 flex justify-center
                             items-center rounded-xl inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.1)] transition delay-50 duration-300 ease-in-out"
                            >
                                {element === ParkElements.D ? (
                                    <Image
                                        width={70}
                                        height={70}
                                        alt="декор"
                                        src={decorIcon}
                                        className="invert-[100%] brightness-[0%]"
                                    />
                                ) : element === ParkElements.R ? (
                                    <Image
                                        width={70}
                                        height={70}
                                        alt="дорога"
                                        src={roadIcon}
                                        className="invert-[100%] brightness-[0%]"
                                    />
                                ) : element === ParkElements.P ? (
                                    <Image
                                        width={70}
                                        height={70}
                                        alt="дорога"
                                        src={parkingIcon}
                                        className="invert-[100%] brightness-[0%]"
                                    />
                                ) : element === ParkElements.O ? (
                                    <Image
                                        width={70}
                                        height={70}
                                        alt="въезд"
                                        src={exitIcon}
                                        className="invert-[100%] brightness-[0%]"
                                    />
                                ) : element === ParkElements.I ? (
                                    <Image
                                        width={70}
                                        height={70}
                                        alt="выезд"
                                        src={barrierIcon}
                                        className="invert-[100%] brightness-[0%]"
                                    />
                                ) : element === ParkElements.C ? (
                                    <Image
                                        width={70}
                                        height={70}
                                        alt="машина"
                                        src={carIcon}
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
            <div className="w-full gap-6 flex mt-5">
                <button onClick={sendMessage} className={buttonClass}>
                    Начать симуляцию
                </button>
                <button
                    className={buttonClass}
                    onClick={() => {
                        if (
                            socketRef.current &&
                            socketRef.current.readyState === WebSocket.OPEN
                        )
                            socketRef.current.send("stop");
                    }}
                >
                    Остановить
                </button>
                <button
                    className={buttonClass}
                    onClick={() => {
                        if (
                            socketRef.current &&
                            socketRef.current.readyState === WebSocket.OPEN
                        )
                            socketRef.current.send("resume");
                    }}
                >
                    Возобновить
                </button>
            </div>
            <div className=" flex flex-col mt-5 gap-1">
                <CarAnimate ref={childRef} />
            </div>
        </div>
    );
};
export { SimulationPageComponent };

// button onClick={sendMessage}>Send Message</button>
//             <button
//                 onClick={() => {
//                     if (
//                         socketRef.current &&
//                         socketRef.current.readyState === WebSocket.OPEN
//                     )
//                         socketRef.current.send("start");
//                 }}
//             >
//                 start
//             </button>
// <button
//     onClick={() => {
//         if (
//             socketRef.current &&
//             socketRef.current.readyState === WebSocket.OPEN
//         )
//             socketRef.current.send("stop");
//     }}
// >
//     stop
// </button>
//             <button
//                 onClick={() => {
//                     if (
//                         socketRef.current &&
//                         socketRef.current.readyState === WebSocket.OPEN
//                     )
//                         socketRef.current.send("pause");
//                 }}
//             >
//                 pause
//             </button>
//             <button
//                 onClick={() => {
//                     if (
//                         socketRef.current &&
//                         socketRef.current.readyState === WebSocket.OPEN
//                     )
//                         socketRef.current.send("resume");
//                 }}
//             >
//                 resume
//             </button>
