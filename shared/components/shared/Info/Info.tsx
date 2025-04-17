import { InformationForm } from "../../ui/InformationForm";
interface InfoProps {}
const Info: React.FC<InfoProps> = () => {
    
    return (
        <div className="w-[360px] bg-[#000]/25 backdrop-blur-3xl rounded-4xl p-6 shadow-[0.1px_0px_2px_0px_rgba(255,255,255,255.25)]">
            <h3 className="text-white text-xl font-semibold">Справочная информация</h3>
            <InformationForm/>
        </div>
    );
};
export { Info };
