import { Polygon } from '@type/polygon';
import { validateLineSegmentCoincidentation } from '@type/line';

import type { Coord } from '@type/vertex';
import type { LineSegment } from '@type/line';

export function normalizeZero(x: number) {
    return x === 0 ? 0 : x;
}

export function getPolygonEdges(polygon: Polygon): LineSegment[] {
    const edgeArray: LineSegment[] = [];
    const vertices: Coord[] = polygon.vertices;

    let prevIdx: number = vertices.length - 1;
    for (let vertIdx = 0; vertIdx < vertices.length; vertIdx++) {
        const [vertX, vertY] = vertices[vertIdx];
        const [prevX, prevY] = vertices[prevIdx];

        if (prevX === vertX) {
            edgeArray.push([[false, vertX], vertX, vertX]);
            prevIdx = vertIdx;
            continue;
        }
        const slope = (prevY - vertY) / (prevX - vertX);
        const base = vertY - slope * vertX;
        edgeArray.push([
            [normalizeZero(slope), normalizeZero(base)],
            vertX,
            prevX,
        ]);
        prevIdx = vertIdx;
    }
    return edgeArray;
}

export function getPolygonCommonEdge(
    polygon1: Polygon,
    polygon2: Polygon
): [LineSegment, LineSegment][] {
    const poly1Edges: LineSegment[] = getPolygonEdges(polygon1);
    const poly2Edges: LineSegment[] = getPolygonEdges(polygon2);

    const returnEdges: [LineSegment, LineSegment][] = [];

    for (const line1 of poly1Edges) {
        for (const line2 of poly2Edges) {
            if (validateLineSegmentCoincidentation(line1, line2)) {
                returnEdges.push([line1, line2]);
            }
        }
    }
    return returnEdges;
}

export function validatePolygonTouching(
    polygon1: Polygon,
    polygon2: Polygon
): boolean {
    return getPolygonCommonEdge(polygon1, polygon2).length !== 0;
}

export function getPolygonCenter(polygon: Polygon): Coord {
    const [[minX, maxX], [minY, maxY]] = polygon.boundingBox;
    return [(maxX + minX) / 2, (maxY + minY) / 2];
}

export function getTouchingPolygon(): [Polygon, Polygon][] {
    return [];
}
