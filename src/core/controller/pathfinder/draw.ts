import type { Coord, Color } from '@type/vertex';
import type { ProductConfig } from '@core/controller/renderer/def';
import type { dotArg, lineArg } from '@core/controller/renderer/def';

// Config
const pathColor: Color = [23, 224, 255, 1];
const pathConfig: ProductConfig = { zLayer: 4, tag: 'pathfind-obj' };

export function generatePoint(node: Coord): dotArg {
    return [node, 5, pathColor, pathConfig];
}

export function generateLine(start: Coord, end: Coord): lineArg {
    return [start, end, 2, pathColor, pathConfig];
}
