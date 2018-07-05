class Color {
    constructor(r = 0, g = 1, b = false, a = 1) {
        if (b !== false) {
            this._color = new RGB(r, g, b, a);
        } else if (r instanceof ColorBase) {
            this._color = r;
        } else if (r instanceof Color) {
            this._color = r._color;
        } else {
            this._color = new HSL(0, 0, r, g);
        }
    }

    pushColor(color) {
        this._color = color;
        return this;
    }

    toString() {
        return this._color.toString();
    }

    valueOf() {
        return this._color.toString();
    }

    [Symbol.toPrimitive]() {
        return this._color.toString();
    }
}

window.Color = Color;