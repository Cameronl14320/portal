import { pair } from "../datatypes";
import { boardState, tileSearchState, tileState } from "./search-types";

export abstract class ISearchAlgorithm {
    private board: tileState[][];
    private start: pair<number> | undefined;
    private finish: pair<number> | undefined;

    constructor (boardState: boardState, private rows: number, private cols: number) {
        this.board = boardState.board;
        this.start = boardState.start;
        this.finish = boardState.finish;
    }

    abstract step(): tileState[][];
}