import useFetch from "@/shared/hooks/useFetch";
import { useReduxStates } from "@/shared/redux/hooks/useReduxStates";
import { Roles } from "@/shared/redux/slices/auth.slice";
import Link from "next/link";
import { useEffect, useState } from "react";

interface infoDisplayProps {
    parkData: any;
    manager: boolean;
}
const InfoDisplay: React.FC<infoDisplayProps> = ({ parkData, manager }) => {
    const { role } = useReduxStates();
    const [managerLogin, setManagerLogin] = useState<string>("Загрузка...");

    const { data, loading, error } = useFetch(
        `manager/${parkData.manager?.id}`,
        !manager
    );

    useEffect(() => {
        if (data) setManagerLogin(data.manager_login);
    }, [data]);

    return (
        <div
            className=" mt-0
        rounded-4xl bg-[#000]/20 backdrop-blur-3xl py-5
shadow-[0px_0px_1px_1px_rgba(255,255,255,0.25)] 
inset-shadow-[0px_0px_20px_2px_rgba(255,255,255,0.25)] w-full px-4 h-fit mb-5"
        >
            <div
                className="flex bg-white/30 p-3 px-4 rounded-full 
shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] min-w-[290px]
inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] "
            >
                <h1 className=" text-white font-bold text-xl text-center ">
                    Информация о парковке
                </h1>
            </div>
            <div className="">
                <div className="mt-4 border-b-3 pb-3 border-white/10">
                    <p className="text-white text-lg">Название</p>
                    <p className="text-white text-2xl font-bold">
                        {parkData.name}
                    </p>
                </div>
                <div className="mt-4 border-b-3 pb-3 border-white/10">
                    <p className="text-white text-lg">Адрес</p>
                    <p className="text-white text-2xl font-bold">
                        {parkData.address}
                    </p>
                </div>
                <div className="mt-4 border-b-3 pb-3 border-white/10">
                    <p className="text-white text-lg">Ночной тариф</p>
                    <p className="text-white text-2xl font-bold">
                        {parkData.day_tariff} ед.
                    </p>
                </div>
                <div className="mt-4 border-b-3 pb-3 border-white/10">
                    <p className="text-white text-lg">Ночной тариф</p>
                    <p className="text-white text-2xl font-bold">
                        {parkData.night_tariff} ед.
                    </p>
                </div>
                {!manager && (
                    <div className="mt-4 border-b-3 pb-3 border-white/10">
                        <p className="text-white text-lg">Менеджер</p>
                        <p className="text-white text-2xl font-bold">
                            {managerLogin}
                        </p>
                    </div>
                )}
            </div>
            {role === Roles.ADMIN && (
                <div
                    className="flex bg-white/30 p-3 rounded-full shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] min-w-[290px]
    inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] text-center text-[16px] text-white font-semibold justify-center
    transition delay-50 duration-300 ease-in-out hover:inset-shadow-[0px_0px_25px_3px_rgba(255,255,255,0.55)] hover:shadow-[0px_0px_10px_4px_rgba(255,255,255,0.35)] mt-12"
                >
                    <Link
                        className="text-white text-xl font-bold"
                        href={`/admin/redactor/${parkData.id}`}
                    >
                        Редактировать?
                    </Link>
                </div>
            )}
        </div>
    );
};
export default InfoDisplay;
