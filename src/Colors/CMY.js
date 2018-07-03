class CMY extends ColorBase {
    constructor(c, m, y, a = 1) {
        super(a);

        this.c = c;
        this.m = m;
        this.y = y;

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

    set c(c) {
        this._c = Frost.clampPercent(c);
    }

    set m(m) {
        this._m = Frost.clampPercent(m);
    }

    set y(y) {
        this._y = Frost.clampPercent(y);
    }

    setAlpha(a) {
        return new CMY(this.c, this.m, this.y, a);
    }

    toCMY() {
        return new CMY(this.c, this.m, this,y, this.a);
    }

    toCMYK() {
        const k = Math.min(this.c, this.m, this.y) / 100;

        if (k == 1) {
            return new CMYK(0, 0, 0, k, this.a);
        }

        const c = ((this.c / 100) - k) / (1 - k);
        const m = ((this.m / 100) - k) / (1 - k);
        const y = ((this.y / 100) - k) / (1 - k);

        return new CMYK(c * 100, m * 100, y * 100, k * 100, this.a);
    }

    toRGB() {
        const r = (1 - (this.c / 100));
        const g = (1 - (this.m / 100));
        const b = (1 - (this.y / 100));

        return new RGB(r * 255, g * 255, b * 255, this.a);
    }
}