class CMY extends ColorBase {
    constructor(c, m, y, a = 1) {
        super(a);

        this.c = c;
        this.m = m;
        this.y = y;

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

    setAlpha(a) {
        return new CMY(this.c, this.m, this.y, a);
    }

    toCMY() {
        return new CMY(this.c, this.m, this,y, this.a);
    }

    toCMYK() {
        const k = Math.min(this.c, this.m, this.y);

        let c, m, y;
        if (k == 1) {
            c = 0;
            m = 0;
            y = 0;
        } else {
            c = (this.c - k) / (1 - k);
            m = (this.m - k) / (1 - k);
            y = (this.y - k) / (1 - k);
        }

        return new CMYK(c, m, y, k, this.a);
    }

    toRGB() {
        const r = (1 - this.c) * 255;
        const g = (1 - this.m) * 255;
        const b = (1 - this.y) * 255;

        return new RGB(r, g, b, this.a);
    }
}