import { aStar } from '@/astar/astar';

import type { PathData } from '@/parserTools/pathTools';
import type { LineData, PointData } from './def';

export function generatePathObjects(
    graph: PathData,
    source: number,
    target: number
): [LineData[], PointData[]] {
    const [nodes, neighbors] = graph;
    const pathFound = aStar(nodes, neighbors, source, target);
    if (pathFound.length <= 0) return [[], []];

    const lines: LineData[] = [];
    const points: PointData[] = [
        [nodes[target], 5, [23, 224, 255, 1], { zLayer: 4, tag: 'pathfind-obj' }],
    ];

    for (let i = 0; i < pathFound.length - 1; i++) {
        lines.push([
            nodes[pathFound[i]],
            nodes[pathFound[i + 1]],
            [23, 224, 255, 1],
            2,
            { zLayer: 4, tag: 'pathfind-obj' },
        ]);
        points.push([
            nodes[pathFound[i]],
            5,
            [23, 224, 255, 1],
            { zLayer: 4, tag: 'pathfind-obj' },
        ]);
    }

    return [lines, points];
}
