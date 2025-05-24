"use client";

import useFetch from "@/shared/hooks/useFetch";

import edit from "@/public/images/edit.svg";
import deleteImage from "@/public/images/deleteImage.svg";

import Image from "next/image";
import $api from "@/http";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ManagerType = {
    manager_id: number;
    manager_login: string;
    manager_email: string;
    manager_url: string;
};
export default function DashboardPage() {
    const { data, loading, error } = useFetch(`manager`, true);
    const router = useRouter();
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
            <div className="flex my-10 gap-4 flex-col">
                <div
                    className="flex gap-5 mb-5  bg-black/30 p-2.5 px-6 rounded-full h-20 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] 
                inset-shadow-[0px_0px_12px_2px_rgba(255,255,255,0.20)] justify-between items-center"
                >
                    <button
                        onClick={handleBack}
                        className=" text-white 
                text-[20px] font-medium bg-white/30 w-[50px] rounded-full h-[50px] shadow-[0px_3px_8px_0px_rgba(0,0,0,0.20)] 
            inset-shadow-[0px_0px_10px_7px_rgba(255,255,255,0.25)] "
                    >
                        ← 
                    </button>
                    <Link
                        href="/admin/create_manager"
                        className="bg-white/30 text-white flex justify-center items-center
                text-[20px] font-medium w-full rounded-full h-[50px] shadow-[0px_3px_8px_0px_rgba(0,0,0,0.20)] 
            inset-shadow-[0px_0px_10px_7px_rgba(255,255,255,0.25)] max-w-[300px]"
                    >
                        Создать менеджера
                    </Link>
                </div>
                <List data={data} />
            </div>
        </div>
    );
}

const List = ({ data }: any) => {
    const [array, setArray] = useState<ManagerType[]>(data ? data : []);
    const onDelete = async (id: number) => {
        const res = await $api.delete(`manager/${id}`);
        setArray(
            array.filter((e, i) => {
                return e.manager_id != id;
            })
        );
    };

    return (
        <ul
            className=" text-white rounded-4xl 
                text-[20px] font-medium bg-black/30 w-full min-h-[700px] h-full shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] 
                inset-shadow-[0px_0px_12px_2px_rgba(255,255,255,0.20)]
                "
        >
            {array.map((element: ManagerType, index: number) => (
                <li
                    key={element.manager_id}
                    className="w-full px-6 border-b-[1px] border-white/30 grid grid-cols-[repeat(2,1fr)_100px] justify-between items-center"
                >
                    <p className="py-8 pl-5">{element.manager_login}</p>
                    <p className="border-l-1 border-white/30 py-8 pl-5">
                        {element.manager_email}
                    </p>
                    <div className="flex gap-5 py-8 border-l-1 border-white/30 pl-5 justify-end">
                        <button
                            className="rounded-full border-white/30 p-1 border-[1px] "
                            onClick={() => {}}
                        >
                            <Image src={edit} width={25} height={25} alt="" />
                        </button>
                        <button
                            className="rounded-full border-white/30 p-1 border-[1px]"
                            onClick={() => onDelete(element.manager_id)}
                        >
                            <Image
                                src={deleteImage}
                                width={25}
                                height={25}
                                alt=""
                            />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};
