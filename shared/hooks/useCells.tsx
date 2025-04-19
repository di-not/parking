import { ParkElements } from "@/@types/enums";
import { TopologyType } from "@/@types/topologyType";
import { useEffect, useState } from "react";

export default function useCells(
    topology: TopologyType
): [ParkElements[][], (cells: ParkElements[][]) => void] {
    const height = topology.height;
    const width = topology.width;
    const [cells, setCells] = useState<ParkElements[][]>(topology.cells);

    const condition =
        width &&
        height &&
        width >= 4 &&
        height >= 4 &&
        width <= 6 &&
        height <= 6;

    useEffect(() => {
        if (condition) {
            const supportArray = cells.map((row) => [...row]);
            if (cells[0] && width > cells[0].length) {
                for (let k = 0; k < width - cells[0].length; k++) {
                    for (let i = 0; i < supportArray.length; i++) {
                        supportArray[i].push(ParkElements.R);
                    }
                }
                setCells(supportArray);
            } else if (cells[0] && width < cells[0].length) {
                for (let k = 0; k < cells[0].length - width; k++) {
                    for (let i = 0; i < supportArray.length; i++) {
                        supportArray[i].pop();
                    }
                }
                setCells(supportArray);
            } else if (cells.length > 0 && height < cells.length)
                setCells([
                    ...supportArray.slice(
                        0,
                        cells.length - (cells.length - height)
                    ),
                ]);
            else if (cells.length > 0 && height > cells.length)
                setCells([
                    ...cells,
                    ...Array.from({ length: height - cells.length }, () =>
                        Array.from({ length: width }, () => ParkElements.R)
                    ),
                ]);
            else if (
                cells.length &&
                cells[0] &&
                cells.length === Number(height) &&
                cells[0].length === Number(width)
            )
                setCells(cells);
            else
                setCells(
                    Array.from({ length: width }, () =>
                        Array.from({ length: height }, () => ParkElements.R)
                    )
                );
        } else setCells(cells);
    }, [width, height]);
    return [cells, setCells];
}
