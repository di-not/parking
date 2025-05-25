import { ParkElements } from "@/@types/enums";
import Image from "next/image";

interface ParkElementButtonType {
    setActive: (active: ParkElements) => void;
    active: ParkElements;
    parkElement: ParkElements;
    src: any;
    alt: string;
}
const ParkElementButton: React.FC<ParkElementButtonType> = ({
    setActive,
    active,
    parkElement,
    src,
    alt,
}) => {
    return (
        <button
            className="w-[50px] h-[50px]"
            onClick={() => setActive(parkElement)}
        >
            <Image
                width={50}
                height={50}
                alt={alt}
                src={src}
                className="invert-[85%]"
                style={active === parkElement ? { filter: "invert(100%)" } : {}}
            />
        </button>
    );
};
export { ParkElementButton };

