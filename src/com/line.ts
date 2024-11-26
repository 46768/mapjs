import type { Coord } from './vertex';

// [slope, y-intercept]
export type Line = [number | false, number];

// [Line, lowerX, upperX]
export type LineSegment = [Line, Coord, Coord];

export function validateLineSegmentCoincidentation(
    [line1, lowerX1, upperX1]: LineSegment,
    [line2, lowerX2, upperX2]: LineSegment
): boolean {
    if (line1[0] !== line2[0]) return false;
    if (line1[1] !== line2[1]) return false;
    for (const vertex1 of [lowerX1[0], upperX1[0]]) {
        if (lowerX2[0] > vertex1 !== upperX2[0] > vertex1) return true;
    }
    for (const vertex2 of [lowerX2[0], upperX2[0]]) {
        if (lowerX1[0] > vertex2 !== upperX1[0] > vertex2) return true;
    }
    for (const vertex1 of [lowerX1[1], upperX1[1]]) {
        if (lowerX2[1] > vertex1 !== upperX2[1] > vertex1) return true;
    }
    for (const vertex2 of [lowerX2[1], upperX2[1]]) {
        if (lowerX1[1] > vertex2 !== upperX1[1] > vertex2) return true;
    }
    return false;
}

export function getLineSegmentMidPoint([line, lowerX, upperX]: LineSegment): Coord {
    const interSegmentMid: Coord = [0, 0];
    if (line[0] === false) {
        interSegmentMid[0] = lowerX[0];
        interSegmentMid[1] = (lowerX[1] + upperX[1]) / 2;
    } else if (line[0] === 0) {
        interSegmentMid[0] = (lowerX[0] + upperX[0]) / 2;
        interSegmentMid[1] = lowerX[1];
    } else {
        interSegmentMid[0] = (lowerX[0] + upperX[0]) / 2;
        interSegmentMid[1] = (lowerX[0] + upperX[1]) / 2;
    }

    return interSegmentMid;
}

export function getOverlappingLineSegment(
    segment1: LineSegment,
    segment2: LineSegment
): LineSegment {
    const coordSelector: 0 | 1 = segment1[0][0] === false ? 1 : 0;
    const lineCoord: [Coord, Coord, Coord, Coord] = [
        segment1[1],
        segment1[2],
        segment2[1],
        segment2[2],
    ];
    lineCoord.sort((a, b) => a[coordSelector] - b[coordSelector]);
    const intersectingSegment: LineSegment = [
        [...segment1[0]],
        [...lineCoord[1]],
        [...lineCoord[2]],
    ];
    return intersectingSegment;
}
