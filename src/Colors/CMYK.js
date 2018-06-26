class CMYK extends ColorBase {
    constructor(c, m, y, k, a = 1) {
        super(a);

        this.c = c;
        this.m = m;
        this.y = y;
        this.k = k;

        return this;
    }

    set c(c) {
        this.c = clamp(c);
    }

    set m(m) {
        this.m = clamp(m);
    }

    set y(y) {
        this.y = clamp(y);
    }

    set k(k) {
        this.k = clamp(k);
    }

    setAlpha(a) {
        return new CMYK(this.c, this.m, this.y, this.k, a);
    }

    toCMY() {
        const c = this.c * (1 - this.k) + this.k;
        const m = this.m * (1 - this.k) + this.k;
        const y = this.y * (1 - this.k) + this.k;

        return new CMY(c, m, y, this.a);
    }

    toCMYK() {
        return new CMYK(this.c, this.m, this.y, this.k, this.a);
    }

    toRGB() {
        return this.toCMY().toRGB();
    }
}