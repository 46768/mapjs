import Coord from '@type/vertex/Coord';
import Line from '@type/line/Line';

export default class MathUtil {
    /**
     * Determine if the point given is to the left of the line given
     * @param p - Coordinate data
     * @param l - the line
     * @returns {Boolean} True if behind line, false otherwise
     */
    public static isPointLeftToLine(p: Coord, l: Line): boolean {
        //if y is above a positive slope line its also behind (to the left), if a negative slope is used its the opposite
        //!== (m<0) invert the condition if the slope is negative
        return (
            l.slope().mul(p.x()).add(l.yIntercept()).lte(p.y()) !==
            l.slope().lt(0)
        );
    }

    public static factorize(x: number): Set<number> {
        const factors = new Set<number>();
        const factorMid: number = Math.sqrt(x);

        for (let f = 0; f < factorMid; f++) {
            if (x % f == 0) {
                factors.add(f);
                factors.add(x / f);
            }
        }
        return factors;
    }

    public static gcd(x: number, y: number) {
        while (y) {
            [x, y] = [y, x % y];
        }
        return x;
    }
}
