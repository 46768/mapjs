import { Renderer } from '@core/controller/renderer';
import { PathFinderController } from '@core/controller/pathfinder';
import { Room } from '@type/room';

function isCanvas(
    el: CanvasRenderingContext2D | HTMLCanvasElement
): el is HTMLCanvasElement {
    return (el as HTMLCanvasElement).getContext !== undefined;
}

function getContext(
    context: CanvasRenderingContext2D | HTMLCanvasElement
): CanvasRenderingContext2D {
    return isCanvas(context)
        ? (context.getContext('2d') as CanvasRenderingContext2D)
        : context;
}

/**
 * Entry point of every map
 */
export class MapJS {
    public readonly renderer = new Renderer();
    public readonly pathfinder = new PathFinderController();
    public roomCache: Map<string, Room> = new Map<string, Room>();

    constructor(public context?: CanvasRenderingContext2D | HTMLCanvasElement) {
        if (context) this.renderer.setContext(getContext(context));
    }

    attachCanvas(context: CanvasRenderingContext2D | HTMLCanvasElement) {
        const attachingContext = getContext(context);
        this.context = attachingContext;
        this.renderer.setContext(attachingContext);
        this.renderer.render();
    }

    detachCanvas() {
        this.renderer.clearContext();
    }

    addRooms(addition: Room | Room[]) {
        if (Array.isArray(addition)) {
            for (let room of addition) {
                this.roomCache = this.roomCache.set(room.id, room);
            }
            this.renderer.render();
            return;
        }
        this.roomCache.set(addition.id, addition);
        this.renderer.render();
    }
}
