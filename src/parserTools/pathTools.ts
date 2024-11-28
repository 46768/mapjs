import { Room } from '@/room/room';
import { getTouchingRooms } from './roomTools';
import { getPolygonCommonEdge, getPolygonCenter } from './polygonTools';
import { coordToString, isCoordEqual } from '@/com/vertex';
import { getLineSegmentMidPoint, getOverlappingLineSegment } from '@/com/line';

import type { Coord } from '@/com/vertex';
import type { LineSegment } from '@/com/line';

export type Nodes = Coord[];
export type Neighbors = number[][];
export type PathData = [Nodes, Neighbors];

export const blankPath: PathData = [[], []];

function findCoordInNodes(nodes: Nodes, coord: Coord): number {
    return nodes.findIndex(
        (element) => coordToString(coord) === coordToString(element)
    );
}

export function generatePath(roomData: Room[]): PathData {
    const touchingRooms: [Room, Room][] = getTouchingRooms(roomData);
    const commonEdges: [[LineSegment, LineSegment][], Room, Room][] = [];
    const roomNodeSet: Map<string, number> = new Map<string, number>();

    const nodes: Nodes = [];
    const neighbors: Neighbors = [];

    for (const [room1, room2] of touchingRooms) {
        const room1CenterCoord: Coord = getPolygonCenter(room1.polygon);
        const room2CenterCoord: Coord = getPolygonCenter(room2.polygon);
        const room1CCString: string = coordToString(room1CenterCoord);
        const room2CCString: string = coordToString(room2CenterCoord);

        //inter room nodes will connect to other connecting rooms later
        if (!roomNodeSet.has(room1CCString)) {
            roomNodeSet.set(room1CCString, nodes.push(room1CenterCoord) - 1);
            neighbors.push([]);
        }
        if (!roomNodeSet.has(room2CCString)) {
            roomNodeSet.set(room2CCString, nodes.push(room2CenterCoord) - 1);
            neighbors.push([]);
        }

        commonEdges.push([
            getPolygonCommonEdge(room1.polygon, room2.polygon),
            room1,
            room2,
        ]);
    }

    for (const [segmentData, room1, room2] of commonEdges) {
        const room1CCIdx: number =
            roomNodeSet.get(coordToString(getPolygonCenter(room1.polygon))) ??
            -1;
        const room2CCIdx: number =
            roomNodeSet.get(coordToString(getPolygonCenter(room2.polygon))) ??
            -1;
        for (const [segment1, segment2] of segmentData) {
            const intersectingSegment: LineSegment = getOverlappingLineSegment(
                segment1,
                segment2
            );

            // no reason to generate a node for line segment with 0 length
            if (isCoordEqual(intersectingSegment[1], intersectingSegment[2])) {
                continue;
            }
            const interSegmentMid: Coord =
                getLineSegmentMidPoint(intersectingSegment);
            if (findCoordInNodes(nodes, interSegmentMid) !== -1) continue;

            const interSegmentMidIdx = nodes.push(interSegmentMid) - 1;
            neighbors.push([room1CCIdx, room2CCIdx]);
            for (const connectingNode of [
                ...neighbors[room1CCIdx],
                ...neighbors[room2CCIdx],
            ]) {
                // add node to each inter room nodes of both rooms
                if (
                    neighbors[connectingNode].indexOf(interSegmentMidIdx) === -1
                )
                    neighbors[connectingNode].push(interSegmentMidIdx);
                if (
                    neighbors[interSegmentMidIdx].indexOf(connectingNode) === -1
                )
                    neighbors[interSegmentMidIdx].push(connectingNode);
            }

            // add node as both room's neighbors
            if (neighbors[room1CCIdx].indexOf(interSegmentMidIdx) === -1)
                neighbors[room1CCIdx].push(interSegmentMidIdx);
            if (neighbors[room2CCIdx].indexOf(interSegmentMidIdx) === -1)
                neighbors[room2CCIdx].push(interSegmentMidIdx);
        }
    }

    return [nodes, neighbors];
}
