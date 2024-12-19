import { aStar } from '@core/astar/astar';
import { blankPath, generatePath } from '@core/lib/path';
import { Room } from '@type/room';
import { generatePoint, generateLine } from './pathfinder/draw';

import type { PathData } from '@core/lib/path';
import type { dotArg, lineArg } from '@core/controller/renderer/def';

export function generatePathObjects(
    graph: PathData,
    source: number,
    target: number
): [lineArg[], dotArg[]] {
    const [nodes, neighbors] = graph;
    const pathFound = aStar(nodes, neighbors, source, target);
    if (pathFound.length <= 0) return [[], []];

    const lines: lineArg[] = [];
    const points: dotArg[] = [generatePoint(nodes[source])];

    for (let i = 1; i < pathFound.length; i++) {
        lines.push(generateLine(nodes[pathFound[i - 1]], nodes[pathFound[i]]));
        points.push(generatePoint(nodes[pathFound[i]]));
    }

    return [lines, points];
}

export class PathFinderController {
    public pathData: PathData = blankPath;
    public roomData: Room[] = [];

    constructor(rooms?: Room[]) {
        if (rooms) this.roomData = rooms;
    }

    attachRoomData(rooms: Room[]) {
        this.roomData = rooms;
        this.pathData = generatePath(rooms);
    }

    detachRoomData() {
        this.roomData = [];
    }

    pathfind(start: number, end: number) {
        return generatePathObjects(this.pathData, start, end);
    }

    getPath() {
        return this.pathData;
    }
}
