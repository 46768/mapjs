import { aStar } from '@core/astar/astar';

import type { Coord } from '@type/vertex';

const nodes: Coord[] = [
    [0, 0],
    [0, 100],
    [50, 100],
    [100, 100],
    [50, 150],
    [50, 50],
];
const nebors: number[][] = [[1], [2], [3, 4, 5], [2], [2], [2]];

const source = 0;
const target = 4;
test('aStar test', () => {
    const path = aStar(nodes, nebors, source, target);
    expect(path).toEqual([0, 1, 2, 4]);
});
