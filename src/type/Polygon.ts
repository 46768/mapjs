import MathUtil from '@/utils/MathUtil';

import Line from './line/Line';
import Coord from './vertex/Coord';
import Color from './vertex/Color';

export default class Polygon {
    public static blank = new Polygon([Coord.nullCoord], Color.noColor);
    /**
     * Construct a polygon
     * @param {Coord[]} _vertices - vertices for the polygon, drawn in order from 0 to vertices.length-1
     * @param {Color} _color - color in RGBA for the polygon
     */
    private boundingBox: [Coord, Coord];
    private highlighted: boolean = false;
    public constructor(
        private vertexAray: Coord[],
        private color: Color
    ) {
        this.boundingBox = this.calculateBoundingBox();
    }

    private calculateBoundingBox(): [Coord, Coord] {
        const xCoord: number[] = this.vertexAray.map((pos) => pos.x());
        const yCoord: number[] = this.vertexAray.map((pos) => pos.y());
        const lowerX: number = Math.min(...xCoord),
            lowerY: number = Math.min(...yCoord),
            upperX: number = Math.max(...xCoord),
            upperY: number = Math.max(...yCoord);
        return [new Coord(lowerX, upperX), new Coord(lowerY, upperY)];
    }

    public getVertices(): Coord[] {
        return this.vertexAray;
    }
    public getBoundingBox(): [Coord, Coord] {
        return this.boundingBox;
    }

    public setVertices(newVertices: Coord[]) {
        this.vertexAray = newVertices;
        this.boundingBox = this.calculateBoundingBox();
    }

    public refresh() {
        const vertices = this.vertexAray;
        this.setVertices(vertices);
    }

    public addVertex(vertexCoord: Coord) {
        this.vertexAray.push(vertexCoord);
        this.boundingBox = this.calculateBoundingBox();
    }

    public removeVertex(vertexIdx: number) {
        this.vertexAray = this.vertexAray.filter((_, idx) => idx !== vertexIdx);
        this.boundingBox = this.calculateBoundingBox();
    }

    public isInBoundingBox(coord: Coord): boolean {
        const [lowerX, upperX] = this.boundingBox[0].destruct();
        const [lowerY, upperY] = this.boundingBox[1].destruct();
        if (lowerX > coord.x() === upperX > coord.x()) return false;
        if (lowerY > coord.y() === upperY > coord.y()) return false;
        return true;
    }

    public isPointInPolygon(coord: Coord): boolean {
        if (!this.isInBoundingBox(coord)) return false;
        const vertices: Coord[] = this.vertexAray;
        let isPointIn: boolean = false;
        let prevIdx: number = vertices.length - 1;
        for (let vertIdx = 0; vertIdx < vertices.length; vertIdx++) {
            const vertCoord = vertices[vertIdx];
            const prevCoord = vertices[prevIdx];
            const [xVert, yVert] = vertCoord.destruct();
            const [xPrev, yPrev] = prevCoord.destruct();
            if (xPrev === xVert) {
                if (coord.x() < xVert) isPointIn = !isPointIn;
                prevIdx = vertIdx;
                continue;
            }
            if (yPrev === yVert) {
                prevIdx = vertIdx;
                continue;
            }
            //y is between yi and yj if its not larger or smaller than both of them
            const isIntersecting =
                MathUtil.isPointLeftToLine(
                    coord,
                    Line.fromCoords(prevCoord, vertCoord)
                ) && yVert > coord.y() !== yPrev > coord.y();
            if (isIntersecting) isPointIn = !isPointIn;
            prevIdx = vertIdx;
        }
        return isPointIn;
    }
}
