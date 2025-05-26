import { ParkElements } from "./enums";

export type TopologyType = {
    name: string;
    address: string;
    width: number;
    height: number;
    day_tariff: number;
    night_tariff: number;
    manager: { id: number };
    cells: ParkElements[][];
};
