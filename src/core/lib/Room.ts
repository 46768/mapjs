import Polygon from '@type/Polygon';
import Room from '@type/Room';
import PolygonUtil from './PolygonUtil';

import LineSegment from '@type/line/LineSegment';

export function getTouchingRooms(roomArray: Room[]): [Room, Room][] {
    const returnArray: [Room, Room][] = [];
    for (let i = 0; i < roomArray.length - 1; i++) {
        for (let j = i + 1; j < roomArray.length; j++) {
            const room1 = roomArray[i];
            const room2 = roomArray[j];
            const room1Poly = room1.polygon;
            const room2Poly = room2.polygon;
            if (
                PolygonUtil.getPolygonCommonEdge(room1Poly, room2Poly)
                    .length !== 0 &&
                Math.abs(room1.drawLayer - room2.drawLayer) <= 0.5
            ) {
                returnArray.push([room1, room2]);
            }
        }
    }
    return returnArray;
}
