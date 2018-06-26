class RGB extends ColorBase {
    constructor(r, g, b, a = 1) {
        super(a);

        this.r = r;
        this.g = g;
        this.b = b;

        return this;
    }

    get r() {
        return this._r;
    }

    get g() {
        return this._g;
    }

    get b() {
        return this._b;
    }

    set r(r) {
        this._r = clamp(r, 0, 255);
    }

    set g(g) {
        this._g = clamp(g, 0, 255);
    }

    set b(b) {
        this._b = clamp(b, 0, 255);
    }

    luma() {
		const v1 = 0.2126 * this.r;
		const v2 = 0.7152 * this.g;
        const v3 = 0.0722 * this.b;

		return (v1 + v2 + v3) / 255;
    }

    mix(color, amount = 0.5) {
        color = color.toRGB();
        const r = lerp(this.r, color.r, amount);
        const g = lerp(this.g, color.g, amount);
        const b = lerp(this.b, color.b, amount);
        const a = lerp(this.a, color.a, amount);
        return new RGB(r, g, b, a);
    }

    setAlpha(a) {
        return new RGB(this.r, this.g, this.b, a);
    }

    toCMY() {
        const c = 1 - (this.r / 255);
        const m = 1 - (this.g / 255);
        const y = 1 - (this.b / 255);

        return new CMY(c, m, y, this.a);
    }

    toHSL() {
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;

        const min = Math.min(r, g, b);
        const max = Math.max(r, g, b);
        const diff = max - min;

        const l = (max + min) / 2;

        if (diff == 0) {
            return new HSL(0, 0, l, this.a);
        }

        let h = 0;
        let s;
        if (l < 0.5) {
            s = diff / (max + min);
        } else {
            s = diff / (2 - max - min);
        }

        const deltaR = (((max - r) / 6) + (diff / 2)) / diff;
        const deltaG = (((max - g) / 6) + (diff / 2)) / diff;
        const deltaB = (((max - b) / 6) + (diff / 2)) / diff;

        if (r == max) {
            h = deltaB - deltaG;
        } else if (g == max) {
            h = (1 / 2) + deltaR - deltaB;
        } else if (b == max) {
            h = (2 / 3) + deltaG - deltaR;
        }

        if (h > 1) {
            h--;
        } else if (h < 0) {
            h++;
        }

        return new HSL(h, s, l, this.a);
    }

    toHSV() {
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;

        const min = Math.min(r, g, b);
        const max = Math.max(r, g, b);
        const diff = max - min;

        const v = max;

        if (diff == 0) {
            return new HSV(0, 0, v, this.a);
        }

        let h = 0;
        const s = diff / max;

        const deltaR = (((max - r) / 6) + (diff / 2)) / diff;
        const deltaG = (((max - g) / 6) + (diff / 2)) / diff;
        const deltaB = (((max - b) / 6) + (diff / 2)) / diff;

        if (r == max) {
            h = deltaB - deltaG;
        } else if (g == max) {
            h = (1 / 2) + deltaR - deltaB;
        } else if (b == max) {
            h = (2 / 3) + deltaG - deltaR;
        }

        if (h > 1) {
            h--;
        } else if (h < 0) {
            h++;
        }

        return new HSV(h, s, v, this.a);
    }

    toRGB() {
        return new RGB(this.r, this.g, this.b, this.a);
    }

    toString() {
        if (this.a === 0) {
            return 'transparent';
        }

        const r = Math.round(this.r);
        const g = Math.round(this.g);
        const b = Math.round(this.b);

        if (this.a === 1) {
            const rgb = b | (g << 8) | (r << 16);
            const hex = '#' + (0x1000000 + rgb).toString(16).slice(1);
            return Object.keys(Color.colors).find(name => Color.colors[name] === hex) || hex;
        }

		const a = Math.round(this.a * 100) / 100;
		return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    }
}