import { isPointLeftToLine } from '@/utils/math';

import type { Coord, Color } from '@/com/vertex';

export class Polygon {
    static blank = new Polygon([[0, 0]], [0, 0, 0, 0]);
    /**
     * Construct a polygon
     * @param {Coord[]} _vertices - vertices for the polygon, drawn in order from 0 to vertices.length-1
     * @param {Color} _color - color in RGBA for the polygon
     */
    public boundingBox: [Coord, Coord];
    public highlighted: boolean = false;

    _calculateBoundingBox(): [Coord, Coord] {
        const xCoord: number[] = this.vertices.map((pos) => pos[0]);
        const yCoord: number[] = this.vertices.map((pos) => pos[1]);
        const lowerX: number = Math.min(...xCoord),
            lowerY: number = Math.min(...yCoord),
            upperX: number = Math.max(...xCoord),
            upperY: number = Math.max(...yCoord);
        return [
            [lowerX, upperX],
            [lowerY, upperY],
        ];
    }

    constructor(
        public _vertices: Coord[],
        public color: Color
    ) {
        this.boundingBox = this._calculateBoundingBox();
    }

    get vertices(): Coord[] {
        return this._vertices;
    }

    set vertices(newVertices: Coord[]) {
        this._vertices = newVertices;
        this.boundingBox = this._calculateBoundingBox();
    }

    updateVertices(newVertices: Coord[]) {
        this.vertices = newVertices;
    }

    refresh() {
        const vertices = this._vertices;
        this.vertices = vertices;
    }

    addVertex(vertexCoord: Coord) {
        this._vertices.push(vertexCoord);
        this.boundingBox = this._calculateBoundingBox();
    }

    removeVertex(vertexIdx: number) {
        this._vertices = this._vertices.filter((_, idx) => idx !== vertexIdx);
        this.boundingBox = this._calculateBoundingBox();
    }

    isInBoundingBox(x: number, y: number): boolean {
        const [[lowerX, upperX], [lowerY, upperY]]: [Coord, Coord] = this.boundingBox;
        if (lowerX > x === upperX > x) return false;
        if (lowerY > y === upperY > y) return false;
        return true;
    }

    isPointInPolygon([x, y]: Coord): boolean {
        if (!this.isInBoundingBox(x, y)) return false;
        const vertices: Coord[] = this.vertices;
        let isPointIn: boolean = false;
        let prevIdx: number = vertices.length - 1;
        for (let vertIdx = 0; vertIdx < vertices.length; vertIdx++) {
            const [xVert, yVert] = vertices[vertIdx];
            const [xPrev, yPrev] = vertices[prevIdx];
            if (xPrev === xVert) {
                if (x < xVert) isPointIn = !isPointIn;
                prevIdx = vertIdx;
                continue;
            }
            if (yPrev === yVert) {
                prevIdx = vertIdx;
                continue;
            }
            const slope = (yPrev - yVert) / (xPrev - xVert);
            //y is between yi and yj if its not larger or smaller than both of them
            const isIntersecting =
                isPointLeftToLine(x, y, slope, yVert - slope * xVert) && yVert > y !== yPrev > y;
            if (isIntersecting) isPointIn = !isPointIn;
            prevIdx = vertIdx;
        }
        return isPointIn;
    }
}
