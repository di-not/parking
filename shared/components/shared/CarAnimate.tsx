import { ChildMethods } from "@/pages/simulationPageComponent";
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import carIcon from "@/public/images/car.svg";
import Image from "next/image";
type MovingObject = {
    id: number;
    left: number;
    opacity: number;
    speed: number;
};
const CarAnimate = forwardRef<ChildMethods>((props, ref) => {
    useImperativeHandle(ref, () => ({
        createNewObject: () => {
            const newObject: MovingObject = {
                id: nextId.current++,
                left: 100, // Начальная позиция (100%)
                opacity: 0, // Начинаем с прозрачности 0
                speed: 0.5 + Math.random() * 0.1, // Случайная скорость
            };

            setObjects((prev) => [...prev, newObject]);

            // Возвращаем ID для возможного удаления
            return newObject.id;
        },
    }));
    const containerRef = useRef<HTMLDivElement>(null);
    const [objects, setObjects] = useState<MovingObject[]>([]);
    const nextId = useRef(0);

    useEffect(() => {
        const animationFrame = requestAnimationFrame(function animate() {
            setObjects((prevObjects) =>
                prevObjects
                    .map((obj) => {
                        // Уменьшаем позицию (движение влево)
                        const newLeft = obj.left - obj.speed;

                        // Плавное появление
                        const newOpacity = Math.min(1, obj.opacity + 0.02);

                        return { ...obj, left: newLeft, opacity: newOpacity };
                    })
                    // Удаляем объекты, которые вышли за пределы
                    .filter((obj) => obj.left > -20)
            );

            requestAnimationFrame(animate);
        });

        return () => cancelAnimationFrame(animationFrame);
    }, []);

    return (
        <>
            <div
                ref={containerRef}
                className="h-[60px] w-full shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] bg-black/30 justify-center
                  p-6 items-center rounded-xl inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.1)] relative overflow-hidden"
            >
                {objects.map((obj) => (
                    <div
                        key={obj.id}
                        className="absolute transition-all duration-100 top-0 bottom-0 m-auto"
                        style={{
                            left: `${obj.left}%`,
                            opacity: obj.opacity,
                            transform: "translateX(-50%)",
                            transition: "left 0.05s linear",
                        }}
                    >
                        <Image
                            src={carIcon}
                            alt="car"
                            width={60}
                            height={60}
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>
            
        </>
    );
});
export { CarAnimate };
