export default class Color {
    public static noColor = new Color(0, 0, 0, 0);

    private col: [number, number, number, number];

    public constructor(r: number, g: number, b: number, a: number) {
        this.col = [r, g, b, a];
    }

    public r(): number {
        return this.col[0];
    }
    public g(): number {
        return this.col[1];
    }
    public b(): number {
        return this.col[2];
    }
    public a(): number {
        return this.col[3];
    }

    public setR(val: number): void {
        this.col[0] = val;
    }
    public setG(val: number): void {
        this.col[1] = val;
    }
    public setB(val: number): void {
        this.col[2] = val;
    }
    public setA(val: number): void {
        this.col[3] = val;
    }

    public toCSS(): string {
        return `rgba(${this.col[0]},${this.col[1]},${this.col[2]},${this.col[3]})`;
    }
}
