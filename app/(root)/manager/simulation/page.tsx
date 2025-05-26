"use client";
import { ParkElements, Statuses } from "@/@types/enums";
import { SimulationPageComponent } from "@/pages/simulationPageComponent";
import { useReduxStates } from "@/shared/redux/hooks/useReduxStates";

import { useCallback, useEffect, useRef, useState } from "react";

export default function SimulationPage() {
    const { simulation } = useReduxStates();
    const socketRef = useRef<any>(null);

    const [socketStatus, setSocketStatus] = useState<Statuses>(
        Statuses.LOADING
    );

    const sendInitialMessage = useCallback(() => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            try {
                socketRef.current.send(JSON.stringify(simulation));
            } catch (error) {
                console.error("Error sending initial message:", error);
            }
        }
    }, [simulation]);

    useEffect(() => {
        // Создаем соединение WebSocket
        socketRef.current = new WebSocket("ws://localhost:8000/ws/simulate");

        // Обработчики событий
        socketRef.current.onopen = (e: any) => {
            console.log("WebSocket connected");
            setSocketStatus(Statuses.SUCCESS);
            sendInitialMessage();
        };


        socketRef.current.onerror = (error: any) => {
            console.error("WebSocket error:", error);
            setSocketStatus(Statuses.ERROR);
        };

        socketRef.current.onclose = () => {
            console.log("WebSocket disconnected");
        };
    }, []);

    if (socketStatus === Statuses.LOADING) return <></>;
    if (socketStatus === Statuses.ERROR) return <>ошибка</>;
    return (
        <div className="w-full justify-center items-center flex">
            <div className="container">
                <SimulationPageComponent  socketRef={socketRef} />
            </div>
        </div>
    );
}

