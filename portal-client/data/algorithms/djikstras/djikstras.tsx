import { pair } from "../../datatypes";
import { SearchAlgorithm } from "../search-algorithm";
import { calculateDistance, getNeighbors } from "../search-helpers";
import { boardState, tileSearchState, tileState } from "../search-types";

export class Djikstras extends SearchAlgorithm {
    // In order to store entire path
    // Each visited tile should store the tile it came from, this way we can map backwards from finsh to start
    step(): tileState[][] {
        // Init
        if (this.neighbors.size() < 1) {
            getNeighbors(this.dimensions, this.start).forEach(neighbor => {
                const neighborTile = this.board[neighbor.first][neighbor.second];
                if (neighborTile.searchState !== tileSearchState.SEARCHED) {
                    neighborTile.weight = calculateDistance(this.start, neighbor);
                    neighborTile.previous = this.start;
                    this.neighbors.push(this.board[neighbor.first][neighbor.second]);
                }
            });
        }
        // Search
        // Check if finish is within neighbors
        console.log(this);
        return [];
    }
}