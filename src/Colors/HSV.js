class HSV extends ColorBase {
    constructor(h, s, v, a = 1) {
        super(a);

        this.h = h;
        this.s = s;
        this.v = v;

        return this;
    }

    get h() {
        return this._h;
    }

    get s() {
        return this._s;
    }

    get v() {
        return this._v;
    }

    set h(h) {
        this._h = h % 360;
    }

    set s(s) {
        this._s = Frost.clampPercent(s);
    }

    set v(v) {
        this._v = Frost.clampPercent(v);
    }

    setAlpha(a) {
        return new HSV(this.h, this.s, this.v, a);
    }

    setBrightness(brightness) {
        return new HSV(this.h, this.s, brightness, this.a);
    }

    setHue(hue) {
        return new HSV(hue, this.s, this.v, this.a);
    }

    setSaturation(saturation) {
        return new HSV(this.h, saturation, this.v, this.a);
    }

    toHSV() {
        return new HSV(this.h, this.s, this.v, this.a);
    }

    toRGB() {
        const s = this.s / 100;
        const v = this.v / 100;
        if (s == 0) {
            return new RGB(v * 255, v * 255, v * 255, this.a);
        }

        let h = this.h / 60;
        if (h == 6) {
            h = 0;
        }

        const vi = Math.floor(h);
        const v1 = v * (1 - s);
        const v2 = v * (1 - s * (h - vi));
        const v3 = v * (1 - s * (1 - (h - vi)));

        let r;
        let g;
        let b;
        if (vi == 0) {
            r = v;
            g = v3;
            b = v1;
        } else if (vi == 1) {
            r = v2;
            g = v;
            b = v1;
        } else if (vi == 2) {
            r = v1;
            g = v;
            b = v3;
        } else if (vi == 3) {
            r = v1;
            g = v2;
            b = v;
        } else if (vi == 4) {
            r = v3;
            g = v1;
            b = v;
        } else {
            r = v;
            g = v1;
            b = v2;
        }

        return new RGB(r * 255, g * 255, b * 255, this.a);
    }
}