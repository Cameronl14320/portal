import { pair } from "../datatypes";

export enum algorithms {
    DJIKSTRAS = 0,
    A_STAR_SEARCH = 1
};

export type boardState = {
    start: pair<number>;
    finish: pair<number>,
    board: tileState[][]
}

export enum tileSearchState {
    UNSELECTED = 0,
    START = 1,
    FINISH = 2,
    SEARCHED = 3,
    PATH = 4
};

export type tileState = {
    searchState: tileSearchState;
    position: pair<number>;
    weight: number;
    previous: pair<number> | undefined;
}