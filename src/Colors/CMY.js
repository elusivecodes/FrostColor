class CMY extends ColorBase {
    constructor(c, m, y, a = 1) {
        super(a);

        this.c = clamp(c);
        this.m = clamp(m);
        this.y = clamp(y);
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