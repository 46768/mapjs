import Polygon from '@type/geometry/Polygon';
import Point from '@type/geometry/Point';

test('Polygon creation', () => {
    const polygon: Polygon = new Polygon([
        new Point(0, 0),
        new Point(0, 100),
        new Point(100, 100),
        new Point(100, 0),
    ]);

    expect(polygon.vertex().length).toBe(4);
    expect(polygon.vertex()[0].equals(new Point(0, 0))).toBe(true);
    expect(polygon.vertex()[1].equals(new Point(0, 100))).toBe(true);
    expect(polygon.vertex()[2].equals(new Point(100, 100))).toBe(true);
    expect(polygon.vertex()[3].equals(new Point(100, 0))).toBe(true);
});
