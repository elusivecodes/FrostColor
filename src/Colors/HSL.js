class HSL extends ColorBase {
    constructor(h, s, l, a = 1) {
        super(a);

        this.h = h;
        this.s = s;
        this.l = l;

        return this;
    }

    get h() {
        return this._h;
    }

    get s() {
        return this._s;
    }

    get l() {
        return this._l;
    }

    set h(h) {
        this._h = h % 360;
    }

    set s(s) {
        this._s = frost.clampPercent(s);
    }

    set l(l) {
        this._l = frost.clampPercent(l);
    }

    darken(amount) {
        return new HSL(this.h, this.s, this.l - (amount * 50), this.a);
    }

    lighten(amount) {
        return new HSL(this.h, this.s, this.l + (amount * 50), this.a);
    }

    setAlpha(a) {
        return new HSL(this.h, this.s, this.l, a);
    }

    toHSL() {
        return new HSL(this.h, this.s, this.l, this.a);
    }

    toRGB() {
        if (this.l == 0) {
            return new RGB(0, 0, 0, this.a);
        }

        const h = this.h / 360;
        const s = this.s / 100;
        const l = this.l / 100;

        let v2;
        if (l < 0.5) {
            v2 = l * (1 + s);
        } else {
            v2 = (l + s) - (s * l);
        }

        const v1 = 2 * l - v2;

        const r = HSL.RGBHue(v1, v2, h + (1 / 3));
        const g = HSL.RGBHue(v1, v2, h);
        const b = HSL.RGBHue(v1, v2, h - (1 / 3));

        return new RGB(r * 255, g * 255, b * 255, this.a);
    }

    toString() {
		const h = Math.round(this.h);
		const s = Math.round(this.s) + '%';
		const l = Math.round(this.l) + '%';

		if (this.a == 1) {
			return 'hsl(' + h + ', ' + s + ', ' + l + ')';
		}

		const a = Math.round(this.a * 100) / 100;
		return 'hsla(' + h + ', ' + s + ', ' + l + ', ' + a + ')';
    }

    static RGBHue(v1, v2, vH) {
        if (vH < 0) {
            vH += 1;
        } else if (vH > 1) {
            vH -= 1;
        }

        if (6 * vH < 1) {
            return v1 + (v2 - v1) * 6 * vH;
        }

        if (2 * vH < 1) {
            return v2;
        }

        if (3 * vH < 2) {
            return v1 + (v2 - v1) * ((2 / 3) - vH) * 6;
        }

        return v1;
    }
}