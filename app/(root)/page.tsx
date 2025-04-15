"use client";

import Link from "next/link";

export default function Home() {
    return (
        <>
            <Link href={"/create"}>Создать парковку</Link>
        </>
    );
}
