import { Polygon } from '@type/polygon';

const roomPoly = new Polygon(
    [
        [0, 0],
        [0, 100],
        [100, 100],
        [100, 0],
    ],
    [70, 70, 70, 1]
);

test('polygon vertices test', () => {
    expect(roomPoly.vertices).toEqual([
        [0, 0],
        [0, 100],
        [100, 100],
        [100, 0],
    ]);
});

test('polygon vertices change test', () => {
    expect(roomPoly.vertices).toEqual([
        [0, 0],
        [0, 100],
        [100, 100],
        [100, 0],
    ]);
    roomPoly.vertices = [
        [-200, 0],
        [0, 100],
        [100, 100],
        [100, 0],
    ];
    expect(roomPoly.vertices).toEqual([
        [-200, 0],
        [0, 100],
        [100, 100],
        [100, 0],
    ]);
    expect(roomPoly.boundingBox).toEqual([
        [-200, 100],
        [0, 100],
    ]);
    roomPoly.updateVertices([
        [0, 0],
        [0, 100],
        [100, 100],
        [100, 0],
    ]);
    expect(roomPoly.vertices).toEqual([
        [0, 0],
        [0, 100],
        [100, 100],
        [100, 0],
    ]);
    expect(roomPoly.boundingBox).toEqual([
        [0, 100],
        [0, 100],
    ]);
});
