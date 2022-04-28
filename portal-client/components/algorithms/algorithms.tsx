import { useEffect, useState } from "react";
import { Djikstras } from "../../data/algorithms/djikstras/djikstras";
import { SearchAlgorithm } from "../../data/algorithms/search-algorithm";
import { algorithms, boardState, tileSearchState, tileState } from "../../data/algorithms/search-types";
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
            board[x].push({
                searchState: tileSearchState.UNSELECTED,
                position: {first: x, second: y},
                weight: 0,
                previous: undefined
            });
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
    const [currentBoardState, setCurrentBoardState] = useState<tileState[][]>();
    const [selectedStart, setSelectedStart] = useState<pair<number> | undefined>(undefined);
    const [selectedFinish, setSelectedFinish] = useState<pair<number> | undefined>(undefined);
    const [displayBoard, setDisplayBoard] = useState<any[][] | null>(null);
    const [currentAlgorithm, setCurrentAlgorithm] = useState<SearchAlgorithm | undefined>(undefined);

    useEffect(() => {
        setCurrentState({
            algorithm: algorithms.DJIKSTRAS,
            running: runningState.WAITING
        });
        setCurrentBoardState(generateBoard(dimensions));
        setSelectedStart(undefined);
        setSelectedFinish(undefined);
    }, [])

    useEffect(() => {
        setCurrentBoardState(generateBoard(dimensions));
    }, [dimensions])

    useEffect(() => {
        const display: any[] = [];
        if (currentBoardState) {
            const currentBoard = currentBoardState.slice();
            currentBoard.forEach((row, rowIndex) => {
                let tempCol: any[] = [];
                row.forEach((col, colIndex) => {
                    let tilePosition = { first: rowIndex, second: colIndex };
                    tempCol.push(
                        <Tile
                            key={ 'algorithms-board-tile-' + rowIndex + '-' + colIndex }
                            position={tilePosition}
                            state={col.searchState}
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
            let tempBoardState = currentBoardState.slice();
            let changed = false;
            if (!selectedStart && !positionsEqual(selectedFinish, position)) {
                setSelectedStart(position);
                tempBoardState = updateTilePosition(tempBoardState, position, tileSearchState.START);
                changed = true;
            } else if (!selectedFinish && !positionsEqual(selectedStart, position)) {
                setSelectedFinish(position);
                tempBoardState = updateTilePosition(tempBoardState, position, tileSearchState.FINISH);
                changed = true;
            } else if (positionsEqual(selectedStart, position)) {
                setSelectedStart(undefined);
                tempBoardState = updateTilePosition(tempBoardState, position, tileSearchState.UNSELECTED);
                changed = true;
            } else if (positionsEqual(selectedFinish, position)) {
                setSelectedFinish(undefined);
                tempBoardState = updateTilePosition(tempBoardState, position, tileSearchState.UNSELECTED);
                changed = true;
            }

            if (changed) {
                setCurrentBoardState(tempBoardState);
            }
        }
    }

    const updateTilePosition = (board: tileState[][], position: pair<number>, newState: tileSearchState): tileState[][] => {
        const newBoard: tileState[][] = Object.assign([], board);
        newBoard[position.first][position.second].searchState = newState;
        return newBoard;
    }

    const runAlgorithm = (): void => {
        if (currentState?.running === runningState.WAITING) {
            if (selectedStart && selectedStart) {
                setCurrentState({
                    running: runningState.RUNNING,
                    algorithm: currentState.algorithm
                });

                if (currentBoardState && selectedStart && selectedFinish) {
                    if (currentState.algorithm === algorithms.DJIKSTRAS) {
                        const boardState = {
                            board: currentBoardState,
                            start: selectedStart,
                            finish: selectedFinish
                        }
                        setCurrentAlgorithm(new Djikstras(boardState, dimensions));
                    } else if (currentState.algorithm === algorithms.A_STAR_SEARCH) {
                        console.log('rip, not implemented yet');
                    }
                }
            } else {
                alert('Please select a start and/or finish point');
            }
        } else {
            alert('algorithm is already running');
        }
    }

    const stepAlgorithm = (): void => {
        if (currentAlgorithm && currentState && currentBoardState && selectedStart && selectedFinish) {
            if (currentState.running === runningState.RUNNING) {
                const nextBoard = currentAlgorithm.step();
                if (nextBoard[selectedFinish.first][selectedFinish.second].previous) {
                    setCurrentState({
                        ...currentState,
                        running: runningState.FINISHED
                    });
                    const finalBoard = currentAlgorithm.findPath(nextBoard);
                    setCurrentBoardState(finalBoard);
                } else {
                    setCurrentBoardState(nextBoard);
                }
            }
        }
    }

    if (!currentState || !currentBoardState || !displayBoard) {
        return (
            <div>
                Loading, Loading, Loading
            </div>
        );
    }

    let stepButton;
    if (!!currentAlgorithm && currentState.running === runningState.RUNNING) {
        stepButton = <button onClick={() => stepAlgorithm()}>Step</button>
    }
    return (
        <div>
            <button onClick={() => { runAlgorithm() }}>Run function</button>
            {stepButton}
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                {displayBoard}
            </div>
        </div>
    );
}