class HSL extends ColorBase {
    constructor(h, s, l, a = 1) {
        super(a);

        this.h = h % 360;
        this.s = frost.clampPercent(s);
        this.l = frost.clampPercent(l);
    }

    darken(amount) {
        const l = this.l - (this.l * amount);
        return new HSL(this.h, this.s, l, this.a);
    }

    lighten(amount) {
        const l = this.l + ((100 - this.l) * amount);
        return new HSL(this.h, this.s, l, this.a);
    }

    setAlpha(a) {
        return new HSL(this.h, this.s, this.l, a);
    }

    toHSL() {
        return this;
    }

    toRGB() {
        const [r, g, b] = Color.HSL2RGB(this.h, this.s, this.v);
        return new RGB(r, g, b, this.a);
    }

    toString(rgb = true) {
        if (rgb) {
            return this.toRGB().toString();
        }

		const h = Math.round(this.h);
		const s = Math.round(this.s) + '%';
		const l = Math.round(this.l) + '%';

		if (this.a == 1) {
			return 'hsl(' + h + ', ' + s + ', ' + l + ')';
		}

		const a = Math.round(this.a * 100) / 100;
		return 'hsla(' + h + ', ' + s + ', ' + l + ', ' + a + ')';
    }
}