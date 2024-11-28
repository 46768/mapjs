import { Polygon } from '@/polygon/polygon';
import { colorToCSS } from '@/utils/dataConverter';

import type { Coord, Color } from '@/com/vertex';
import type { Product, ProductOptions, ProductConfig } from './def';

/**
 * Get offset of coordinate based on provided options and product configurations
 */
function getOffset(opts: ProductOptions, config: ProductConfig): Coord {
    if (config.static) {
        return [0, 0];
    }
    if (config.repeating) {
        return [
            opts.coordinateOffset[0] % config.repeating,
            opts.coordinateOffset[1] % config.repeating,
        ];
    }
    return opts.coordinateOffset;
}

function formatCoord(
    opts: ProductOptions,
    config: ProductConfig,
    pos: Coord
): Coord {
    const offset = getOffset(opts, config);
    return [pos[0] + offset[0], pos[1] + offset[1]];
}

function isCorrectLayer(opts: ProductOptions, config: ProductConfig) {
    if (config.layer) {
        if (typeof config.layer === 'number')
            return Math.abs(config.layer - opts.renderingLayer) > 0.5;
        if (typeof config.layer === 'function')
            return Math.abs(config.layer() - opts.renderingLayer) > 0.5;
    }
    return false;
}

/**
 * Generate a dot draw calls to the renderer
 */
export function dotFactory(
    radius: number,
    pos: Coord,
    col: Color,
    config: ProductConfig
): Product {
    return (ctx: CanvasRenderingContext2D, opts: ProductOptions) => {
        if (!isCorrectLayer(opts, config)) return;
        ctx.fillStyle = colorToCSS(col);
        ctx.beginPath();
        ctx.arc(...formatCoord(opts, config, pos), radius, 0, 2 * Math.PI);
        ctx.fill();
    };
}

/**
 * Generate a line draw calls to the renderer
 */
export function lineFactory(
    start: Coord,
    end: Coord,
    thickness: number,
    col: Color,
    config: ProductConfig
): Product {
    return (ctx: CanvasRenderingContext2D, opts: ProductOptions) => {
        if (!isCorrectLayer(opts, config)) return;
        ctx.lineWidth = thickness;
        ctx.strokeStyle = colorToCSS(col);
        ctx.beginPath();
        ctx.moveTo(...formatCoord(opts, config, start));
        ctx.lineTo(...formatCoord(opts, config, end));
        ctx.stroke();
    };
}

/**
 * Generate a polygon draw calls to the renderer
 */
export function polygonFactory(poly: Polygon, config: ProductConfig): Product {
    return (ctx: CanvasRenderingContext2D, opts: ProductOptions) => {
        if (!isCorrectLayer(opts, config)) return;
        const polyVert: Coord[] = poly.vertices;

        ctx.fillStyle = colorToCSS(poly.color);
        ctx.beginPath();
        for (let i = 0; i < polyVert.length; i++) {
            const startPos: Coord = formatCoord(opts, config, polyVert[i]);
            const endPos: Coord = formatCoord(
                opts,
                config,
                polyVert[(i + 1) % polyVert.length]
            );
            ctx.moveTo(...startPos);
            ctx.lineTo(...endPos);
        }
        ctx.fill();
    };
}
