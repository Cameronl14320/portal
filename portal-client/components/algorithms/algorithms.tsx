import { useEffect, useState } from "react";

export enum algorithms {
    DJIKSTRAS = 0,
    A_STAR_SEARCH = 1
};

export enum nodeState {
    UNSELECTED = 0,
    START = 1,
    FINISH = 2,
    SEARCHED = 3,
    PATH = 4
};

export enum runningState {
    WAITING = 0,
    RUNNING = 1
};

export type parameters = {
    width: number;
    height: number;
};

export type state = {
    algorithm: algorithms;
    start: number | undefined;
    end: number | undefined;
    board: nodeState[][];
    running: runningState
};

export default function Algorithms(props: parameters) {
    const initBoard: nodeState[][] = [];
    for (let x = 0; x < props.width; x++) {
        initBoard.push([]);
        for (let y = 0; y < props.height; y++) {
            initBoard[x].push(nodeState.UNSELECTED);
        }
    }

    const [currentState, setCurrentState] = useState<state>({
        algorithm: algorithms.DJIKSTRAS,
        start: undefined,
        end: undefined,
        board: initBoard,
        running: runningState.WAITING
    });

    return (
        <div>
            Hello
        </div>
    )
}