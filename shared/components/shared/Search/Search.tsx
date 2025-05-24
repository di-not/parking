"use client";
import { useRef, useState } from "react";
import { useReduxStates } from "@/shared/redux/hooks/useReduxStates";
import { useActions } from "@/shared/redux/hooks/useActions";
import useFocus from "@/shared/hooks/useFocus";
import Image from "next/image";

import clearIcon from "@/public/images/clear_icon.svg";
import searchIcon from "@/public/images/search_icon.svg";
interface SearchProps {}
const Search: React.FC<SearchProps> = () => {
    const { searchValue } = useReduxStates();
    const { setSearch } = useActions();
    const [curSearchValue, setCurSearchValue] = useState<string>(
        searchValue
    );

    const inputRef = useRef<HTMLInputElement | null>(null);
    const isFocus = useFocus(inputRef);
    //Функция обработки изменения инпута
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget) {
            const value = event.currentTarget.value;
            setCurSearchValue(value);
        }
    };
    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            event.code === "Enter" &&
            event.target instanceof HTMLInputElement
        ) {
            setSearch(curSearchValue);
        }
    };

    return (
        <div className="w-full flex flex-col relative">
            <Image
                width={24}
                height={24}
                src={searchIcon}
                alt={"поиск"}
                className="absolute left-4 top-0 bottom-0 m-[auto_0] invert-[95%] brightness-[1000%] saturate-[0%]"
            />
            <input
                onKeyDown={onKeyDown}
                type="text"
                id="search"
                placeholder={!isFocus ? "Найти парковку..." : ""}
                className={`w-full h-full text-white rounded-full shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] 
                inset-shadow-[0px_0px_12px_2px_rgba(255,255,255,0.20)]
                min-w-[290px] p-2.5 pl-13 pr-20 max-h-[48px] text-[16px] font-medium bg-black/30
                placeholder:text-white/50 text-lg focus:outline-0 focus:outline-transparent outline-offset-0
                focus:inset-shadow-[0px_0px_20px_0px_rgba(255,255,255,0.40)] transition delay-50 duration-300 ease-in-out`}
                value={curSearchValue}
                onChange={onChangeInput}
                ref={inputRef}
            />
            {curSearchValue.length > 0 && (
                <button
                    className={
                        "absolute right-[25px] m-[auto_0] top-0 bottom-0 invert-[100%] brightness-[0%] "
                    }
                    onClick={() => {
                        setCurSearchValue("");
                        setSearch("");
                    }}
                >
                    <Image
                        width={20}
                        height={16}
                        src={clearIcon}
                        alt={"удалить"}
                    />
                </button>
            )}
        </div>
    );
};
export { Search };
