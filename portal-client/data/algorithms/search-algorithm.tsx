import { pair } from "../datatypes";
import PriorityQueue from "../priority-queue";
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

    // private tileFromPosition (position: pair<number>): tileState {

    // }
}