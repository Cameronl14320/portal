import { tileState } from "./algorithms/search-types";

export default class PriorityQueue {
    private queue: tileState[] = [];

    public push (element: tileState): void {
        this.queue.push(element);
        this.sort();
    }

    public pop (): tileState | undefined {
        if (this.queue.length < 1) {
            return undefined;
        }
        const element = this.queue[0];
        this.queue = this.queue.slice(1);
        return element;
    }

    public size (): number {
        return this.queue.length;
    }

    public sort (): void {
        this.queue.sort((a, b) => {
            if (a.weight < b.weight) {
                return -1;
            }
            if (a.weight > b.weight) {
                return 1;
            }
            return 0;
        });
    };
}