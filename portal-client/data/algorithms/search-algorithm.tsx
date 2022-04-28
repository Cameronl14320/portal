import { pair } from "../datatypes";
import PriorityQueue from "../priority-queue";
import { calculateDistance, getNeighbors } from "./search-helpers";
import { boardState, tileSearchState, tileState } from "./search-types";

export abstract class SearchAlgorithm {
    protected board: tileState[][];
    protected start: pair<number>;
    protected finish: pair<number>;
    protected neighbors: PriorityQueue;

    constructor (boardState: boardState, protected dimensions: pair<number>) {
        this.board = boardState.board;
        this.start = boardState.start;
        this.finish = boardState.finish;
        this.neighbors = new PriorityQueue();
    }

    abstract step(): tileState[][];

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
    // private tileFromPosition (position: pair<number>): tileState {

    // }
}