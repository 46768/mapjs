/**
 * Determine if the point given is to the left of the line given
 * @param x - x Coordinate
 * @param y - y Coordinate
 * @param m - slope of the line
 * @param b - y intercept of the line
 * @returns {Boolean} True if behind line, false otherwise
 */
export function isPointLeftToLine(x: number, y: number, m: number, b: number): boolean {
    //if y is above a positive slope line its also behind (to the left), if a negative slope is used its the opposite
    //!== (m<0) invert the condition if the slope is negative
    return y > m * x + b !== m < 0;
}
