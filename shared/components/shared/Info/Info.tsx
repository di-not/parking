import { InformationForm } from "../../ui/InformationForm";
interface InfoProps {}
const Info: React.FC<InfoProps> = () => {
    return (
        <div
            className="w-[360px] h-fit bg-[#000]/20 backdrop-blur-3xl rounded-4xl p-6 
        shadow-[0px_0px_1px_1px_rgba(255,255,255,0.25)] 
        inset-shadow-[0px_0px_20px_2px_rgba(255,255,255,0.25)] top-[20px] sticky"
        >
            <h3 className="text-white text-xl font-semibold">
                Справочная информация
            </h3>
            <InformationForm />
        </div>
    );
};
export { Info };
