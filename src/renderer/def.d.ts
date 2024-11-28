import type { Coord } from '@/com/vertex';

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
export type PseudoProduct = Product[];
