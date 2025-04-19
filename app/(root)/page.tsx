"use client";

import { Search } from "@/shared/components/shared/Search";
import Link from "next/link";
import { Children, ReactNode } from "react";

export default function Home() {
    return (
        <div
            className="flex w-full justify-between bg-[#000]/20 backdrop-blur-3xl rounded-4xl p-6 shadow-[0px_0px_1px_1px_rgba(255,255,255,0.25)] 
        inset-shadow-[0px_0px_20px_2px_rgba(255,255,255,0.25)]"
        >
            <LocalLink href={"/create"}>Создать парковку</LocalLink>
            <Search />
            <LocalLink href={"/create_manager"}>Работа с менеджерами</LocalLink>
        </div>
    );
}

const LocalLink: React.FC<{ children: ReactNode; href: string }> = ({
    children,
    href,
}) => {
    return (
        <Link
            href={href}
            className="flex bg-white/30 p-3 rounded-full shadow-[0px_3px_4px_0px_rgba(0,0,0,0.1)] min-w-[290px]
    inset-shadow-[0px_0px_20px_3px_rgba(255,255,255,0.25)] text-center text-[16px] text-white font-semibold justify-center
    transition delay-50 duration-300 ease-in-out hover:inset-shadow-[0px_0px_25px_3px_rgba(255,255,255,0.55)] hover:shadow-[0px_0px_10px_4px_rgba(255,255,255,0.35)]"
        >
            {children}
        </Link>
    );
};
