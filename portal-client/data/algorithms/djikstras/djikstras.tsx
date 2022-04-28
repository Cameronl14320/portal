import { pair } from "../../datatypes";
import { SearchAlgorithm } from "../search-algorithm";
import { calculateDistance, getNeighbors } from "../search-helpers";
import { boardState, tileSearchState, tileState } from "../search-types";

export class Djikstras extends SearchAlgorithm {
    // In order to store entire path
    // Each visited tile should store the tile it came from, this way we can map backwards from finsh to start
    public step(): tileState[][] {
        // Init
        if (this.neighbors.size() < 1) {
            this.addNeighbors(this.start);
        }
        // Search
        const next = this.neighbors.pop();
        const nextBoard = this.board.slice();
        if (next) {
            const current = {
                ...next,
            };
            if (current.searchState !== tileSearchState.FINISH) {
                current.searchState = tileSearchState.SEARCHED
            }
            this.addNeighbors(current.position);
            nextBoard[current.position.first][current.position.second] = current;
        }
        console.log(this);
        return nextBoard;
    }
}