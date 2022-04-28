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

    public findPath(board: tileState[][]): tileState[][] {
        const state = board.slice();
        let backtrack = state[this.finish.first][this.finish.second];
        console.log('finish', backtrack);
        console.log('start', this.start);
        while (backtrack.previous) {
            backtrack = state[backtrack.previous.first][backtrack.previous.second];
            const position = backtrack.position;
            console.log('backtrack', position);
            console.log('start', this.start);
            console.log(position.first);
            console.log(this.start.first);
            console.log(position.second);
            console.log(this.start.second);
            if (!(position.first == this.start.first && position.second == this.start.second)) {
                console.log('correction happens here');
                state[backtrack.position.first][backtrack.position.second].searchState = tileSearchState.PATH;
            }
        }
        console.log(state);
        return state;
    }
    // private tileFromPosition (position: pair<number>): tileState {

    // }
}