import { Coord, Color } from '@/com/vertex';

export interface ClosureOptions {
	globalOffset: Coord;
    coordinateOffset: Coord;
    canvasSize: Coord;
    renderingFloor: number;
}
export interface ClosureConfig {
    zLayer: number;
    floor?: (number | (() => number));
    tag?: string;
    static?: boolean;
    repeating?: number;
}
export type Closure = (ctx: CanvasRenderingContext2D, options: ClosureOptions) => void;

export type LineData = [Coord, Coord, Color, number, ClosureConfig];
export type PointData = [Coord, number, Color, ClosureConfig];
