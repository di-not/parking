export default function calculateCellStyle(
    height: number,
    width: number
): object {
    const maxBlockSizeWithoutPaddingsAndGaps = 820;
    return {
        gridTemplateRows: `repeat(${height},${Math.ceil(
            maxBlockSizeWithoutPaddingsAndGaps / width
        )}px)`,
        gridTemplateColumns: `repeat(${width},${Math.ceil(
            maxBlockSizeWithoutPaddingsAndGaps / width
        )}px)`,
    };
}
