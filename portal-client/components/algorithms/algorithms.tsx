import { useEffect, useState } from "react";
import { AStarSearch } from "../../data/algorithms/a-star-search/a-star-search";
import { Djikstras } from "../../data/algorithms/djikstras/djikstras";
import { SearchAlgorithm } from "../../data/algorithms/search-algorithm";
import { algorithms, boardState, tileSearchState, tileState } from "../../data/algorithms/search-types";
import { pair } from "../../data/datatypes";
import Button from "../button/button";
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
        resetAlgorithm();
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
                        const boardState = {
                            board: currentBoardState,
                            start: selectedStart,
                            finish: selectedFinish
                        }
                        setCurrentAlgorithm(new AStarSearch(boardState, dimensions));
                    }
                }
            } else {
                alert('Please select a start and/or finish point');
            }
        } else if (currentState?.running === runningState.FINISHED) {
            resetAlgorithm();
        } else {
            alert('algorithm is already running');
        }
    }

    const setAlgorithm = (algo: algorithms): void => {
        if (currentState) {
            if (currentState.running === runningState.WAITING) {
                const nextState = {
                    ...currentState,
                    algorithm: algo
                }
                setCurrentState(nextState);
            }
        }
    }

    const stepAlgorithm = (): void => {
        if (currentAlgorithm && currentState && currentBoardState && selectedStart && selectedFinish) {
            if (currentState.running === runningState.RUNNING) {
                const nextBoard = currentAlgorithm.step();
                setCurrentBoardState(nextBoard);
                if (currentAlgorithm.state === 'FINISHED') {
                    setCurrentState({
                        ...currentState,
                        running: runningState.FINISHED
                    });
                    const finalBoard = currentAlgorithm.findPath(nextBoard);
                    setCurrentBoardState(finalBoard);
                }
            }
        }
    }

    const finishAlgorithm = (): void => {
        if (currentAlgorithm && currentState && currentBoardState && selectedStart && selectedFinish) {
            if (currentState.running === runningState.RUNNING) {
                while (currentAlgorithm.state !== 'FINISHED') {
                    stepAlgorithm();
                }
            }
        }
    }

    const resetAlgorithm = (): void => {
        setCurrentState({
            algorithm: algorithms.DJIKSTRAS,
            running: runningState.WAITING
        });
        setCurrentBoardState(generateBoard(dimensions));
        setSelectedStart(undefined);
        setSelectedFinish(undefined);
    }

    if (!currentState || !currentBoardState || !displayBoard) {
        return (
            <div>
                Loading, Loading, Loading
            </div>
        );
    }

    let running;
    if (currentState.running === runningState.WAITING) {
        running = (
            <div>
                <button onClick={() => setAlgorithm(algorithms.DJIKSTRAS)}>DJIKSTRAS</button>
                <button onClick={() => setAlgorithm(algorithms.A_STAR_SEARCH)}>A STAR SEARCH</button>
            </div>
        )
    } else if (!!currentAlgorithm && currentState.running === runningState.RUNNING) {
        running = (
            <div>
                <button onClick={() => stepAlgorithm()}>Step</button>
                <button onClick={() => finishAlgorithm()}>Finish</button>
            </div>
        )
    }
    let currentAlgo;
    if (currentState.algorithm === algorithms.A_STAR_SEARCH) {
        currentAlgo = <div style={{color: 'white'}}>A Star Search is selected</div>;
    } else if (currentState.algorithm === algorithms.DJIKSTRAS) {
        currentAlgo = <div style={{color: 'white'}}>Djikstras is selected</div>;
    }
    return (
        <div>
            <div>
                <button onClick={() => runAlgorithm()}>Run function</button>
                <button onClick={() => resetAlgorithm()}>Reset</button>
                <div style={{width: '100px'}}>
                <Button>Test</Button>
                </div>
            </div>
            {running}
            {currentAlgo}
            <div style={{ display: 'grid'}}>
                {displayBoard}
            </div>
        </div>
    );
}