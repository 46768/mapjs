import { aStar } from '@core/astar/astar';
import { blankPath } from '@core/parserTools/pathTools';
import { Polygon } from '@type/polygon';

import type { Coord, Color } from '@type/vertex';
import type { PathData } from '@core/parserTools/pathTools';
import type { ProductConfig } from '@core/controller/renderer/def';
import type { dotArg, lineArg } from '@core/controller/renderer/def';

// Config
const pathColor: Color = [23, 224, 255, 1];
const pathConfig: ProductConfig = { zLayer: 4, tag: 'pathfind-obj' };

function generatePoint(node: Coord): dotArg {
    return [node, 5, pathColor, pathConfig];
}

function generateLine(start: Coord, end: Coord): lineArg {
    return [start, end, 2, pathColor, pathConfig];
}

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
    public polygonData: Polygon[] = [];
}
