export type Coord = [number, number];
export type Color = [number, number, number, number];

export const nullPoint: Coord = [Infinity, Infinity];

export function coordToString(coord: Coord): string {
    return `${coord[0]},,${coord[1]}`;
}

export function stringToCoord(coordString: string): Coord {
    return coordString.split(',,').map(parseFloat) as Coord;
}

export function isCoordEqual(coord1: Coord, coord2: Coord) {
    return coord1[0] === coord2[0] && coord1[1] === coord2[1];
}
