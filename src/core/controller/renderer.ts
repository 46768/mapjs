import { colorToCSS } from '@utils/dataConverter';

import type { Product, ProductOptions, ProductConfig } from './renderer/def';
import type { Coord, Color } from '@type/vertex';

/**
 * Renderer for drawing map onto canvas
 */
export class Renderer {
    public objectBuffer: Record<string, Product[]>[] = [];
    public tagRecord: Map<string, number> = new Map<string, number>();
    public background: Color = [255, 255, 255, 1];
    public productOption: ProductOptions = {
        coordinateOffset: [0, 0],
        canvasSize: [window.innerWidth, window.innerHeight],
        renderingLayer: 1,
    };

    constructor(public context?: CanvasRenderingContext2D) {}

    /**
     * Insert a product to the productBuffer with a tag if specified *default to 'untagged'
     */
    insertObject(object: Product, config: ProductConfig): void {
        const tag: string = config.tag ?? 'untagged';
        const drawOrder: number = config.zLayer;
        if (!this.objectBuffer[drawOrder]) this.objectBuffer[drawOrder] = {};
        if (
            !Object.prototype.hasOwnProperty.call(
                this.objectBuffer[drawOrder],
                tag
            )
        )
            this.objectBuffer[drawOrder][tag] = [];
        this.objectBuffer[drawOrder][tag].push(object);
        if (!this.tagRecord.get(tag)) this.tagRecord.set(tag, drawOrder);
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
        const size = this.productOption.canvasSize;
        const objects = this.objectBuffer;
        const opts = this.productOption;
        ctx.clearRect(0, 0, ...size);
        ctx.fillStyle = colorToCSS(this.background);
        ctx.fillRect(0, 0, ...size);
        for (const drawLayer of objects) {
            if (typeof drawLayer !== 'object') continue;
            for (const objs of Object.values(drawLayer)) {
                for (const obj of objs) {
                    obj(ctx, opts);
                }
            }
        }
    }

    setContext(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    clearContext() {
        this.context = undefined;
    }

    set backgroundColor(newColor: Color) {
        this.background = newColor;
    }

    set offset(newOffset: Coord) {
        this.productOption.coordinateOffset = newOffset;
    }

    set size(newSize: Coord) {
        if (!this.context) return;
        this.productOption.canvasSize = newSize;
        this.context.canvas.width = newSize[0];
        this.context.canvas.height = newSize[1];
    }

    set layer(newLayer: number) {
        this.productOption.renderingLayer = newLayer;
    }
}
