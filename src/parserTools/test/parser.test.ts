import { Polygon } from '@/polygon/polygon';
import { Room } from '@/room/room';
import * as polygonTools from '../polygonTools';
import * as roomTools from '../roomTools';
import * as graphTools from '../pathTools';

import type { Line } from '@/com/line';

const testPolygon = new Polygon(
    [
        [0, 0],
        [0, 100],
        [100, 100],
        [100, 0],
    ],
    [70, 70, 70, 1]
);
const testPolygon2 = new Polygon(
    [
        [100, 0],
        [100, 100],
        [200, 100],
        [200, 0],
    ],
    [70, 70, 70, 1]
);
const testPolygon3 = new Polygon(
    [
        [200, 0],
        [200, 100],
        [300, 100],
        [300, 0],
    ],
    [70, 70, 70, 1]
);

const testRoom = new Room(7108, 1, testPolygon, 'testRoomID');
const testRoom2 = new Room(7107, 1, testPolygon2, 'testRoom2ID');
const testRoom3 = new Room(7109, 1, testPolygon3, 'testRoom3ID');

test('polygon edge extraction', () => {
    const edges: Line[] = polygonTools.getPolygonEdges(testPolygon);
    expect(edges).toEqual([
        [0, 0],
        [false, 0],
        [0, 100],
        [false, 100],
    ]);
});

test('polygon touching validation', () => {
    const testResult: boolean = polygonTools.validatePolygonTouching(testPolygon, testPolygon2);
    const testResult2: boolean = polygonTools.validatePolygonTouching(testPolygon, testPolygon3);
    expect(testResult).toBe(true);
    expect(testResult2).toBe(false);
});

test('room touch extraction', () => {
    const testResult: [Room, Room][] = roomTools.getTouchingRooms([testRoom, testRoom2]);
    const testResult2: [Room, Room][] = roomTools.getTouchingRooms([testRoom, testRoom3]);
    const testResult3: [Room, Room][] = roomTools.getTouchingRooms([
        testRoom,
        testRoom2,
        testRoom3,
    ]);
    expect(testResult).toEqual([[testRoom, testRoom2]]);
    expect(testResult2).toEqual([]);
    expect(testResult3).toEqual([
        [testRoom, testRoom2],
        [testRoom2, testRoom3],
    ]);
});

test('graph generation test', () => {
    graphTools.generatePath([testRoom, testRoom2, testRoom3]);
    expect(true).toBe(true);
});
