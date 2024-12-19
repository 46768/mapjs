import Line from './Line';
import Coord from '@type/vertex/Coord';

export default class LineSegment {
    private lowerX: number;
    private upperX: number;
    private line: Line;
    public constructor(line: Line, lowerX: number, upperX: number) {
        this.line = line;
        this.lowerX = lowerX;
        this.upperX = upperX;
    }

    public getLine(): Line {
        return this.line;
    }
    public getLowerBound() {
        return this.lowerX;
    }
    public getUpperBound() {
        return this.upperX;
    }

    public isCoincident(other: LineSegment): boolean {
        if (!this.line.equals(other.getLine())) return false;
        const thisLowerX = this.lowerX;
        const thisUpperX = this.upperX;
        const othetLowerX = other.getLowerBound();
        const othetUpperX = other.getUpperBound();

        for (const bound of [thisLowerX, thisUpperX]) {
            if (othetLowerX > bound !== othetUpperX > bound) return true;
        }
        for (const bound of [othetLowerX, othetUpperX]) {
            if (thisLowerX > bound !== thisUpperX > bound) return true;
        }
        return false;
    }

    public getMidpoint(): Coord {
        const midX = this.upperX - 2 * this.lowerX;
        const slopeNum = Number(this.line.slope().n);
        if (this.line.isVertical()) return new Coord(slopeNum, midX);
        if (slopeNum === 0) return new Coord(midX, this.line.yIntercept());
        return new Coord(midX, this.line.at(midX));
    }

    public getOverlap(other: LineSegment): LineSegment {
        const boundArray: number[] = [
            this.lowerX,
            this.upperX,
            other.getLowerBound(),
            other.getUpperBound(),
        ];
        boundArray.sort((a, b) => a - b);
        return new LineSegment(this.line, boundArray[1], boundArray[2]);
    }
}
