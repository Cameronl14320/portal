import { useEffect, useState } from "react";
import { Djikstras } from "../../data/algorithms/djikstras/djikstras";
import { algorithms, boardState, tileState } from "../../data/algorithms/search-types";
import { pair } from "../../data/datatypes";
import Tile from "./tile";

export enum runningState {
    WAITING = 0,
    RUNNING = 1,
    FINISHED = 2
};

export type parameters = {
    rows: number;
    cols: number;
};

export type state = {
    algorithm: algorithms;
    running: runningState
};

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
    const [dimensions, setDimensions] = useState<pair<number>>({ first: props.rows, second: props.cols });
    const [currentState, setCurrentState] = useState<state | undefined>(undefined);
    const [currentBoardState, setCurrentBoardState] = useState<boardState | undefined>(undefined);
    const [displayBoard, setDisplayBoard] = useState<any[][] | null>(null);

    if (currentBoardState) {
        const thingie = new Djikstras(currentBoardState, props.rows, props.cols);
    }

    useEffect(() => {
        setCurrentState({
            algorithm: algorithms.DJIKSTRAS,
            running: runningState.WAITING
        });
        setCurrentBoardState({
            start: undefined,
            finish: undefined,
            board: generateBoard(dimensions)
        });
    }, [])

    useEffect(() => {
        setCurrentBoardState({
            start: undefined,
            finish: undefined,
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
            let tempBoardState = Object.assign({}, currentBoardState);
            if (!tempBoardState?.start && !positionsEqual(tempBoardState.finish, position)) {
                tempBoardState.start = position;
                tempBoardState.board = updateTilePosition(tempBoardState.board, position, tileState.START);
            } else if (!tempBoardState?.finish && !positionsEqual(tempBoardState.start, position)) {
                tempBoardState.finish = position;
                tempBoardState.board = updateTilePosition(tempBoardState.board, position, tileState.FINISH);
            } else if (positionsEqual(tempBoardState.start, position)) {
                tempBoardState.start = undefined;
                tempBoardState.board = updateTilePosition(tempBoardState.board, position, tileState.UNSELECTED);
            } else if (positionsEqual(tempBoardState.finish, position)) {
                tempBoardState.finish = undefined;
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
            if (currentBoardState?.start && currentBoardState.finish) {
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