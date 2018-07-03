class Color {
    constructor(r, g = 1, b = false, a = 1) {
        if (b) {
            this._color = new RGB(r, g, b, a);
        } else if (r instanceof ColorBase) {
            this._color = r.toRGB();
        } else if (r instanceof Color) {
            this._color = r._color.toRGB();
        } else {
            this._color = new HSV(0, 0, r || 0, g).toRGB();
        }
    }

    pushColor(color) {
        this._color = color;
        return this;
    }

    toString() {
        return this._color.toRGB().toString();
    }
}

Frost.Color = Color;