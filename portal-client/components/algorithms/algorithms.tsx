import { useEffect, useState } from "react";

export enum algorithms {
    DJIKSTRAS = 0,
    A_STAR_SEARCH = 1
};

export enum tile {
    UNSELECTED = 0,
    START = 1,
    FINISH = 2,
    SEARCHED = 3,
    PATH = 4
};

export enum runningState {
    WAITING = 0,
    RUNNING = 1,
    FINISHED = 2
};

export type parameters = {
    width: number;
    height: number;
};

export type state = {
    algorithm: algorithms;
    running: runningState
};

export type boardState = {
    start: pair | undefined;
    end: pair | undefined,
    board: tile[][]
}

export type pair = {
    first: number,
    second: number
}

function generateBoard(width: number, height: number): tile[][] {
    const board: tile[][] = [];
    for (let x = 0; x < width; x++) {
        board.push([]);
        for (let y = 0; y < height; y++) {
            board[x].push(tile.UNSELECTED);
        }
    }

    return board;
}

export default function Algorithms(props: parameters) {
    const {width, height} = props;
    const [currentState, setCurrentState] = useState<state | undefined>(undefined);
    const [currentBoardState, setCurrentBoard] = useState<boardState | undefined>(undefined);
    const [displayBoard, setDisplayBoard] = useState<any[][] | null>(null);

    useEffect(() => {
        setCurrentState({
            algorithm: algorithms.DJIKSTRAS,
            running: runningState.WAITING
        });
        setCurrentBoard({
            start: undefined,
            end: undefined,
            board: generateBoard(width, height)
        });
    }, [])

    useEffect(() => {
        const tempDisplay: any[][] = [];
        if (currentBoardState?.board) {
            const currentBoard = currentBoardState.board;
            currentBoard.forEach((row, rowIndex) => {
                tempDisplay.push([]);
                row.forEach((col, colIndex) => {
                    tempDisplay[rowIndex].push(
                        <div key={'algorithms-board-' + rowIndex + '-' + colIndex} style={{color: 'white'}}>
                            {rowIndex},{colIndex}|
                        </div>
                    )
                })
            });
            const display: any[] = [];
            tempDisplay.forEach(row => {
                display.push(
                    <div style={{ display: 'flex' }}>
                        {row}
                    </div>
                )
            })
            setDisplayBoard(display);
        }
    }, [currentBoardState])

    if (!currentState || !currentBoardState) {
        return (
            <div>
                Loading, Loading, Loading
            </div>
        );
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            {displayBoard}
        </div>
    );
}