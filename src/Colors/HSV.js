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
        this._h = h % 1;
    }

    set s(s) {
        this._s = clamp(s, 0, 1);
    }

    set v(v) {
        this._v = clamp(v, 0, 1);
    }

    setAlpha(a) {
        return new HSV(this.h, this.s, this.v, a);
    }

    shade(amount) {
        return new HSV(this.h, this.s, this.v - (amount / 200), this.a);
    }

    tint(amount) {
        return new HSV(this.h, this.s, this.v + (amount / 200), this.a);
    }

    toHSV() {
        return new HSV(this.h, this.s, this.v, this.a);
    }

    toRGB() {
        if (this.s == 0) {
            return new RGB(this.v * 255, this.v * 255, this.v * 255, this.a);
        }

        let h = this.h * 6;
        if (h == 6) {
            h = 0;
        }

        const vi = Math.floor(h);
        const v1 = this.v * (1 - this.s);
        const v2 = this.v * (1 - this.s * (h - vi));
        const v3 = this.v * (1 - this.s * (1 - (h - vi)));

        let r;
        let g;
        let b;
        if (vi == 0) {
            r = this.v;
            g = v3;
            b = v1;
        } else if (vi == 1) {
            r = v2;
            g = this.v;
            b = v1;
        } else if (vi == 2) {
            r = v1;
            g = this.v;
            b = v3;
        } else if (vi == 3) {
            r = v1;
            g = v2;
            b = this.v;
        } else if (vi == 4) {
            r = v3;
            g = v1;
            b = this.v;
        } else {
            r = this.v;
            g = v1;
            b = v2;
        }

        return new RGB(r * 255, g * 255, b * 255, this.a);
    }
}