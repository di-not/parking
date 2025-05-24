"use client";

import { redirect, useParams } from "next/navigation";
import useFetch from "@/shared/hooks/useFetch";

import ParkDisplay from "@/shared/components/shared/parkDisplay";
import InfoDisplay from "@/shared/components/shared/infoDisplay";

export default function ParkPage() {
    

    const params = useParams();

    const id = params?.id as string | undefined;

    if (!id) redirect("/not-found");

    const { data, loading, error } = useFetch(`parking/${id}`, true);

    if (!data) {
        return <></>;
    }
    
    return (
        <div className="container">
            <div className="flex justify-center my-10 gap-8">
                <ParkDisplay parkData={data} />
                <InfoDisplay parkData={data} />
                
            </div>
        </div>
    );
}
