class CMYK extends ColorBase {
    constructor(c, m, y, k, a = 1) {
        super(a);

        this.c = clamp(c);
        this.m = clamp(m);
        this.y = clamp(y);
        this.k = clamp(k);
    }

    setAlpha(a) {
        return new CMYK(this.c, this.m, this.y, this.k, a);
    }

    toCMY() {
        const [c, m, y] = Color.CMYK2CMY(this.c, this.m, this.y, this.k);
        return new CMY(c, m, y, this.a);
    }

    toCMYK() {
        return this;
    }

    toRGB() {
        return this.toCMY().toRGB();
    }
}