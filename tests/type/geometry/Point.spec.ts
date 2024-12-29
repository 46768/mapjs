import Point from '@type/geometry/Point';

test('Point creation', () => {
    const point: Point = new Point(0, 1);

    expect(point.x()).toBe(0);
    expect(point.y()).toBe(1);
});

test('Point comparasion', () => {
    const point: Point = new Point(0, 1);
    const point2: Point = new Point(0, 1);
    const point3: Point = new Point(1, 1);

    expect(point2.equals(point)).toBe(true);
    expect(point3.equals(point)).toBe(false);
});
