class CMYK extends ColorBase {
    constructor(c, m, y, k, a = 1) {
        super(a);

        this.c = c;
        this.m = m;
        this.y = y;
        this.k = k;

        return this;
    }

    get c() {
        return this._c;
    }

    get m() {
        return this._m;
    }

    get y() {
        return this._y;
    }

    get k() {
        return this._k;
    }

    set c(c) {
        this._c = Frost.clampPercent(c);
    }

    set m(m) {
        this._m = Frost.clampPercent(m);
    }

    set y(y) {
        this._y = Frost.clampPercent(y);
    }

    set k(k) {
        this._k = Frost.clampPercent(k);
    }

    setAlpha(a) {
        return new CMYK(this.c, this.m, this.y, this.k, a);
    }

    toCMY() {
        const k = this.k / 100;
        const c = (this.c / 100) * (1 - k) + k;
        const m = (this.m / 100) * (1 - k) + k;
        const y = (this.y / 100) * (1 - k) + k;

        return new CMY(c * 100, m * 100, y * 100, this.a);
    }

    toCMYK() {
        return new CMYK(this.c, this.m, this.y, this.k, this.a);
    }

    toRGB() {
        return this.toCMY().toRGB();
    }
}