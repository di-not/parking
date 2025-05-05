import { useEffect, useState } from "react";
import { Ref } from "react-hook-form";

export default function useFocus(ref: React.RefObject<HTMLElement | null> ) {
    const [isFocused, setIsFocused] = useState(false);
    const on = () => {
        setIsFocused(true);
    };
    const off = () => {
        setIsFocused(false);
    };
    useEffect(() => {
        if (!ref.current) {
            return;
        }
        const cur = ref.current;

        cur.addEventListener("focus", on);
        cur.addEventListener("blur", off);
        return function () {
            cur.removeEventListener("focus", on);
            cur.removeEventListener("blur", off);
        };
    }, []);
    return isFocused;
}
