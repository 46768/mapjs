import { Polygon } from '@type/polygon';
import { Room } from '@type/room';

const roomPoly = new Polygon(
    [
        [0, 0],
        [0, 100],
        [100, 100],
        [100, 0],
    ],
    [70, 70, 70, 1]
);
const testRoom = new Room(1, roomPoly, 'testID');

test('room floor test', () => {
    expect(testRoom.drawLayer).toEqual(1);
});

test('room floor change test', () => {
    testRoom.floor = 2;
    expect(testRoom.drawLayer).toEqual(2);
    testRoom.updateFloor(3);
    expect(testRoom.drawLayer).toEqual(3);
    testRoom.floor = 1;
});

test('room id test', () => {
    expect(testRoom.id).toEqual('testID');
});
