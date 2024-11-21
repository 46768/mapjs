import { MinHeap } from './heap';

import type { Coord } from '@/data/com/vertex';

function dist(source: Coord, target: Coord): number {
    const rise = target[1] - source[1];
    const run = target[0] - source[0];
    return Math.sqrt(rise * rise + run * run);
}

function hueristic(source: Coord, target: Coord): number {
    return dist(source, target);
}

function buildPath(path: number[], pathEnd: number) {
    const prunedPath: number[] = [pathEnd];
    let nextIdx: number = path[pathEnd];
    if (nextIdx === -1) return [];

    while (prunedPath[prunedPath.length - 1] !== nextIdx) {
        prunedPath.push(nextIdx);
        nextIdx = path[nextIdx];
    }

    prunedPath.reverse();
    return prunedPath;
}

function queueCmp(left: [number, number], right: [number, number]) {
    return left[1] - right[1];
}

export function aStar(nodes: Coord[], nebors: number[][], source: number, target: number) {
    const nodeCnt: number = nodes.length;
    const sourceNode: Coord = nodes[source];
    const targetNode: Coord = nodes[target];

    const path: number[] = new Array(nodeCnt).fill(-1);
    const gCost: number[] = new Array(nodeCnt).fill(999999);
    const fCost: number[] = new Array(nodeCnt).fill(999999);

    const queue: MinHeap<[number, number]> = new MinHeap<[number, number]>(queueCmp, [-1, 999999]);
    const queueSet: Set<number> = new Set<number>();

    path[source] = source;
    gCost[source] = 0;
    fCost[source] = hueristic(sourceNode, targetNode);
    queue.insert([source, fCost[source]]);

    while (queue.getSize() > 0) {
        const extracted: [number, number] = queue.extract();
        const currentIdx: number = extracted[0];
        const currentNode: Coord = nodes[currentIdx];
        queueSet.delete(currentIdx);
        if (currentIdx === target) {
            return buildPath(path, target);
        }

        for (const neborIdx of nebors[currentIdx]) {
            const neborNode = nodes[neborIdx];
            const neborGCost = gCost[currentIdx] + dist(currentNode, neborNode);
            const neborFCost = neborGCost + hueristic(neborNode, targetNode);

            if (neborGCost < gCost[neborIdx]) {
                path[neborIdx] = currentIdx;
                gCost[neborIdx] = neborGCost;
                fCost[neborIdx] = neborFCost;
                if (!queueSet.has(neborIdx)) {
                    queue.insert([neborIdx, neborFCost]);
                }
            }
        }
    }

    return buildPath(path, target);
}
