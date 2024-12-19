export default class Coord {
    public static nullCoord: Coord = new Coord(Infinity, Infinity);

    public static parseCoord(coord: string): Coord {
        const pos: string[] = coord.split(',');
        return new Coord(parseInt(pos[0]), parseInt(pos[1]));
    }

    private pos: [number, number];

    public constructor(x: number, y: number) {
        this.pos = [x, y];
    }

    public x(): number {
        return this.pos[0];
    }

    public y(): number {
        return this.pos[1];
    }

    public destruct(): number[] {
        return this.pos;
    }

    public toString(): string {
        return [this.x, this.y].join(',');
    }

    public equals(other: Coord): boolean {
        return this.x() == other.x() && this.y() == other.y();
    }
}
