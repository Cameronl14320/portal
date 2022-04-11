import React from "react";
import { pair, tileState } from "./algorithms";
import style from './tile.module.scss';

const tileColors = [
    'white', 'green', 'red', 'blue'
]

export default function Tile(props: {position: pair<number>, state: tileState, handleClick: (position: pair<number>) => void}) {
    return (
        <div
            className={style.container}
            onClick={() => {console.log('clicked'); props.handleClick(props.position)}}
            style={{ backgroundColor: tileColors[props.state]}}>
        </div>
    )
}