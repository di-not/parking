import { Info } from "@/shared/components/shared/Info";
import { Park } from "@/shared/components/shared/Park";

export default function Create() {
    return (
        <div className="container">
            <div className="flex gap-10 my-10">
                <Park />
                <Info />
            </div>
        </div>
    );
}
