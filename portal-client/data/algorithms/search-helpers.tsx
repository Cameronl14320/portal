import { pair } from "../datatypes";

export function getNeighbors(dimensions: pair<number>, tile: pair<number>): pair<number>[] {
    const allNeighbors: pair<number>[] = [];
    const numRows = dimensions.first;
    const numCols = dimensions.second;
    const tileRow = tile.first;
    const tileCol = tile.second;

    // Get all tiles in a '1' tile radius
    for (let row = -1; row < 2; row++) {
        for (let col = -1; col < 2; col++) {
            allNeighbors.push({
                first: tileRow + row,
                second: tileCol + col
            });
        }
    }

    // Filter out tiles out of bounds, diagonals, or has the same position as the origin
    const neighbors: pair<number>[] = [];
    allNeighbors.forEach(neighbor => {
        let row = neighbor.first;
        let col = neighbor.second;
        if (!(row < 0 || row > numRows - 1 || col < 0 || col > numCols - 1 || (row === tileRow && col === tileCol))) {
            const distance = calculateDistance(tile, neighbor);
            if (distance === 1) {
                neighbors.push(neighbor);
            }
        }
    });
    console.log(neighbors);
    return neighbors;
};

export function calculateDistance (firstTile: pair<number>, secondTile: pair<number>): number {
    return Math.abs(firstTile.first - secondTile.first + firstTile.second - secondTile.second);
}