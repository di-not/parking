import { ParkElements } from "@/@types/enums";
import roadIcon from "@/public/images/road.svg";
import decorIcon from "@/public/images/decor.svg";
import parkingIcon from "@/public/images/parking.svg";
import exitIcon from "@/public/images/exit.svg";
import barrierIcon from "@/public/images/barrier.svg";
import carIcon from "@/public/images/car.svg";
import Image from "next/image";
interface parkElenmentComponentProps {
    element: ParkElements;
}
const ParkElenmentComponent: React.FC<parkElenmentComponentProps> = ({
    element,
}) => {
    return (
        <div
            className="w-[120px] h-[120px] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] bg-black/30 flex justify-center
                             items-center rounded-xl inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.1)] transition delay-50 duration-300 ease-in-out"
        >
            {element === ParkElements.D ? (
                <img
                    width={70}
                    height={70}
                    alt="декор"
                    src={decorIcon.src}
                    className="invert-[100%] brightness-[0%]"
                />
            ) : element === ParkElements.R ? (
                <img
                    width={70}
                    height={70}
                    alt="дорога"
                    src={roadIcon.src}
                    className="invert-[100%] brightness-[0%]"
                />
            ) : element === ParkElements.P ? (
                <img
                    width={70}
                    height={70}
                    alt="парковка"
                    src={parkingIcon.src}
                    className="invert-[100%] brightness-[0%]"
                />
            ) : element === ParkElements.O ? (
                <img
                    width={70}
                    height={70}
                    alt="въезд"
                    src={exitIcon.src}
                    className="invert-[100%] brightness-[0%]"
                />
            ) : element === ParkElements.I ? (
                <img
                    width={70}
                    height={70}
                    alt="выезд"
                    src={barrierIcon.src}
                    className="invert-[100%] brightness-[0%]"
                />
            ) : element === ParkElements.C ? (
                <img width={70} height={70} alt="машина" src={carIcon.src} />
            ) : (
                <></>
            )}
        </div>
    );
};
export { ParkElenmentComponent };
