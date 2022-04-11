import { useEffect, useState } from "react";
import Tile from "./tile";

export enum algorithms {
    DJIKSTRAS = 0,
    A_STAR_SEARCH = 1
};

export enum tileState {
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
    start: pair<number> | undefined;
    end: pair<number> | undefined,
    board: tileState[][]
}

export type pair<T> = {
    first: T,
    second: T
}

function generateBoard(width: number, height: number): tileState[][] {
    const board: tileState[][] = [];
    for (let x = 0; x < width; x++) {
        board.push([]);
        for (let y = 0; y < height; y++) {
            board[x].push(tileState.UNSELECTED);
        }
    }

    return board;
}

function positionsEqual(first: pair<number> | undefined, second: pair<number> | undefined) {
    if (!first) {
        return false;
    } else if (!second) {
        return false;
    }
    return first.first == second.first && first.second == second.second;
}

export default function Algorithms(props: parameters) {
    const {width, height} = props;
    const [currentState, setCurrentState] = useState<state | undefined>(undefined);
    const [currentBoardState, setCurrentBoardState] = useState<boardState | undefined>(undefined);
    const [displayBoard, setDisplayBoard] = useState<any[][] | null>(null);

    useEffect(() => {
        setCurrentState({
            algorithm: algorithms.DJIKSTRAS,
            running: runningState.WAITING
        });
        setCurrentBoardState({
            start: undefined,
            end: undefined,
            board: generateBoard(width, height)
        });
    }, [])

    useEffect(() => {
        const display: any[] = [];
        console.log(currentBoardState);
        if (currentBoardState?.board) {
            const currentBoard = currentBoardState.board;
            currentBoard.forEach((row, rowIndex) => {
                let tempCol: any[] = [];
                row.forEach((col, colIndex) => {
                    let tilePosition = { first: rowIndex, second: colIndex };
                    tempCol.push(
                        <Tile
                            key={ 'algorithms-board-tile-' + rowIndex + '-' + colIndex }
                            position={tilePosition}
                            state={col}
                            handleClick={updateCurrentBoard}
                            />
                    )
                })
                display.push(
                    <div key={'algorithms-board-row-' + rowIndex} style={{ display: 'flex' }}>
                        {tempCol}
                    </div>
                );
            });
            setDisplayBoard(display);
        }
    }, [currentBoardState, setCurrentBoardState])

    const updateCurrentBoard = (position: pair<number>) => {
        if (currentBoardState) {
            let tempBoardState = {
                start: currentBoardState.start,
                end: currentBoardState.end,
                board: currentBoardState.board
            };
            if (!tempBoardState?.start && !positionsEqual(tempBoardState.end, position)) {
                tempBoardState.start = position;
                tempBoardState.board = updateTilePosition(tempBoardState.board, position, tileState.START);
            } else if (!tempBoardState?.end && !positionsEqual(tempBoardState.start, position)) {
                tempBoardState.end = position;
                tempBoardState.board = updateTilePosition(tempBoardState.board, position, tileState.FINISH);
            } else if (positionsEqual(tempBoardState.start, position)) {
                tempBoardState.start = undefined;
                tempBoardState.board = updateTilePosition(tempBoardState.board, position, tileState.UNSELECTED);
            } else if (positionsEqual(tempBoardState.end, position)) {
                tempBoardState.end = undefined;
                tempBoardState.board = updateTilePosition(tempBoardState.board, position, tileState.UNSELECTED);
            }
            setCurrentBoardState(tempBoardState);
        }
    }

    const updateTilePosition = (board: tileState[][], position: pair<number>, newState: tileState): tileState[][] => {
        let tempBoard = board;
        board[position.first][position.second] = newState;
        return board;
    }

    if (!currentState || !currentBoardState || !displayBoard) {
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