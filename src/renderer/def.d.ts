import type { Coord } from '@/com/vertex';

export interface ProductOptions {
    coordinateOffset: Coord;
    canvasSize: Coord;
    renderingFloor: number;
}
export interface ProductConfig {
    zLayer: number;
    floor?: (number | (() => number));
    tag?: string;
    static?: boolean;
    repeating?: number;
}
export type Product = (ctx: CanvasRenderingContext2D, options: ProductOptions) => any;
export type PseudoProduct = Product[];
