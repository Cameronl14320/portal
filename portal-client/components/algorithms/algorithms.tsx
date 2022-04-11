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

function generateBoard (dimensions: pair<number>): tileState[][] {
    const { first, second } = dimensions;
    const board: tileState[][] = [];
    for (let x = 0; x < first; x++) {
        board.push([]);
        for (let y = 0; y < second; y++) {
            board[x].push(tileState.UNSELECTED);
        }
    }

    return board;
}

function positionsEqual (first: pair<number> | undefined, second: pair<number> | undefined) {
    if (!first) {
        return false;
    } else if (!second) {
        return false;
    }
    return first.first == second.first && first.second == second.second;
}

export default function Algorithms (props: parameters) {
    const [dimensions, setDimensions] = useState<pair<number>>({ first: props.width, second: props.height });
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
            board: generateBoard(dimensions)
        });
    }, [])

    useEffect(() => {
        setCurrentBoardState({
            start: undefined,
            end: undefined,
            board: generateBoard(dimensions)
        });
    }, [dimensions])

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
    }, [currentBoardState])

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
        board[position.first][position.second] = newState;
        return board;
    }

    const runAlgorithm = (): void => {
        if (currentState?.running === runningState.WAITING) {
            if (currentBoardState?.start && currentBoardState.end) {
                let nextState: state = {
                    running: runningState.RUNNING,
                    algorithm: currentState.algorithm
                }
                setCurrentState(nextState);
            } else {
                alert('Please select a start and/or finish point');
            }
        } else {
            alert('algorithm is already running');
        }
    }

    if (!currentState || !currentBoardState || !displayBoard) {
        return (
            <div>
                Loading, Loading, Loading
            </div>
        );
    }
    return (
        <div>
            <button onClick={() => { runAlgorithm() }}>Run function</button>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                {displayBoard}
            </div>
        </div>
    );
}