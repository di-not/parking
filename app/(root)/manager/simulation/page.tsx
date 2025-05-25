'use client'
import { Statuses } from "@/@types/enums";
import { useEffect, useRef, useState } from "react";


export default function SimulationPage() {
    const socketRef = useRef<any>(null);
    const [socketStatus, setSocketStatus] = useState<Statuses>(
        Statuses.LOADING
    );

    useEffect(() => {
        // Создаем соединение WebSocket
        socketRef.current = new WebSocket("ws://localhost:8000/ws/simulate");

        // Обработчики событий
        socketRef.current.onopen = (e: any) => {
            console.log("WebSocket connected");
            setSocketStatus(Statuses.SUCCESS);
        };

        socketRef.current.onmessage = (event: any) => {
            if (event.data !== "ok") {
                const message = JSON.parse(event.data);
                console.log("Message from server:", message);
                if (message.event === "arrive") {
                    console.log(message.car_id);

                    socketRef.current.send(`park ${message.car_id}`);
                }
            }
        };

        socketRef.current.onerror = (error: any) => {
            console.error("WebSocket error:", error);
            setSocketStatus(Statuses.ERROR);
        };

        socketRef.current.onclose = () => {
            console.log("WebSocket disconnected");
        };
    }, []);

    const sendMessage = () => {
        if (
            socketRef.current &&
            socketRef.current.readyState === WebSocket.OPEN
        ) {
            socketRef.current
                .send
                //...
                ();
        }
    };
    if (socketStatus === Statuses.LOADING) return <></>;
    if (socketStatus === Statuses.ERROR) return <>ошибка</>;
    return (
        <div className="w-full">
          
        </div>
    );
}
