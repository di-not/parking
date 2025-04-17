import { Info } from "@/shared/components/shared/Info";
import { Park } from "@/shared/components/shared/Park";

export default function Create() {
    return (
        <div className="flex gap-10">
            <Park columns={7} rows={4} />
            <Info/>
        </div>
    );
}
