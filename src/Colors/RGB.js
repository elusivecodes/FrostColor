class RGB extends ColorBase {
    constructor(r, g, b, a = 1) {
        super(a);

        this.r = clamp(r, 0, 255);
        this.g = clamp(g, 0, 255);
        this.b = clamp(b, 0, 255);
    }

    luma() {
        return Color.RGB2Luma(this.r, this.g, this.b);
    }

    setAlpha(a) {
        return new RGB(this.r, this.g, this.b, a);
    }

    toCMY() {
        const [c, m, y] = Color.RGB2CMY(this.r, this.g, this.b);
        return new CMY(c, m, y, this.a);
    }

    toHSL() {
        const [h, s, l] = Color.RGB2HSL(this.r, this.g, this.b);
        return new HSL(h, s, l, this.a);
    }

    toHSV() {
        const [h, s, v] = Color.RGB2HSV(this.r, this.g, this.b);
        return new HSV(h, s, v, this.a);
    }

    toRGB() {
        return this;
    }

    toString() {
        const a = Math.round(this.alpha * 100) / 100;

        if (a === 0) {
            return 'transparent';
        }

        const r = Math.round(this.r);
        const g = Math.round(this.g);
        const b = Math.round(this.b);

        if (this.a === 1) {
            const rgb = b | (g << 8) | (r << 16);
            const hex = '#' + (0x1000000 + rgb).toString(16).slice(1);
            const name = Object.keys(Color.colors).find(name => Color.colors[name] === hex);
            if (name) {
                return name;
            }

            const hexMatch = string.match(this.hexRegEx);
            if (hexMatch[1][0] === hexMatch[1][1] &&
                hexMatch[2][0] === hexMatch[2][1] &&
                hexMatch[3][0] === hexMatch[3][1]) {
                return '#' + hexMatch[1][0] + hexMatch[2][0] + hexMatch[3][0];
            }

            return hex;
        }

		return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    }
}