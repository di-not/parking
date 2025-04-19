import { useRef, useState } from "react";
import { useReduxStates } from "@/shared/redux/hooks/useReduxStates";
import { useActions } from "@/shared/redux/hooks/useActions";
import useFocus from "@/shared/hooks/useFocus";
import Image from "next/image";
import clearIcon from '@/public/images/clear_icon.svg'
interface SearchProps {}
const Search: React.FC<SearchProps> = () => {
    const { searchValue } = useReduxStates();
    const { setSearch } = useActions();
    const [curSearchValue, setCurSearchValue] = useState<string>(searchValue.searchValue);

    const inputRef = useRef<HTMLInputElement | null>(null)
    const isFocus = useFocus(inputRef)
    //Функция обработки изменения инпута
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget) {
            const value = event.currentTarget.value;
            setCurSearchValue(value)
        }
    };
    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            event.code === "Enter" &&
            event.target instanceof HTMLInputElement
        ) {
            console.log(curSearchValue)            
            setSearch(curSearchValue)
        }
    };
    
    return (
        <div>
            <input
                onKeyDown={onKeyDown}
                type="text"
                id="search"
                placeholder={!isFocus ? "поиск" : ""}
                className={""}
                value={curSearchValue}
                onChange={onChangeInput}
                ref={inputRef}
            />
            {curSearchValue.length > 0 && (
                <button
                    className={""}
                    onClick={() => {
                        setCurSearchValue("");
                        setSearch("");
                    }}
                >
                    <Image width={20} height={16} src={clearIcon} alt={'удалить'}/>
                </button>
            )}
        </div>
    );
};
export { Search };
