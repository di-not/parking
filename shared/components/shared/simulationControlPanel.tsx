import { useState } from "react";
import { SimulateOptionsModal } from "../ui/SimulateOptionsModal";
import { useRouter } from "next/navigation";

interface simulationControlPanelProps {
    sendMessage: (message: string) => void;
    socket: any;
    toggleTimer: (value:boolean) => void;
}
export const buttonClass = `bg-white/30 text-white font-bold text-xl rounded-full shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] 
            inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] text-center  text-white font-semibold justify-center
            transition delay-50 duration-300 ease-in-out hover:inset-shadow-[0px_0px_25px_3px_rgba(255,255,255,0.55)] 
            hover:shadow-[0px_0px_10px_4px_rgba(255,255,255,0.35)] p-[12px_64px] h-full`;

const SimulationControlPanel: React.FC<simulationControlPanelProps> = ({
    sendMessage,
    socket,
    toggleTimer,
}) => {
    const [isStart, setStart] = useState(false);

    const router = useRouter()

    const closeSocket = () => {
        socket.close();
    };
    return (
        <div className="w-full gap-6 grid grid-cols-4 grid-rows-1 mt-5 justify-center items-center">
            {!isStart && (
                <button
                    onClick={() => {
                        setStart(true);
                        sendMessage("start");
                        toggleTimer(true)
                    }}
                    className={`${buttonClass} col-[1/5] max-w-[400px] m-auto`}
                >
                    Начать симуляцию
                </button>
            )}
            {isStart && (
                <>
                    <button
                        className={buttonClass}
                        onClick={() => {
                            sendMessage("resume");
                            toggleTimer(true);
                        }}
                    >
                        Возобновить
                    </button>
                    <button
                        className={buttonClass}
                        onClick={() => {
                            sendMessage("pause");
                            toggleTimer(false);
                        }}
                    >
                        Пауза
                    </button>
                    <button
                        className={buttonClass}
                        onClick={() => {
                            sendMessage("stop");
                            socket.close();
                            router.push('/manager')
                        }}
                    >
                        Остановить
                    </button>
                    <SimulateOptionsModal onClick={closeSocket} />
                </>
            )}
        </div>
    );
};
export { SimulationControlPanel };
