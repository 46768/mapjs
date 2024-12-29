import PolygonMetadata from '@type/metadata/PolygonMetadata';
import Polygon from '@type/geometry/Polygon';

test('Metadata creation', () => {
	const metadata: PolygonMetadata = new PolygonMetadata();

	expect(metadata.attributes().length).toBe(0);
	expect(metadata.tagCount()).toBe(0);
});

test('Metadata attachment', () => {
    const polygon: Polygon = new Polygon([
        new Point(0, 0),
        new Point(0, 100),
        new Point(100, 100),
        new Point(100, 0),
    ]);
	const metadata: PolygonMetadata = new PolygonMetadata();

	polygon.attachMetadata(metadata);

	expect(polygon.metadata()).not.toBeNull();
	expect(polygon.metadata().attributes().length).toBe(0);
	expect(polygon.metadata().tagCount()).toBe(0);
});

test('Metadata dettachment', () => {
    const polygon: Polygon = new Polygon([
        new Point(0, 0),
        new Point(0, 100),
        new Point(100, 100),
        new Point(100, 0),
    ]);
	const metadata: PolygonMetadata = new PolygonMetadata();

	polygon.dettachMetadata(metadata);

	expect(polygon.metadata()).toBeNull();
});
