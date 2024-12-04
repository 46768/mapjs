import type { Coord, Color } from '@type/vertex';
import type { Polygon } from '@type/polygon';

export interface ProductOptions {
    coordinateOffset: Coord;
    canvasSize: Coord;
    renderingLayer: number;
}
export interface ProductConfig {
    zLayer: number;
    layer?: number | (() => number);
    tag?: string;
    static?: boolean;
    repeating?: number;
}
export type Product = (
    ctx: CanvasRenderingContext2D,
    options: ProductOptions
) => void;

type ProductArgBase = [Color, ProductConfig];
export type dotArg = [Coord, number, ...ProductArgBase];
export type lineArg = [Coord, Coord, number, ...ProductArgBase];
export type polygonArg = [Polygon, ProductConfig];
