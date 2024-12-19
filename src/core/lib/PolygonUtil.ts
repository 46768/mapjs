import Polygon from '@type/Polygon';

import Coord from '@type/vertex/Coord';
import Line from '@type/line/Line';
import LineSegment from '@type/line/LineSegment';

export default class PolygonUtil {
    public static getPolygonEdges(polygon: Polygon): LineSegment[] {
        const edgeArray: LineSegment[] = [];
        const vertices: Coord[] = polygon.getVertices();

        let prevIdx: number = vertices.length - 1;
        for (let vertIdx = 0; vertIdx < vertices.length; vertIdx++) {
            const vertCoord = vertices[vertIdx];
            const prevCoord = vertices[prevIdx];

            edgeArray.push(
                new LineSegment(
                    Line.fromCoords(prevCoord, vertCoord),
                    prevCoord.x(),
                    vertCoord.x()
                )
            );
            prevIdx = vertIdx;
        }
        return edgeArray;
    }

    public static getPolygonCommonEdge(
        polygon1: Polygon,
        polygon2: Polygon
    ): [LineSegment, LineSegment][] {
        const poly1Edges: LineSegment[] = PolygonUtil.getPolygonEdges(polygon1);
        const poly2Edges: LineSegment[] = PolygonUtil.getPolygonEdges(polygon2);

        const returnEdges: [LineSegment, LineSegment][] = [];

        for (const line1 of poly1Edges) {
            for (const line2 of poly2Edges) {
                if (line1.isCoincident(line2)) {
                    returnEdges.push([line1, line2]);
                }
            }
        }
        return returnEdges;
    }

    public static getPolygonCenter(polygon: Polygon): Coord {
        const [minX, maxX] = polygon.getBoundingBox()[0].destruct();
        const [minY, maxY] = polygon.getBoundingBox()[1].destruct();
        return new Coord((maxX + minX) / 2, (maxY + minY) / 2);
    }
}
