export type Artwork = {
    name: string,
    description: string,
    url: string,
    width: number,
    height: number
};

export type pair<T> = {
    first: T,
    second: T
};