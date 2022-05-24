import { pair } from "../../datatypes";
import { SearchAlgorithm } from "../search-algorithm";
import { calculateDistance, getNeighbors } from "../search-helpers";
import { boardState, tileSearchState, tileState } from "../search-types";

export class Djikstras extends SearchAlgorithm {
    // In order to store entire path
    // Each visited tile should store the tile it came from, this way we can map backwards from finsh to start
    public step(): tileState[][] {
        if (this.state !== 'FINISHED') {
            // Init
            if (this.neighbors.size() < 1) {
                this.state = 'RUNNING';
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
                } else {
                    this.state = 'FINISHED';
                }
                this.addNeighbors(current.position);
                nextBoard[current.position.first][current.position.second] = current;
            }
            return nextBoard;
        }
        return this.board;
    }

    protected addNeighbors(addFrom: pair<number>) {
        getNeighbors(this.dimensions, addFrom).forEach(neighbor => {
            const neighborTile = this.board[neighbor.first][neighbor.second];
            const cloneTile = { ...neighborTile };
            if (cloneTile.searchState !== tileSearchState.SEARCHED && cloneTile.searchState !== tileSearchState.START && !this.neighbors.contains(cloneTile.position)) {
                cloneTile.weight = calculateDistance(this.start, neighbor);
                cloneTile.previous = addFrom;
                this.neighbors.push(cloneTile);
            }
        });
    }
}