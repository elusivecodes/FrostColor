class Color {
    constructor(r, g = 1, b = false, a = 1) {
        if (b !== false) {
            this._color = new RGB(r, g, b, a);
        } else if (r instanceof ColorBase) {
            this._color = r.toRGB();
        } else if (r instanceof Color) {
            this._color = r._color.toRGB();
        } else {
            r = r || 0;
            this._color = new HSL(0, 0, r, g);
        }
    }

    pushColor(color) {
        this._color = color;
        return this;
    }

    toString() {
        return this._color.toRGB().toString();
    }

    valueOf() {
        return this.toString();
    }

    [Symbol.toPrimitive]() {
        return this.toString();
    }
}

frost.Color = Color;