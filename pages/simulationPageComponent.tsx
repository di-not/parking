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

    const [parkingSpots, setParkingSpots] = useState<
        {
            number: string;
            ariveTime: string;
            parkingTime: string;
            cost: string;
        }[]
    >([]);
    const [earned, setEarned] = useState(0);

    const childRef = useRef<ChildMethods>(null);

  const [displayTime, setDisplayTime] = useState<number>(simulation.start_time);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Форматируем Unix-время в "HH:MM"
  const formatTime = (unixTime: number): string => {
    const date = new Date(unixTime * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Логика ускоренного времени
  useEffect(() => {
    if (isRunning) {
      // +1 минута каждую секунду
      timerRef.current = setInterval(() => {
        setDisplayTime(prev => prev + 60);
      }, 1000);

      // +1 час каждую минуту (опционально, если нужно ускорение)
      const hourTimer = setInterval(() => {
        setDisplayTime(prev => prev );
      }, 60000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
        clearInterval(hourTimer);
      };
    }
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setDisplayTime(simulation.start_time);
  };

    const arrayOfParkingNumbers = useMemo(() => {
        const result = [];
        let counter = 0;
        const matrix = simulation.parking.cells;
        // Проходим по каждой строке (y)
        for (let y = 0; y < matrix.length; y++) {
            // Проходим по каждому элементу в строке (x)
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] === "P") {
                    result.push({
                        number: counter.toString(),
                        coordinates: {
                            x: x.toString(),
                            y: y.toString(),
                        },
                    });
                    counter++;
                }
            }
        }
        return result;
    }, []); // Пустой массив зависимостей
    useEffect(() => {
        socketRef.current.onmessage = (event: any) => {
            if (event.data !== "ok") {
                const message = JSON.parse(event.data);

                if (message.event === "arrive") {
                    childRef.current?.createNewObject();
                    setTimeout(() => {
                        socketRef.current.send(`park ${message.car_id}`);
                    }, 3500);
                }
                if (message.event === "park") {
                    setCounterPark((prev) => prev + 1);
                    setPark((prev) => {
                        const current = _.cloneDeep(prev);
                        current[message.park_x][message.park_y] = [
                            message.park_x,
                        ][message.park_y] = ParkElements.C;
                        return current;
                    });
                    setCarStatus(CarStatus.PARK);
                    setTimeout(() => {
                        setCarStatus("");
                    }, 500);
                    setParkingSpots((prev) => {
                        let spot = _.cloneDeep(prev);
                        const date = new Date(message.timestamp * 1000);
                        const hours = date.getHours();
                        const minutes = date.getMinutes();
                        const number = arrayOfParkingNumbers.find(
                            (ellement) => {
                                return (
                                    ellement.coordinates.y ===
                                        message.park_x.toString() &&
                                    ellement.coordinates.x ===
                                        message.park_y.toString()
                                );
                            }
                        )?.number;
                        const index = spot.findIndex((element) => {
                            return element.number === number;
                        });

                        if (index !== -1) {
                            spot[index] = {
                                number: number ? number : "0",
                                ariveTime: `${hours
                                    .toString()
                                    .padStart(2, "0")}:${minutes
                                    .toString()
                                    .padStart(2, "0")}`,
                                parkingTime: "",
                                cost: "",
                            };
                        } else {
                            spot.push({
                                number: number ? number : "0",
                                ariveTime: `${hours
                                    .toString()
                                    .padStart(2, "0")}:${minutes
                                    .toString()
                                    .padStart(2, "0")}`,
                                parkingTime: "",
                                cost: "",
                            });
                        }

                        return spot;
                    });
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
                    setParkingSpots((prev) => {
                        let spot = _.cloneDeep(prev);
                        const date = new Date(message.timestamp * 1000);
                        const hours = date.getHours();
                        const minutes = date.getMinutes();
                        const number = arrayOfParkingNumbers.find(
                            (ellement) => {
                                return (
                                    ellement.coordinates.y ===
                                        message.park_x.toString() &&
                                    ellement.coordinates.x ===
                                        message.park_y.toString()
                                );
                            }
                        )?.number;
                        const index = spot.findIndex((element) => {
                            return element.number === number;
                        });

                        spot[index] = {
                            number: prev[index].number,
                            ariveTime: prev[index].ariveTime,
                            parkingTime: `${hours
                                .toString()
                                .padStart(2, "0")}:${minutes
                                .toString()
                                .padStart(2, "0")}`,
                            cost: message.price.toFixed(2),
                        };
                        return spot;
                    });
                }
                if (message.event === "drove-away") {
                    setCarStatus(CarStatus.DROVEAWAY);
                    setTimeout(() => {
                        setCarStatus("");
                    }, 500);
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
        <div className="m-auto relative ">
            <div className="mb-5 flex gap-5 relative ">
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
                    <p>{`Время: ${formatTime(displayTime)}`}</p>
                </div>
            </div>
            <div className="flex gap-5">
                <ul
                    className="flex gap-2 flex-col shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] bg-black/30 justify-center
                 w-fit p-6 items-center rounded-xl inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.1)] "
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
                <div
                    className="flex gap-2 flex-col shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] bg-black/30 justify-center
                 items-center rounded-xl inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.1)] w-full text-center relative  pb-18 h-[600px] "
                >
                    <div
                        className="mb-auto grid-cols-4 grid justify-center items-center text-white text-lg px-6 p-2 gap-4 mx-2
                    bg-white/30  rounded-full shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] mt-4 leading-[1.4rem] mr-8 
            inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)]"
                    >
                        <p>Номер места</p>
                        <p>Время заезда</p>
                        <p>Время стоянки</p>
                        <p>Стоимость</p>
                    </div>
                    <div className="flex flex-col h-full w-full px-6 gap-2 overflow-y-scroll max-h-[550px] pb-18  ">
                        {parkingSpots.map((element, index) => (
                            <div className="flex gap-2" key={index}>
                                {/* {[...Array(4)].map((el: any, index) => ( */}
                                <div
                                    className="shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] bg-black/30 justify-center
                 items-center rounded-xl inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.1)] max-h-[100px] max-w-[100px] h-full w-full aspect-square text-white text-xl font-medium flex"
                                >
                                    {element.number}
                                </div>
                                <div
                                    className="shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] bg-black/30 justify-center
                 items-center rounded-xl inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.1)] max-h-[100px] max-w-[100px] h-full w-full aspect-square text-white text-xl font-medium flex"
                                >
                                    {element.ariveTime}
                                </div>
                                <div
                                    className="shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] bg-black/30 justify-center
                 items-center rounded-xl inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.1)] max-h-[100px] max-w-[100px] h-full w-full aspect-square text-white text-xl font-medium flex"
                                >
                                    {element.parkingTime}
                                </div>
                                <div
                                    className="shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] bg-black/30 justify-center
                 items-center rounded-xl inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.1)] max-h-[100px] max-w-[100px] h-full w-full aspect-square text-white text-xl font-medium flex"
                                >
                                    {element.cost}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        className="w-full h-[60px] absolute bottom-[-3px] bg-white/30  rounded-b-xl shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] mx-4
            inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] flex  pl-4 pt-2
                 "
                    >
                        <p className=" text-white text-4xl font-extrabold ">{`Итого: ${earned.toFixed(
                            2
                        )}`}</p>
                    </div>
                </div>
            </div>

            <SimulationControlPanel
                sendMessage={sendWSMessage}
                socket={socketRef.current}
                toggleTimer={toggleTimer}
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
