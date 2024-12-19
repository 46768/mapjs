import Polygon from './Polygon';

type attributeValue = string | number | boolean;

export default class Room {
    public static blank = new Room(-1, Polygon.blank, '');

    public attribute: Map<string, attributeValue> = new Map<
        string,
        attributeValue
    >();
    public tag: Set<string> = new Set<string>();
    public constructor(
        public drawLayer: number,
        public polygon: Polygon,
        public readonly id: string
    ) {}
}
