"use client";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";

type PrimarySelectType = {
    formStates: any;
    data: { title: string; value: string}[];
    title: string;
    formValue: string;
};

export const PrimarySelect: React.FC<PrimarySelectType> = ({
    formStates,
    formValue,
    data,
    title,
}) => {
    
    return (
        <Select
            onValueChange={(v) => {
                formStates.setValue(formValue, v.toString());
            }}
            value={formStates.getValues(formValue)}
        >
            <SelectTrigger
                className="flex justify-between font-medium items-center shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] p-[11px] pl-5 pr-6 w-full bg-black/30   
                    inset-shadow-[0px_0px_12px_2px_rgba(255,255,255,0.25)]
                    rounded-full text-white text-[16px] focus:outline-1! outline-[#fff]/30! outline-offset-0! "
            >
                <SelectValue placeholder={title}/>
            </SelectTrigger>
            <SelectContent
                className="bg-[#000]/25 backdrop-blur-3xl rounded-4xl shadow-[1px_0px_1px_0px_rgba(255,255,255,0.25)] 
                    inset-shadow-[0px_0px_4px_0.1px_rgba(255,255,255,0.25)]  w-full z-100"
            >
                <SelectGroup className="p-2 gap-1  w-full">
                    <SelectLabel
                        key="-1"
                        className={" text-[14px] text-white font-bold"}
                    >
                        {title}
                    </SelectLabel>
                    {data.map(
                        (
                            element: { title: string; value: string },
                            index: number
                        ) => (
                            <SelectItem
                                value={`${element.value}`}
                                key={index}
                                className="w-full "
                            >
                                {element.title}
                            </SelectItem>
                        )
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
