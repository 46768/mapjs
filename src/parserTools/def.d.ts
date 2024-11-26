import type { Coord } from '@/com/vertex'
import { Room } from '@/room/room'

export interface GPSMetadata {
	gpsOffset: Coord
	roomData: Room[]
}
