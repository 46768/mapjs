import { Polygon } from '@/polygon/polygon';
import { Room } from './room';

const roomPoly = new Polygon(
    [
        [0, 0],
        [0, 100],
        [100, 100],
        [100, 0],
    ],
    [70, 70, 70, 1]
);
const testRoom = new Room(7109, 1, roomPoly, 'testID');

test('room code test', () => {
    expect(testRoom.roomCode).toEqual(7109);
});

test('room code change test', () => {
    testRoom.roomCode = 7101;
    expect(testRoom.roomCode).toEqual(7101);
    testRoom.updateCode(7102);
    expect(testRoom.roomCode).toEqual(7102);
    testRoom.roomCode = 7109;
});

test('room floor test', () => {
    expect(testRoom.floor).toEqual(1);
});

test('room floor change test', () => {
    testRoom.floor = 2;
    expect(testRoom.floor).toEqual(2);
    testRoom.updateFloor(3);
    expect(testRoom.floor).toEqual(3);
    testRoom.floor = 1;
});

test('room id test', () => {
    expect(testRoom.id).toEqual('testID');
});
