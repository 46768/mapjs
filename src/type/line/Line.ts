import Fraction from 'fraction.js';
import Coord from '@type/vertex/Coord';

export default class Line {
    private m: Fraction;
    private b: number;
    private vertical: boolean;

    public static fromCoords(coord1: Coord, coord2: Coord) {
        const isVertical: boolean = coord2.x() === coord1.x();
        const slope: Fraction = new Fraction({
            n: coord2.y() - coord1.y(),
            d: isVertical ? 1 : coord2.x() - coord1.y(),
        });
        const b: number = slope.mul(coord1.x()).neg().add(coord1.y()).valueOf();
        return new Line(slope, b, isVertical);
    }

    public static parseLine(line: string): Line {
        const lineProp: string[] = line.split(',');
        const fraction: string[] = lineProp[0].split('/');
        let isVertical = false;
        if (fraction[1] == '0') {
            isVertical = true;
            fraction[1] = '1';
        }
        return new Line(
            new Fraction(fraction.join('/')),
            parseInt(lineProp[1]),
            isVertical
        );
    }
    public constructor(slope: Fraction, yIntercept: number, vertical: boolean) {
        this.m = slope;
        this.b = yIntercept;
        this.vertical = vertical;
    }

    public slope(): Fraction {
        return this.m;
    }
    public yIntercept(): number {
        return this.b;
    }
    public isVertical(): boolean {
        return this.vertical;
    }

    public toString(): string {
        return `${this.m.toString()},${this.b}`;
    }

    public equals(other: Line): boolean {
        return (
            this.m.equals(other.slope()) &&
            this.b == other.yIntercept() &&
            this.vertical == other.isVertical()
        );
    }

    public at(x: number): number {
        return this.m.mul(x).add(this.b).valueOf();
    }
}
