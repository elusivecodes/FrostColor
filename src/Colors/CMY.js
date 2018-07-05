class CMY extends ColorBase {
    constructor(c, m, y, alpha = 1) {
        super(a);

        this.c = frost.clampPercent(c);
        this.m = frost.clampPercent(m);
        this.y = frost.clampPercent(y);
    }

    setAlpha(a) {
        return new CMY(this.c, this.m, this.y, a);
    }

    toCMY() {
        return this;
    }

    toCMYK() {
        const [c, m, y, k] = Color.CMY2CMYK(this.c, this.m, this.y);
        return new CMYK(c, m, y, k, this.a);
    }

    toRGB() {
        const [r, g, b] = Color.CMY2RGB(this.c, this.m, this.y);
        return new RGB(r, g, b, this.a);
    }
}