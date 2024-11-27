import { colorToCSS } from '@/utils/dataConverter'

import type { Product, ProductConfig, ProductOptions } from './def';
import type { Coord, Color } from '@/com/vertex';

/**
 * Renderer for drawing map onto canvas
 */
export class Renderer {
    public objectBuffer: Record<string, Product[]>[] = [];
    public tagRecord: Map<string, number> = new Map<string, number>();
    public background: Color = [255, 255, 255, 1];
    public closureOption: ProductOptions = {
        coordinateOffset: [0, 0],
        canvasSize: [window.innerWidth, window.innerHeight],
        renderingFloor: 1,
    };

    constructor(public context?: CanvasRenderingContext2D) {
    }

	/**
	 * Internal, Insert a product to the productBuffer with a tag if specified *default to 'untagged'
	 */
    _insertObject(object: Product, zLayer: number, tag?: string): void {
        tag = tag ?? 'untagged';
        if (!this.objectBuffer[zLayer]) this.objectBuffer[zLayer] = {};
        if (!Object.prototype.hasOwnProperty.call(this.objectBuffer[zLayer], tag))
            this.objectBuffer[zLayer][tag] = [];
        this.objectBuffer[zLayer][tag].push(object);
        if (!this.tagRecord.get(tag)) this.tagRecord.set(tag, zLayer);
    }

    _getOffset(opts: ProductOptions, config: ProductConfig): Coord {
        if (config.static) {
            return [0, 0];
        }
        if (config.repeating) {
            return [
                (opts.coordinateOffset[0]) % config.repeating,
                (opts.coordinateOffset[1]) % config.repeating,
            ];
        }
        return opts.coordinateOffset;
    }

	/**
	 * Internal, Check if floor in ProductConfig is within current floor in ProductOption
	 */
	_isCorrectFloor(opts: ProductOptions, config: ProductConfig) {
		if (config.floor) {
            if (typeof config.floor === "number") return Math.abs(config.floor - opts.renderingFloor) > 0.5;
            if (typeof config.floor === "function") return Math.abs(config.floor() - opts.renderingFloor) > 0.5;
		}
		return false;
	}

    clearTag(tag: string) {
        const tagLayer = this.tagRecord.get(tag);
        if (!tagLayer) return;
        delete this.objectBuffer[tagLayer][tag];
        this.tagRecord.delete(tag);
    }

    render() {
		const ctx = this.context;
		if (!ctx) return;
        const [sx, sy] = this.closureOption.canvasSize;
        const objects = this.objectBuffer;
        const opts = this.closureOption;
        ctx.clearRect(0, 0, sx, sy);
        ctx.fillStyle = colorToCSS(this.background);
        ctx.fillRect(0, 0, sx, sy);
        for (const zLayer of objects) {
            if (typeof zLayer !== 'object') continue;
            for (const objs of Object.values(zLayer)) {
                for (const obj of objs) {
                    obj(ctx, opts);
                }
            }
        }
    }

    backgroundColor(newColor?: Color) {
        if (newColor) this.background = newColor;
    }

    set offset(newOffset: Coord) {
        this.closureOption.coordinateOffset = newOffset;
    }

    set size(newSize: Coord) {
		if (!this.context) return;
        this.closureOption.canvasSize = newSize;
        this.context.canvas.width = newSize[0];
        this.context.canvas.height = newSize[1];
    }

	set floor(newFloor: number) {
		this.closureOption.renderingFloor = newFloor;
	}
}
