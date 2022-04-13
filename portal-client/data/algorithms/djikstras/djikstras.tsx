import { pair } from "../../datatypes";
import { ISearchAlgorithm } from "../ISearchAlgorithm";
import { getNeighbors } from "../search-helpers";
import { boardState, tileSearchState } from "../search-types";

export class Djikstras extends ISearchAlgorithm {
    // In order to store entire path
    // Each visited tile should store the tile it came from, this way we can map backwards from finsh to start
    step(): tileState[][] {

        return [];
    }
}