import { Renderer } from '@/renderer/mod';
import { Room } from '@/room/room';

function isCanvas(
    el: CanvasRenderingContext2D | HTMLCanvasElement
): el is HTMLCanvasElement {
    return (el as HTMLCanvasElement).getContext !== undefined;
}

/**
 * Entry point of every map
 */
export class MapJS {
    public readonly renderer = new Renderer();
    public roomCache: Room[] = [];

    constructor(public context?: CanvasRenderingContext2D) {}

    attachCanvas(context: CanvasRenderingContext2D | HTMLCanvasElement) {
        const attachingContext: CanvasRenderingContext2D = isCanvas(context)
            ? (context.getContext('2d') as CanvasRenderingContext2D)
            : context;
        this.context = attachingContext;
        this.renderer.setContext(attachingContext);
        this.renderer.render();
    }

    detachCanvas() {
        this.renderer.clearContext();
    }

    addRooms(addition: Room | Room[]) {
        if (Array.isArray(addition)) {
            this.roomCache = this.roomCache.concat(addition);
            this.renderer.render();
            return;
        }
        this.roomCache.push(addition);
        this.renderer.render();
    }
}
