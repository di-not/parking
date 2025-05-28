export type PrimaryinputType = {
    register: any;
    type?: "number" | "text"| "time"| "date";
    placeholder?: string;
    step?: number;
};
const Primaryinput: React.FC<PrimaryinputType> = ({
    register,
    placeholder,
    type,
    step,
}) => {
    return (
        <div>
            <input
                step={`${step}`}
                {...register}
                type={type ? type : "text"}
                className="text-white shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] 
                inset-shadow-[0px_0px_12px_2px_rgba(255,255,255,0.25)] p-2.5 pl-5 pr-14 w-full text-[16px] font-medium bg-black/30 rounded-full 
                placeholder:text-white/50 text-lg focus:outline-1 outline-[#fff]/30 outline-offset-0 
                "
                placeholder={placeholder ? placeholder : ""}
            />
        </div>
    );
};
export { Primaryinput };
