import Heap from '@type/datatype/Heap';

const compareFn: (a: number, b: number) => boolean = (
    a: number,
    b: number
): boolean => {
    return a < b;
};

test('Heap creation', () => {
    const heap: Heap<number> = new Heap(compareFn);

    expect(heap.size()).toBe(0);
});

test('Heap push', () => {
    const heap: Heap<number> = new Heap(compareFn);
    heap.push(5);
    heap.push(6);
    heap.push(1);
    heap.push(2);
    heap.push(3);
    heap.push(4);

    expect(heap.array()).toEqual([1, 2, 3, 4, 5, 6]);
});

test('Heap pop', () => {
    const heap: Heap<number> = new Heap(compareFn);
    heap.push(5);
    heap.push(6);
    heap.push(1);
    heap.push(2);
    heap.push(3);
    heap.push(4);

    const popped: number = heap.pop();

    expect(popped).toEqual(1);
    expect(heap.array()).toEqual([2, 3, 4, 5, 6]);
});
