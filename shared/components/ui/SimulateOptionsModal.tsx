"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArrivalConfig } from "../shared/ArrivalConfig";
import { useState } from "react";
import { TimeConfig } from "../shared/timeConfig";
import { useActions } from "@/shared/redux/hooks/useActions";
import { TopologyType } from "@/@types/topologyType";
import { usePathname, useRouter } from "next/navigation";
import { useReduxStates } from "@/shared/redux/hooks/useReduxStates";
import { Primaryinput } from "./Primaryinput";

export type SimulateForm = {
    arrival_config: {
        traficType?: "random" | "determind"; //
        type: "exponential" | "normal" | "uniform" | "discrete"; //
        lambda?: number; // необязательное, только для type="exponential", от 0.1 до 1
        mean?: number; // необязательное, только для type="normal", от 2 до 15
        std_dev?: number; // необязательное, только для type="normal", от 0.1 до 15
        min_delay?: number; // необязательное, только для type="uniform", от 2 до 15
        max_delay?: number; // необязательное, только для type="uniform", от 2 до 15
        discrete_time?: number; // необязательное, только для type="discrete" //
        parking_prob: number; // обязательное поле, от 0 до 1
    };
    parking_time_config: {
        parkingType?: "random" | "determind";
        type: "exponential" | "normal" | "uniform" | "discrete";
        lambda?: number; // необязательное, только для type="exponential", от 0.1 до 1
        mean?: number; // необязательное, только для type="normal", от 2 до 15
        std_dev?: number; // необязательное, только для type="normal", от 0.1 до 15
        min_delay?: number; // необязательное, только для type="uniform", от 2 до 15
        max_delay?: number; // необязательное, только для type="uniform", от 2 до 15
        discrete_time?: number; // необязательное, только для type="discrete"
    };
    start_time: number; // обязательное поле, Unix timestamp
    time: {
        date: any;
        time: any;
    };
};

const SimulateOptionsModal: React.FC<{
    onClick?: () => void;
    topology?: TopologyType;
}> = ({ topology, onClick }) => {
    const targetPath = "/manager/simulation";

    const router = useRouter();
    const pathname = usePathname();

    const { setSimulationConfig, setSimulationTopology } = useActions();
    const { simulation } = useReduxStates();

    const simulationForm = useForm<SimulateForm>({
        defaultValues: simulation,
    });

    const onSubmit: SubmitHandler<SimulateForm> = async (data) => {
        const configData = data;
        if (configData.arrival_config.traficType === "determind") {
            configData.arrival_config.type = "discrete";
        }
        if (configData.parking_time_config.parkingType === "determind") {
            configData.parking_time_config.type = "discrete";
        }
        console.log(data);

        delete configData.arrival_config.traficType;
        delete configData.parking_time_config.parkingType;

        const dateTimeString = `${data.time.date}T${data.time.time}`;
        const timestamp = Math.floor(new Date(dateTimeString).getTime() / 1000);
        
        configData.start_time = timestamp;
        setSimulationConfig(configData);
        if (pathname === targetPath) {
            // Если URL совпадает, принудительно перезагружаем страницу
            window.location.reload();
        } else {
            // Если не совпадает, делаем редирект
            router.replace(targetPath);
        }
    };

    const [type, setType] = useState<"arrival" | "time">("arrival");

    return (
        <Dialog>
            <DialogTrigger
                onClick={() => {
                    topology && setSimulationTopology(topology);
                    onClick && onClick();
                }}
                className="block bg-white/30 p-3 px-4 rounded-full 
shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] min-w-[290px] 
inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] text-white font-bold text-xl text-center items-center w-full "
            >
                {topology ? "Симулировать" : "Редактировать"}
            </DialogTrigger>
            <DialogContent
                className="min-w-[800px] min-h-2/3  bg-[#000]/0  rounded-4xl backdrop-blur-3xl
                    shadow-[0px_0px_1px_1px_rgba(255,255,255,0.25)] transition delay-50 duration-300 ease-in-out
                inset-shadow-[0px_0px_20px_2px_rgba(255,255,255,0.25)] border-0"
            >
                <DialogHeader>
                    <DialogTitle className="text-center text-[30px] text-white font-bold mb-10">
                        Окно моделирования
                    </DialogTitle>
                    <div className="w-full mb-2 flex justify-evenly">
                        <button
                            onClick={() => {
                                setType("time");
                            }}
                            className={
                                type === "arrival"
                                    ? `mt-0
        rounded-4xl bg-[#000]/20 backdrop-blur-3xl py-3 font-bold
shadow-[0px_0px_1px_1px_rgba(255,255,255,0.25)] px-4 text-white
inset-shadow-[0px_0px_20px_2px_rgba(255,255,255,0.25)] min-w-[290px]`
                                    : `text-white font-bold bg-white/30 p-3 px-4 rounded-full 
shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] min-w-[290px]
inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] `
                            }
                        >
                            Тип времени
                        </button>
                        <button
                            onClick={() => {
                                setType("arrival");
                            }}
                            className={
                                type === "time"
                                    ? `mt-0
        rounded-4xl bg-[#000]/20 backdrop-blur-3xl py-3 text-white
shadow-[0px_0px_1px_1px_rgba(255,255,255,0.25)] px-4 font-bold
inset-shadow-[0px_0px_20px_2px_rgba(255,255,255,0.25)] min-w-[290px]`
                                    : `text-white font-bold bg-white/30 p-3 px-4 rounded-full 
shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] min-w-[290px]
inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] `
                            }
                        >
                            Тип потока
                        </button>
                    </div>
                    <form
                        onSubmit={simulationForm.handleSubmit(onSubmit)}
                        className="h-full flex flex-col gap-3"
                    >
                        {type === "arrival" ? (
                            <ArrivalConfig formStates={simulationForm} />
                        ) : (
                            <TimeConfig formStates={simulationForm} />
                        )}
                        <Primaryinput
                            register={simulationForm.register("time.date", {
                                required: true,
                            })}
                            placeholder="Дисперсия"
                            type="date"
                        />
                        <Primaryinput
                            register={simulationForm.register("time.time", {
                                required: true,
                            })}
                            placeholder="Дисперсия"
                            type="time"
                        />
                        <button
                            type="submit"
                            className="text-white font-bold 
                            bg-white/30 p-3 px-4 rounded-full 
shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] min-w-[290px]
inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] mt-auto"
                        >
                            Применить
                        </button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
export { SimulateOptionsModal };
