import { Polygon } from '@/polygon/polygon';

export class Room {
    static blank = new Room(-1, -1, Polygon.blank, '');

    public alias: string[] = [];
    constructor(
        public roomCode: number,
        public floor: number,
        public readonly polygon: Polygon,
        public readonly id: string
    ) {}

    updateCode(newCode: number) {
        this.roomCode = newCode;
    }

    updateFloor(newFloor: number) {
        this.floor = newFloor;
    }

    addAlias(alias: string) {
        this.alias.push(alias);
    }

    removeAlias(aliasIdx: number) {
        this.alias = this.alias.filter((_, idx) => idx !== aliasIdx);
    }

    updateAlias(newAlias: string[]) {
        this.alias = newAlias;
    }
}
