import { pair } from "../../datatypes";
import { getNeighbors } from "../search-helpers";
import { boardState, tileState } from "../search-types";

export class Djikstras {
    private board: tileState[][];
    private start: pair<number> | undefined;
    private finish: pair<number> | undefined;

    constructor (boardState: boardState, private rows: number, private cols: number) {
        this.board = boardState.board;
        this.start = boardState.start;
        this.finish = boardState.finish;

        if (this.start) {
            getNeighbors({first:rows, second:cols}, this.start);
        }
    }

    public step (): tileState[][] {
        const tempBoard = this.board.slice();
        return [];
    }
}