export class Heap<T> {
    public data: T[] = [];
    constructor(
        public cmpFn: (cmp1: T, cmp2: T) => number,
        public getBlank: T
    ) {}

    insert(val: T) {
        const data = this.data;
        let childIdx = data.push(val) - 1;
        while (true) {
            const parentIdx = Math.max((childIdx - 1) >> 1, 0);
            const childVal: T = data[childIdx];
            const parentVal: T = data[parentIdx];
            if (this.cmpFn(childVal, parentVal) < 0) {
                [data[childIdx], data[parentIdx]] = [
                    data[parentIdx],
                    data[childIdx],
                ];
                childIdx = parentIdx;
            } else {
                break;
            }
        }
    }

    extract(): T {
        const data = this.data;
        if (data.length === 0) return this.getBlank;
        const dataLast: number = data.length - 1;
        [data[0], data[dataLast]] = [data[dataLast], data[0]];
        const retData: T = data.pop() as T;
        if (dataLast === 0) return retData;
        let root: number = 0;
        while (true) {
            const childLeft: number = 2 * root + 1;
            const childRight: number = 2 * root + 2;
            if (childLeft >= dataLast) break;
            const rootVal: T = data[root];
            const childLeftVal: T = data[childLeft];
            const childRightVal: T =
                childRight < dataLast ? data[childRight] : this.getBlank;

            if (
                this.cmpFn(rootVal, childLeftVal) > 0 ||
                this.cmpFn(rootVal, childRightVal)
            ) {
                if (data.length === 2) {
                    [data[root], data[childLeft]] = [
                        data[childLeft],
                        data[root],
                    ];
                    break;
                }
                if (this.cmpFn(childLeftVal, childRightVal) > 0) {
                    [data[root], data[childRight]] = [
                        data[childRight],
                        data[root],
                    ];
                    root = childRight;
                } else {
                    [data[root], data[childLeft]] = [
                        data[childLeft],
                        data[root],
                    ];
                    root = childLeft;
                }
            } else break;
        }

        return retData;
    }

    getMin(): T {
        return this.data[0];
    }

    getSize(): number {
        return this.data.length;
    }
}
