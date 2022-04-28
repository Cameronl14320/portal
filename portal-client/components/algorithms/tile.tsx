import React from "react";
import { tileSearchState } from "../../data/algorithms/search-types";
import { pair } from "../../data/datatypes";
import style from './tile.module.scss';

const tileColors = [
    'white', 'green', 'red', 'blue', 'gold'
]

export default function Tile(props: {position: pair<number>, state: tileSearchState, handleClick: (position: pair<number>) => void}) {
    return (
        <div
            className={style.container}
            onClick={() => props.handleClick(props.position)}
            style={{ backgroundColor: tileColors[props.state]}}>
        </div>
    )
}