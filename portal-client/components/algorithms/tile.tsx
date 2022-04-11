import React, { Dispatch, SetStateAction } from "react";
import { boardState, pair, tileState } from "./algorithms";

export default function Tile(props: {position: pair<number>, state: tileState, handleClick: (position: pair<number>) => void}) {
    return (
        <div onClick={() => {console.log('clicked'); props.handleClick(props.position)}}>
            |{props.state}|
        </div>
    )
}