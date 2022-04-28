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

    protected abstract addNeighbors(addFrom: pair<number>): void;

    public findPath(board: tileState[][]): tileState[][] {
        const state = board.slice();
        let backtrack = state[this.finish.first][this.finish.second];
        while (backtrack.previous) {
            backtrack = state[backtrack.previous.first][backtrack.previous.second];
            const position = backtrack.position;
            if (!(position.first == this.start.first && position.second == this.start.second)) {
                state[backtrack.position.first][backtrack.position.second].searchState = tileSearchState.PATH;
            }
        }
        return state;
    }
    // private tileFromPosition (position: pair<number>): tileState {

    // }
}