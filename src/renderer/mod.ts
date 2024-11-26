import type { Closure, ClosureConfig, ClosureOptions } from './def';
import type { Coord, Color } from '@/com/vertex';
import { Polygon } from '@/polygon/polygon';
import { colorToCSS } from '@/utils/dataConverter';

export class Renderer {
    public objectBuffer: Record<string, Closure[]>[] = [];
    public tagRecord: Map<string, number> = new Map<string, number>();
    public background: Color = [255, 255, 255, 1];
    public closureOption: ClosureOptions = {
		globalOffset: [0, 0],
        coordinateOffset: [0, 0],
        canvasSize: [window.innerWidth, window.innerHeight],
        renderingFloor: 1,
    };

    constructor(public context: CanvasRenderingContext2D) {
        this.context.canvas.width = this.closureOption.canvasSize[0];
        this.context.canvas.height = this.closureOption.canvasSize[1];
    }

    _insertObject(object: Closure, zLayer: number, tag?: string): void {
        tag = tag ?? 'untagged';
        if (!this.objectBuffer[zLayer]) this.objectBuffer[zLayer] = {};
        if (!Object.prototype.hasOwnProperty.call(this.objectBuffer[zLayer], tag))
            this.objectBuffer[zLayer][tag] = [];
        this.objectBuffer[zLayer][tag].push(object);
        if (!this.tagRecord.get(tag)) this.tagRecord.set(tag, zLayer);
    }

    _getOffset(opts: ClosureOptions, options: ClosureConfig): Coord {
        if (options.static) {
            return opts.globalOffset;
        }
        if (options.repeating) {
            return [
                (opts.coordinateOffset[0] + opts.globalOffset[0]) % options.repeating,
                (opts.coordinateOffset[1] + opts.globalOffset[1]) % options.repeating,
            ];
        }
        return opts.coordinateOffset.map((val, idx) => val+opts.globalOffset[idx]) as Coord;
    }
	_isNotCorrectFloor(opts: ClosureOptions, options: ClosureConfig) {
		if (options.floor) {
            if (typeof options.floor === "number") return Math.abs(options.floor - opts.renderingFloor) > 0.5;
            if (typeof options.floor === "function") return Math.abs(options.floor() - opts.renderingFloor) > 0.5;
		}
		return false;
	}

    clearTag(tag: string) {
        const tagLayer = this.tagRecord.get(tag);
        if (!tagLayer) return;
        delete this.objectBuffer[tagLayer][tag];
        this.tagRecord.delete(tag);
    }

    createLine(start: Coord, end: Coord, color: Color, thickness: number, options: ClosureConfig) {
        const [sx, sy]: Coord = start;
        const [ex, ey]: Coord = end;
        this._insertObject(
            (ctx: CanvasRenderingContext2D, opts: ClosureOptions) => {
				if (this._isNotCorrectFloor(opts, options)) return;
                const [offX, offY] = this._getOffset(opts, options);
                ctx.strokeStyle = colorToCSS(color);
                ctx.lineWidth = thickness;
                ctx.beginPath();
                ctx.moveTo(sx + offX, sy + offY);
                ctx.lineTo(ex + offX, ey + offY);
                ctx.stroke();
            },
            options.zLayer,
            options.tag
        );
    }

    createDot(pos: Coord, radius: number, color: Color, options: ClosureConfig) {
        const [x, y]: Coord = pos;
        this._insertObject(
            (ctx: CanvasRenderingContext2D, opts: ClosureOptions) => {
				if (this._isNotCorrectFloor(opts, options)) return;
                const [offX, offY] = this._getOffset(opts, options);
                ctx.fillStyle = colorToCSS(color);
                ctx.beginPath();
                ctx.arc(x + offX, y + offY, radius, 0, Math.PI * 2);
                ctx.fill();
            },
            options.zLayer,
            options.tag
        );
    }

    createPolygon(poly: Polygon, color: Color, options: ClosureConfig) {
        this._insertObject(
            (ctx: CanvasRenderingContext2D, opts: ClosureOptions) => {
				if (this._isNotCorrectFloor(opts, options)) return;
                const vertices: Coord[] = poly.vertices;
                const [offX, offY] = this._getOffset(opts, options);
                const [xBegin, yBegin] = vertices[0];
                ctx.fillStyle = colorToCSS(color);
                ctx.beginPath();
                ctx.moveTo(xBegin + offX, yBegin + offY);
                for (let i = 1; i < vertices.length; i++) {
                    ctx.lineTo(vertices[i][0] + offX, vertices[i][1] + offY);
                }
                ctx.closePath();
                ctx.fill();
                if (poly.highlighted) {
                    ctx.strokeStyle = 'rgba(39, 153, 230, 1)';
                    ctx.lineWidth = 5;
                    ctx.stroke();
                }
            },
            options.zLayer,
            options.tag
        );
    }

    createOutline(poly: Polygon, color: Color, options: ClosureConfig) {
        this._insertObject(
            (ctx: CanvasRenderingContext2D, opts: ClosureOptions) => {
				if (this._isNotCorrectFloor(opts, options)) return;
                const vertices: Coord[] = poly.vertices;
                const [offX, offY] = this._getOffset(opts, options);
                const [xBegin, yBegin] = vertices[0];
                ctx.strokeStyle = colorToCSS(color);
                ctx.beginPath();
                ctx.moveTo(xBegin + offX, yBegin + offY);
                for (let i = 1; i < vertices.length; i++) {
                    ctx.lineTo(vertices[i][0] + offX, vertices[i][1] + offY);
                }
                ctx.closePath();
                ctx.stroke();
            },
            options.zLayer,
            options.tag
        );
    }

    createText(text: string, pos: Coord, options: ClosureConfig) {
        const [x, y]: Coord = pos;
        this._insertObject(
            (ctx: CanvasRenderingContext2D, opts: ClosureOptions) => {
				if (this._isNotCorrectFloor(opts, options)) return;
                const [offX, offY] = this._getOffset(opts, options);
                ctx.fillStyle = 'rgba(0, 0, 0, 1)';
                ctx.fillText(text, x + offX, y + offY);
            },
            options.zLayer,
            options.tag
        );
    }

    render() {
        const [sx, sy] = this.closureOption.canvasSize;
        const objects = this.objectBuffer;
        const ctx = this.context;
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
        this.closureOption.canvasSize = newSize;
        this.context.canvas.width = newSize[0];
        this.context.canvas.height = newSize[1];
    }

	set floor(newFloor: number) {
		this.closureOption.renderingFloor = newFloor;
	}

	set globalOffset(newOffset: Coord) {
		this.closureOption.globalOffset = newOffset;
	}
}
