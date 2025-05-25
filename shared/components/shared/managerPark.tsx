"use client";
import { Statuses } from "@/@types/enums";
import useFetch from "@/shared/hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import ParkDisplay from "./parkDisplay";
import InfoDisplay from "./infoDisplay";
import { SimulateOptionsModal } from "../ui/SimulateOptionsModal";

const ManagerPark: React.FC = () => {
    const { data, loading, error } = useFetch("/parking", true);

    if (!data) return <>ошибка</>;
    const onclickSimulate = () => {};
    return (
        <div className="flex gap-10">
            <div className="container">
                <div className="flex justify-center my-10 gap-8">
                    <ParkDisplay parkData={data[0]} />
                    <div className="">
                        <InfoDisplay parkData={data[0]} manager />
                        <SimulateOptionsModal/>
                    </div>
                </div>
            </div>
        </div>
    );
};
export { ManagerPark };

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
//             <button
//                 onClick={() => {
//                     if (
//                         socketRef.current &&
//                         socketRef.current.readyState === WebSocket.OPEN
//                     )
//                         socketRef.current.send("stop");
//                 }}
//             >
//                 stop
//             </button>
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
