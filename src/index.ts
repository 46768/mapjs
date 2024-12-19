import { Renderer } from '@core/controller/renderer';
import { PathFinderController } from '@core/controller/pathfinder';
import Room from '@type/Room';
import { polygonFactory } from '@core/controller/renderer/draw';

import type { Product, ProductConfig } from '@core/controller/renderer/def';

const polygonProductTag: string = 'polygon';

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

function generatePolyConfig(layer: number | (() => number)) {
    return {
        zLayer: 2,
        tag: polygonProductTag,
        layer: layer,
    };
}

/**
 * Entry point of every map
 */
export default class MapJS {
    public readonly renderer = new Renderer();
    public readonly pathfinder = new PathFinderController();
    public roomCache: Map<string, Room> = new Map<string, Room>();

    public constructor(
        public context?: CanvasRenderingContext2D | HTMLCanvasElement
    ) {
        if (context) this.renderer.setContext(getContext(context));
    }

    public attachCanvas(context: CanvasRenderingContext2D | HTMLCanvasElement) {
        const attachingContext = getContext(context);
        this.context = attachingContext;
        this.renderer.setContext(attachingContext);
        this.renderer.render();
    }

    public detachCanvas() {
        this.renderer.clearContext();
    }

    private _addRoom(room: Room) {
        this.roomCache = this.roomCache.set(room.id, room);
        const polygonConfig: ProductConfig = generatePolyConfig(
            () => room.drawLayer
        );
        const polygonProduct: Product = polygonFactory(
            room.polygon,
            polygonConfig
        );
        this.renderer.insertObject(polygonProduct, polygonConfig);
    }

    private _refreshRooms() {
        this.renderer.clearTag(polygonProductTag);
        for (const room of this.roomCache.values()) {
            this._addRoom(room);
        }
    }

    public addRooms(addition: Room | Room[]) {
        if (Array.isArray(addition)) {
            for (const room of addition) {
                this._addRoom(room);
            }
            this.renderer.render();
            return;
        }
        this._addRoom(addition);
        this.renderer.render();
    }

    public removeRooms(removal: Room | Room[]) {
        if (Array.isArray(removal)) {
            for (const room of removal) {
                this.roomCache.delete(room.id);
            }
            this._refreshRooms();
            this.renderer.render();
            return;
        }
        this.roomCache.delete(removal.id);
        this._refreshRooms();
        this.renderer.render();
    }

    public setRooms(newData: Room[]) {
        this.roomCache = new Map<string, Room>();
        for (const room of newData) {
            this._addRoom(room);
        }
        this._refreshRooms();
        this.renderer.render();
    }
}
