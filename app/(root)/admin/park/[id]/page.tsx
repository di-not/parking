"use client";

import { redirect, useParams, useRouter } from "next/navigation";
import useFetch from "@/shared/hooks/useFetch";

import ParkDisplay from "@/shared/components/shared/parkDisplay";
import InfoDisplay from "@/shared/components/shared/infoDisplay";

export default function ParkPage() {
    const params = useParams();

    const id = params?.id as string | undefined;
    const router = useRouter();
    if (!id) redirect("/not-found");

    const { data, loading, error } = useFetch(`parking/${id}`, true);

    if (!data) {
        return <></>;
    }

    const handleBack = () => {
        try {
            router.back();
        } catch (e) {
            router.push("/admin");
        }
    };

    return (
        <div className="container">
            <div className=" my-10 ">
                <button
                    onClick={handleBack}
                    className=" text-white 
                text-[20px] font-medium bg-white/30 w-fit rounded-full h-[50px] shadow-[0px_3px_8px_0px_rgba(0,0,0,0.20)] 
            inset-shadow-[0px_0px_10px_7px_rgba(255,255,255,0.25)] mb-4 px-4"
                >
                    ← Работа с парковками
                </button>
                <div className=" flex justify-center gap-8 ">
                    <ParkDisplay parkData={data} />
                    <InfoDisplay parkData={data} manager={false} />
                </div>
            </div>
        </div>
    );
}
