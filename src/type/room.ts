import { Polygon } from './polygon';

type attributeValue = string | number | boolean;

export class Room {
    static blank = new Room(-1, Polygon.blank, '');

    public attribute: Map<string, attributeValue> = new Map<string, attributeValue>();
	public tag: Set<string> = new Set<string>();
    constructor(
        public drawLayer: number,
        public polygon: Polygon,
        public readonly id: string
    ) {}
}
